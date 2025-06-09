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
import { deleteFolder, deleteImage } from "../../helpers/imageStorageHandlers";
import firebase from "firebase/app";
import { useAuth } from "../AuthProvider";
import { deleteCollection } from "../../utils/firebase";

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
  removeMemberFromFamily: (
    data: Omit<IUserData, "familyId">,
    newFamilyId: string
  ) => Promise<void>;
  leaveFamily: (
    data: Omit<IUserData, "familyId">,
    newFamilyId: string
  ) => Promise<void>;
  joinFamily: (
    data: Omit<IUserData, "familyId">,
    oldFamilyId: string,
    newFamilyId: string
  ) => Promise<boolean>;
  addMemberToFamily: (
    data: Omit<IUserData, "familyId">,
    newFamilyId: string
  ) => Promise<boolean>;
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

  const fetchFamily = useCallback(
    async (familyId: string) => {
      try {
        const response = await projectFirestore
          .collection("/families")
          .doc(familyId)
          .get();

        if (!response.exists) return;

        const newFamily = response.data()! as IFamily;

        setFamily(newFamily);
        await fetchFamilyMembers(familyId);
      } catch (err: any) {
        errorToast(
          err.code === "permission-denied"
            ? "Permission denied!"
            : `${err.name}:${err.code}`
        );
      }
    },
    [fetchFamilyMembers]
  );

  const fetchUser = useCallback(
    async (email: string) => {
      try {
        const response = await projectFirestore
          .collection("/users")
          .doc(email)
          .get();

        if (!response.exists) return;

        const newUser = response.data()! as IUserData;
        setUser(newUser);
        await fetchFamily(newUser.familyId);
      } catch (err: any) {
        errorToast(
          err.code === "permission-denied"
            ? "Permission denied!"
            : `${err.name}:${err.code}`
        );
      }
    },
    [fetchFamily]
  );

  const clearUser = () => {
    setUser(undefined);
    clearFamily();
  };

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
          await docRef.update(updates);
        }

        await projectFirestore
          .collection("families")
          .doc(family!.familyId)
          .set({ ...data, familyId: family!.familyId });

        await fetchFamily(family!.familyId);
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
      await fetchUser(email);
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
          await docRef.update(updates);
        }

        await projectFirestore.collection("users").doc(data.email).set(data);

        await fetchUser(data.email);
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

  const removeMemberFromFamily = useCallback(
    async (data: Omit<IUserData, "familyId">, newFamilyId: string) => {
      try {
        await createFamily({
          familyId: newFamilyId,
          familyOwnerEmail: data.email,
        });

        await projectFirestore
          .collection("users")
          .doc(data.email)
          .set({ ...data, familyId: newFamilyId } as IUserData);

        await fetchUser(user!.email);
        setIsFamilyLoading(false);
      } catch (err: any) {
        errorToast(
          err.code === "permission-denied"
            ? "Permission denied!"
            : `${err.name}:${err.code}`
        );
        setIsFamilyLoading(false);
        return;
      }
    },

    [createFamily, fetchUser, user]
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

      await fetchUser(user.email);
      setIsUserLoading(false);
      return true;
    } catch (err: any) {
      setIsUserLoading(false);
      errorToast(err.code);
      return false;
    }
  };

  const deleteBanner = useCallback(async (): Promise<boolean> => {
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

      await fetchFamily(family!.familyId!);
      setIsFamilyLoading(false);
      return true;
    } catch (err: any) {
      setIsFamilyLoading(false);
      errorToast(err.code);
      return false;
    }
  }, [family, fetchFamily]);

  const deleteFamily = useCallback(
    async (familyId: string): Promise<boolean> => {
      try {
        await deleteCollection(`familyAssets/memories/${familyId}`);
        await deleteBanner();
        await deleteFolder(familyId);
        await projectFirestore.collection("/families").doc(familyId).delete();
        return true;
      } catch (err: any) {
        errorToast(
          err.code === "permission-denied"
            ? "Permission denied!"
            : `${err.name}:${err.code}`
        );
        return false;
      }
    },
    [deleteBanner]
  );

  const addMemberToFamily = useCallback(
    async (
      data: Omit<IUserData, "familyId">,
      newFamilyId: string
    ): Promise<boolean> => {
      try {
        await projectFirestore
          .collection("users")
          .doc(data.email)
          .set({ ...data, familyId: newFamilyId } as IUserData);

        await fetchUser(data.email);
        setIsFamilyLoading(false);
        return true;
      } catch (err: any) {
        errorToast(
          err.code === "permission-denied"
            ? "Permission denied!"
            : `${err.name}:${err.code}`
        );
        setIsFamilyLoading(false);
        return false;
      }
    },
    [fetchUser]
  );

  const joinFamily = useCallback(
    async (
      data: Omit<IUserData, "familyId">,
      oldFamilyId: string,
      newFamilyId: string
    ): Promise<boolean> => {
      try {
        await projectFirestore
          .collection("users")
          .doc(data.email)
          .set({ ...data, familyId: newFamilyId } as IUserData);

        await deleteFamily(oldFamilyId);
        await fetchUser(data.email);
        setIsFamilyLoading(false);
        return true;
      } catch (err: any) {
        errorToast(
          err.code === "permission-denied"
            ? "Permission denied!"
            : `${err.name}:${err.code}`
        );
        setIsFamilyLoading(false);
        return false;
      }
    },
    [deleteFamily, fetchUser]
  );

  const leaveFamily = useCallback(
    async (data: Omit<IUserData, "familyId">, newFamilyId: string) => {
      try {
        await createFamily({
          familyId: newFamilyId,
          familyOwnerEmail: data.email,
        });

        await projectFirestore
          .collection("users")
          .doc(data.email)
          .set({ ...data, familyId: newFamilyId } as IUserData);

        await fetchUser(data.email);
        setIsFamilyLoading(false);
      } catch (err: any) {
        errorToast(
          err.code === "permission-denied"
            ? "Permission denied!"
            : `${err.name}:${err.code}`
        );
        setIsFamilyLoading(false);
        return;
      }
    },

    [createFamily, fetchUser]
  );

  useEffect(() => {
    if (authUser) {
      void fetchUser(authUser.email!);
    }
    // NOTE: Load user on first render only
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <UserContext.Provider
      value={{
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
        removeMemberFromFamily,
        leaveFamily,
        joinFamily,
        addMemberToFamily,
        user,
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
