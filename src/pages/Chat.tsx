import { Helmet } from "react-helmet";

import LoggedLayout from "../components/layouts/LoggedLayout";
import ChatTemplate from "../components/templates/Chat/ChatTemplate";

function Home() {
  return (
    <LoggedLayout>
      <Helmet>
        <title>◇ Sapphire ◇ Chat</title>
      </Helmet>
      <ChatTemplate />
    </LoggedLayout>
  );
}

export default Home;
