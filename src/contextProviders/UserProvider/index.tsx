import {
  createContext,
  FC,
  useCallback,
  useContext,
  useState,
  useEffect,
} from "react";

import { FieldValue, projectFirestore } from "../../firebase/config";
import { IFamily, IUserData } from "../../model";
import { errorToast } from "../../services/toastService";
import { deleteImage } from "../../helpers/imageStorageHandlers";
import firebase from "firebase/app";
import { useAuth } from "../AuthProvider";

interface IUserContextValue {
  user?: IUserData;
  createUser: (data: Omit<IUserData, "password">) => Promise<void>;
  fetchUser: (email: string) => Promise<void>;
  clearUser: () => void;
  createFamily: (data: IFamily) => Promise<void>;
  doesFamilyIdExist: (familyId: string) => Promise<boolean>;
  updateFamily: (
    data: Omit<IFamily, "familyId">,
    revertOnError?: boolean
  ) => Promise<void>;
  isFamilyLoading: boolean;
  changeFamilyLoadingState: (isLoading: boolean) => void;
  updateUser: (
    data: Omit<IUserData, "familyId" | "password">,
    revertOnError?: boolean
  ) => Promise<void>;
  isUserLoading: boolean;
  changeUserLoadingState: (isLoading: boolean) => void;
  deleteProfilePicture: (user: IUserData) => Promise<boolean>;
  deleteBanner: () => Promise<boolean>;
  family?: IFamily;
  familyMembers?: IUserData[];
}

const UserContext = createContext<IUserContextValue>(null!);

export const useUser = () => useContext(UserContext);

const UserProvider: FC = ({ children }) => {
  const [user, setUser] = useState<IUserData>();
  const [familyMembers, setFamilyMembers] = useState<IUserData[]>();
  const [family, setFamily] = useState<IFamily>();
  const { user: authUser } = useAuth();
  const [isFamilyLoading, setIsFamilyLoading] = useState(false);
  const [isUserLoading, setIsUserLoading] = useState(false);

  const changeFamilyLoadingState = useCallback((isLoading: boolean) => {
    setIsFamilyLoading(isLoading);
  }, []);

  const changeUserLoadingState = useCallback((isLoading: boolean) => {
    setIsUserLoading(isLoading);
  }, []);

  const createFamily = useCallback(async (data: IFamily) => {
    try {
      await projectFirestore
        .collection("/families")
        .doc(data.familyId)
        .set(data);
    } catch (err: any) {
      errorToast(
        err.code === "permission-denied"
          ? "Permission denied!"
          : `${err.name}:${err.code}`
      );
      return;
    }
  }, []);

  const fetchFamily = useCallback(async (familyId: string) => {
    try {
      const response = await projectFirestore
        .collection("/families")
        .doc(familyId)
        .get();

      if (!response.exists) return;

      const family = response.data()! as IFamily;
      setFamily(family);
    } catch (err: any) {
      errorToast(
        err.code === "permission-denied"
          ? "Permission denied!"
          : `${err.name}:${err.code}`
      );
    }
  }, []);

  const clearFamily = () => {
    setFamily(undefined);
  };

  const updateFamily = useCallback(
    async (data: Omit<IFamily, "familyId">, revertOnError?: boolean) => {
      try {
        const docRef = projectFirestore
          .collection("families")
          .doc(family!.familyId);
        const updates: Record<string, firebase.firestore.FieldValue> = {};

        Object.entries(data).forEach(([key, value]) => {
          if (value === undefined) {
            delete data[key as keyof Omit<IFamily, "familyId">];
            updates[key] = FieldValue.delete();
          }
        });

        if (Object.keys(updates).length > 0) {
          docRef.update(updates);
        }

        await projectFirestore
          .collection("families")
          .doc(family!.familyId)
          .set({ ...data, familyId: family!.familyId });

        fetchFamily(family!.familyId);
      } catch (err: any) {
        revertOnError && (await deleteImage(`${family!.familyId}/banner`));

        errorToast(
          err.code === "permission-denied"
            ? "Permission denied!"
            : `${err.name}:${err.code}`
        );
        setIsFamilyLoading(false);
        return;
      }
    },

    [family, fetchFamily]
  );

  const doesFamilyIdExist = useCallback(async (familyId: string) => {
    try {
      const response = await projectFirestore
        .collection("/families")
        .doc(familyId)
        .get();

      return response.exists;
    } catch (err: any) {
      errorToast(
        err.code === "permission-denied"
          ? "Permission denied!"
          : `${err.name}:${err.code}`
      );
      return false;
    }
  }, []);

  const fetchFamilyMembers = useCallback(async (familyId: string) => {
    try {
      const response = await projectFirestore
        .collection("/users")
        .where("familyId", "==", familyId)
        .get();

      const newFamilyMembers = response.docs.map(
        (doc) => doc.data() as IUserData
      );
      setFamilyMembers(newFamilyMembers);
    } catch (err: any) {
      errorToast(
        err.code === "permission-denied"
          ? "Permission denied!"
          : `${err.name}:${err.code}`
      );
    }
  }, []);

  const fetchUser = useCallback(
    async (email: string) => {
      try {
        const response = await projectFirestore
          .collection("/users")
          .doc(email)
          .get();

        if (!response.exists) return;

        const user = response.data()! as IUserData;
        setUser(user);
        fetchFamily(user.familyId);
        fetchFamilyMembers(user.familyId);
      } catch (err: any) {
        errorToast(
          err.code === "permission-denied"
            ? "Permission denied!"
            : `${err.name}:${err.code}`
        );
      }
    },
    [fetchFamily, fetchFamilyMembers]
  );

  const clearUser = () => {
    setUser(undefined);
    clearFamily();
  };

  const createUser = useCallback(
    async (data: Omit<IUserData, "password">) => {
      const email = data.email.trim();

      try {
        await projectFirestore
          .collection("/users")
          .doc(email)
          .set({ ...data, email: email });
      } catch (err: any) {
        errorToast(
          err.code === "permission-denied"
            ? "Permission denied!"
            : `${err.name}:${err.code}`
        );
        return;
      }
      fetchUser(email);
    },
    [fetchUser]
  );

  const updateUser = useCallback(
    async (
      data: Omit<IUserData, "familyId" | "password">,
      revertOnError?: boolean
    ) => {
      try {
        const docRef = projectFirestore.collection("users").doc(data.email);
        const updates: Record<string, firebase.firestore.FieldValue> = {};

        Object.entries(data).forEach(([key, value]) => {
          if (value === undefined) {
            delete data[key as keyof Omit<IUserData, "familyId" | "password">];
            updates[key] = FieldValue.delete();
          }
        });

        if (Object.keys(updates).length > 0) {
          docRef.update(updates);
        }

        await projectFirestore.collection("users").doc(data.email).set(data);

        fetchUser(data.email);
      } catch (err: any) {
        revertOnError &&
          (await deleteImage(`${data.email}/profilePicture`, "users"));

        errorToast(
          err.code === "permission-denied"
            ? "Permission denied!"
            : `${err.name}:${err.code}`
        );
        setIsUserLoading(false);
        return;
      }
    },

    [fetchUser]
  );

  const deleteProfilePicture = async (user: IUserData): Promise<boolean> => {
    try {
      const isDeleted = await deleteImage(
        `${user!.email}/profilePicture`,
        "users"
      );

      if (!isDeleted) {
        setIsUserLoading(false);
        return false;
      }

      await projectFirestore
        .collection("users")
        .doc(user.email)
        .update("profilePicture", FieldValue.delete());

      setIsUserLoading(false);
      fetchUser(user.email);
      return true;
    } catch (err: any) {
      setIsUserLoading(false);
      errorToast(err.code);
      return false;
    }
  };

  const deleteBanner = async (): Promise<boolean> => {
    try {
      const isDeleted = await deleteImage(`${family!.familyId}/banner`);

      if (!isDeleted) {
        setIsFamilyLoading(false);
        return false;
      }

      await projectFirestore
        .collection("families")
        .doc(family!.familyId)
        .update("bannerUrl", FieldValue.delete());

      setIsFamilyLoading(false);
      fetchFamily(family!.familyId!);
      return true;
    } catch (err: any) {
      setIsFamilyLoading(false);
      errorToast(err.code);
      return false;
    }
  };

  useEffect(() => {
    if (authUser) fetchUser(authUser.email!);
    // NOTE: Load user on first render only
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <UserContext.Provider
      value={{
        user: user || undefined,
        createUser,
        fetchUser,
        clearUser,
        createFamily,
        doesFamilyIdExist,
        updateFamily,
        changeFamilyLoadingState,
        updateUser,
        changeUserLoadingState,
        deleteProfilePicture,
        deleteBanner,
        isUserLoading,
        isFamilyLoading,
        family,
        familyMembers,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
