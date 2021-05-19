import { Helmet } from "react-helmet";

import LoggedLayout from "../components/layouts/LoggedLayout";
import HomeTemplate from "../components/templates/Home/HomeTemplate";

function Home() {
  return (
    <LoggedLayout>
      <Helmet>
        <title>◇ Sapphire ◇ Home</title>
      </Helmet>
      <HomeTemplate />
    </LoggedLayout>
  );
}

export default Home;
