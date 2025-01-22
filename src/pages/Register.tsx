import { Helmet } from "react-helmet";
import { useHistory, useParams } from "react-router-dom";

import RegisterTemplate from "../components/templates/RegisterTemplate";
import { useEffect } from "react";
import Navbar from "../components/modules/Navbar";
import Cookies from "universal-cookie";
import DefaultLayout from "../components/layouts/DefaultLayout";

function Register() {
  const { sessionId } = useParams<{ sessionId: string }>();
  const router = useHistory();

  useEffect(() => {
    if (!sessionId) return;

    const cookies = new Cookies();
    cookies.set("sessionId", sessionId);
    router.replace(`/register`);
  }, [sessionId, router]);

  return (
    <DefaultLayout>
      <Helmet>
        <title>◇ Sapphire ◇</title>
      </Helmet>
      <Navbar hideUserTag useLogoLink />
      <RegisterTemplate />
    </DefaultLayout>
  );
}

export default Register;
