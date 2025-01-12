import { Helmet } from "react-helmet";

import LoggedLayout from "../components/layouts/LoggedLayout";
import ProfileTemplate from "../components/templates/ProfileTemplate/ProfileTemplate";

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
