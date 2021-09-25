import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";

import LoggedLayout from "../components/layouts/LoggedLayout";
import HomeTemplate from "../components/templates/Home/HomeTemplate";
import { useAuth } from "../contextProviders/AuthProvider";

function Home() {
  const auth = useAuth();
  const titles: string[] = ["◇ Sapphire ◇ Home", "◆ Sapphire ◆ Home"];
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
      <HomeTemplate />
    </LoggedLayout>
  );
}

export default Home;
