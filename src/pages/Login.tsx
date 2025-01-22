import { Helmet } from "react-helmet";

import Footer from "../components/modules/Footer";
import LoginTemplate from "../components/templates/LoginTemplate";
import DefaultLayout from "../components/layouts/DefaultLayout";

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
