import { Helmet } from "react-helmet";

import SettingsTemplate from "../components/templates/SettingsTemplate";
import LoggedLayout from "../components/layouts/LoggedLayout";

function Settings() {
  return (
    <LoggedLayout>
      <Helmet defer={false}>
        <title>◆ Sapphire ◆</title>
      </Helmet>
      <SettingsTemplate />
    </LoggedLayout>
  );
}

export default Settings;
