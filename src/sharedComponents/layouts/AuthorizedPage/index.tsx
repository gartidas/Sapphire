import { Redirect, Route, RouteProps } from "react-router-dom";
import { useAuth } from "../../../contextProviders/AuthProvider";

const AuthorizedPage = (props: RouteProps) => {
  const auth = useAuth();
  if (auth.user) return <Route {...props} />;
  else return <Redirect to="/login" />;
};

export default AuthorizedPage;
