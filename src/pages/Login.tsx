import { Helmet } from "react-helmet";

import DefaultLayout from "../components/layouts/DefaultLayout";
import LoginTemplate from "../components/templates/Login/LoginTemplate";

function Login() {
  return (
    <DefaultLayout>
      <Helmet>
        <title>◇ Sapphire ◇ Login</title>
      </Helmet>
      <LoginTemplate />
    </DefaultLayout>
  );
}

export default Login;
