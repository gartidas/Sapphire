import { Helmet } from "react-helmet";

import HomeTemplate from "../components/templates/HomeTemplate";
import LoggedLayout from "../components/layouts/LoggedLayout";

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
