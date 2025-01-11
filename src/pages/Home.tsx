import { Helmet } from "react-helmet";

import LoggedLayout from "../components/layouts/LoggedLayout";
import HomeTemplate from "../components/templates/HomeTemplate/HomeTemplate";

function Home() {
  return (
    <LoggedLayout>
      <Helmet defer={false}>
        <title>◆ Sapphire ◆</title>
      </Helmet>
      <HomeTemplate />
    </LoggedLayout>
  );
}

export default Home;
