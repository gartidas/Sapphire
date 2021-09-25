import { createContext, FC, useContext, useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import firebase from "firebase/app";

import { projectAuth, projectFirestore } from "../firebase/config";
import PageLoader from "../components/modules/PageLoader/PageLoader";
import { IUserState } from "../utils/types";

interface IAuthContextValue {
  user?: firebase.User;
  isOnline?: boolean;
}

const AuthContext = createContext<IAuthContextValue>(null!);

export const useAuth = () => useContext(AuthContext);

const AuthProvider: FC = ({ children }) => {
  const [user, loading] = useAuthState(projectAuth);
  const [isOnline, setIsOnline] = useState(false);

  useEffect(() => {
    projectFirestore.collection("users").onSnapshot(
      (snap) => {
        let documents: IUserState[] = [];
        snap.forEach((doc) => {
          documents.push({ ...doc.data(), id: doc.id });
        });
        let changedUserState = documents.find((x) => x.id !== user?.email);

        if (changedUserState) {
          setIsOnline(changedUserState.isOnline!);
        }
      },
      (err) => console.log(err)
    );
  }, [user]);

  if (loading) return <PageLoader />;

  return (
    <AuthContext.Provider
      value={{ user: user || undefined, isOnline: isOnline || undefined }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
