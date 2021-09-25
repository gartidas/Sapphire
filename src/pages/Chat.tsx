import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";

import LoggedLayout from "../components/layouts/LoggedLayout";
import ChatTemplate from "../components/templates/Chat/ChatTemplate";
import { useAuth } from "../contextProviders/AuthProvider";

function Home() {
  const auth = useAuth();
  const titles: string[] = ["◇ Sapphire ◇ Chat", "◆ Sapphire ◆ Chat"];
  const [titleVersion, setTitleVersion] = useState(0);

  useEffect(() => {
    if (auth.isOnline) {
      const interval = setInterval(() => {
        if (titleVersion === 0) setTitleVersion(1);
        else setTitleVersion(0);
      }, 2000);
      return () => clearInterval(interval);
    }
  }, [auth, titleVersion]);

  return (
    <LoggedLayout>
      <Helmet defer={false}>
        <title>{titles[titleVersion]}</title>
      </Helmet>
      <ChatTemplate />
    </LoggedLayout>
  );
}

export default Home;
