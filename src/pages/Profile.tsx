import { Helmet } from "react-helmet";

import ProfileTemplate from "../sharedComponents/templates/ProfileTemplate";
import LoggedLayout from "../sharedComponents/layouts/LoggedLayout";

function Profile() {
  return (
    <LoggedLayout>
      <Helmet defer={false}>
        <title>◆ Sapphire ◆</title>
      </Helmet>
      <ProfileTemplate />
    </LoggedLayout>
  );
}

export default Profile;
