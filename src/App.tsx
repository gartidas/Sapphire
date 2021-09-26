import { useCallback, useEffect } from "react";
import { Redirect, Route, Switch } from "react-router";
import { ToastContainer } from "react-toastify";
import moment from "moment";
import "react-toastify/dist/ReactToastify.min.css";

import AuthorizedPage from "./components/layouts/AuthorizedPage";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Chat from "./pages/Chat";
import useOnlineStatus from "./contextProviders/MyOnlineStatusProvider";
import { useAuth } from "./contextProviders/AuthProvider";
import { IUserState } from "./utils/types";
import { handleUserStateChanged } from "./utils/helperMethods";

function App() {
  moment().locale("sk-SK");
  const isMeOnline = useOnlineStatus();
  const auth = useAuth();

  const handleIsOnlineChanged = useCallback(
    async (isOnline: boolean) => {
      if (!auth.user?.email) return;

      let userState: IUserState = {
        id: auth.user.email,
        isOnline: isOnline,
        lastOnline: isOnline ? "" : moment().toLocaleString(),
      };
      await handleUserStateChanged(userState);
    },
    [auth]
  );

  useEffect(() => {
    handleIsOnlineChanged(isMeOnline);
  }, [handleIsOnlineChanged, isMeOnline]);

  window.onbeforeunload = () => {
    handleIsOnlineChanged(false);
    setTimeout(() => {}, 5000);
  };

  return (
    <div>
      <Switch>
        <Route path="/login" exact component={Login} />
        <AuthorizedPage path="/chat" exact component={Chat} />
        <AuthorizedPage path="/home" exact component={Home} />
        <Redirect to="/home" />
      </Switch>
      <ToastContainer />
    </div>
  );
}

export default App;
