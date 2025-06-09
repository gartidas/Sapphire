import { Helmet } from "react-helmet";

import SettingsTemplate from "../sharedComponents/templates/SettingsTemplate";
import LoggedLayout from "../sharedComponents/layouts/LoggedLayout";

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
