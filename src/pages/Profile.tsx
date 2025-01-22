import { Helmet } from "react-helmet";

import ProfileTemplate from "../components/templates/ProfileTemplate";
import LoggedLayout from "../components/layouts/LoggedLayout";

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
