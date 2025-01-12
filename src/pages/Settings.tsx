import { Helmet } from "react-helmet";

import LoggedLayout from "../components/layouts/LoggedLayout";
import SettingsTemplate from "../components/templates/SettingsTemplate/SettingsTemplate";

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
