import { createContext, FC, useContext, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import firebase from "firebase/app";

import { projectAuth, projectFirestore } from "../firebase/config";
import FullPageSpinner from "../components/modules/FullPageSpinner/FullPageSpinner";
import { IUserState } from "../utils/types";

interface IAuthContextValue {
  user?: firebase.User;
}

const AuthContext = createContext<IAuthContextValue>(null!);

export const useAuth = () => useContext(AuthContext);

const AuthProvider: FC = ({ children }) => {
  const [user, loading] = useAuthState(projectAuth);

  useEffect(() => {
    projectFirestore.collection("users").onSnapshot(
      (snap) => {
        let documents: IUserState[] = [];
        snap.forEach((doc) => {
          documents.push({ ...doc.data(), id: doc.id });
        });
      },
      (err) => console.log(err)
    );
  }, [user]);

  if (loading) return <FullPageSpinner />;

  return (
    <AuthContext.Provider value={{ user: user || undefined }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
