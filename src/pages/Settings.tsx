import { Helmet } from "react-helmet";

import LoggedLayout from "../components/layouts/LoggedLayout";

function Settings() {
  return (
    <LoggedLayout>
      <Helmet defer={false}>
        <title>◆ Sapphire ◆</title>
      </Helmet>
      <div>Settings</div>
    </LoggedLayout>
  );
}

export default Settings;
