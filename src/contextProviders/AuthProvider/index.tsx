import { createContext, FC, useContext } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import firebase from "firebase/app";
import { projectAuth } from "../../firebase/config";
import FullPageSpinner from "../../sharedComponents/modules/FullPageSpinner";

interface IAuthContextValue {
  user?: firebase.User;
}

const AuthContext = createContext<IAuthContextValue>(null!);

export const useAuth = () => useContext(AuthContext);

const AuthProvider: FC = ({ children }) => {
  const [user, loading] = useAuthState(projectAuth);

  if (loading) return <FullPageSpinner />;

  return (
    <AuthContext.Provider value={{ user: user || undefined }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
