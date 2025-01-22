import { Redirect, Route, Switch } from "react-router";
import { ToastContainer } from "react-toastify";
import moment from "moment";
import "react-toastify/dist/ReactToastify.min.css";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Family from "./pages/Family";
import Settings from "./pages/Settings";
import AuthorizedPage from "./components/layouts/AuthorizedPage";

function App() {
  moment().locale("sk-SK");

  return (
    <div>
      <Switch>
        <Route path="/login" exact component={Login} />
        <Route path="/register/:sessionId" exact component={Register} />
        <Route path="/register" exact component={Register} />
        <AuthorizedPage path="/home" exact component={Home} />
        <AuthorizedPage path="/profile" exact component={Profile} />
        <AuthorizedPage path="/family" exact component={Family} />
        <AuthorizedPage path="/settings" exact component={Settings} />
        <Redirect to="/home" />
      </Switch>
      <ToastContainer />
    </div>
  );
}

export default App;
