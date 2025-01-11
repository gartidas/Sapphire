import { Helmet } from "react-helmet";

import LoggedLayout from "../components/layouts/LoggedLayout";

function Profile() {
  return (
    <LoggedLayout>
      <Helmet defer={false}>
        <title>◆ Sapphire ◆</title>
      </Helmet>
      <div>Profile</div>
    </LoggedLayout>
  );
}

export default Profile;
