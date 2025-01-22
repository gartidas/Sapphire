import { Helmet } from "react-helmet";

import Footer from "../sharedComponents/modules/Footer";
import LoginTemplate from "../sharedComponents/templates/LoginTemplate";
import DefaultLayout from "../sharedComponents/layouts/DefaultLayout";

function Login() {
  return (
    <DefaultLayout>
      <Helmet>
        <title>◇ Sapphire ◇</title>
      </Helmet>
      <LoginTemplate />
      <Footer />
    </DefaultLayout>
  );
}

export default Login;
