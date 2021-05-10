import { Redirect, Route, Switch } from "react-router";
import { ToastContainer } from "react-toastify";
import AuthorizedPage from "./components/layouts/AuthorizedPage";
import Home from "./pages/Home";
import Login from "./pages/Login";
import "react-toastify/dist/ReactToastify.min.css";

function App() {
  return (
    <div>
      <Switch>
        <Route path="/login" exact component={Login} />
        <AuthorizedPage path="/home" exact component={Home} />
        <Redirect to="/home" />
      </Switch>
      <ToastContainer />
    </div>
  );
}

export default App;
