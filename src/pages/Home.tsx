import { Helmet } from "react-helmet";

import HomeTemplate from "../sharedComponents/templates/HomeTemplate";
import LoggedLayout from "../sharedComponents/layouts/LoggedLayout";

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
