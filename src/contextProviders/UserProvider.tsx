import {
  createContext,
  FC,
  useCallback,
  useContext,
  useState,
  useEffect,
} from "react";

import { projectFirestore } from "../firebase/config";
import { IFamily, IUserData } from "../utils/types";
import { errorToast } from "../services/toastService";
import { useAuth } from "./AuthProvider";

interface IUserContextValue {
  user?: IUserData;
  createUser: (data: Omit<IUserData, "password">) => Promise<void>;
  fetchUser: (email: string) => Promise<void>;
  clearUser: () => void;
  createFamily: (data: IFamily) => Promise<void>;
  doesFamilyIdExist: (familyId: string) => Promise<boolean>;
  family?: IFamily;
}

const UserContext = createContext<IUserContextValue>(null!);

export const useUser = () => useContext(UserContext);

const UserProvider: FC = ({ children }) => {
  const [user, setUser] = useState<IUserData>();
  const [family, setFamily] = useState<IFamily>();
  const { user: authUser } = useAuth();

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
        family,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
