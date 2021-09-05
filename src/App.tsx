import { Redirect, Route, Switch } from "react-router";
import { ToastContainer } from "react-toastify";
import moment from "moment";
import AuthorizedPage from "./components/layouts/AuthorizedPage";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Chat from "./pages/Chat";
import "react-toastify/dist/ReactToastify.min.css";

function App() {
  moment().locale("sk-SK");

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
