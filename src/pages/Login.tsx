import { Helmet } from "react-helmet";

import DefaultLayout from "../components/layouts/DefaultLayout";
import Footer from "../components/modules/Footer/Footer";
import LoginTemplate from "../components/templates/LoginTemplate/LoginTemplate";

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
