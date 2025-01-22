import { Helmet } from "react-helmet";

import FamilyTemplate from "../sharedComponents/templates/FamilyTemplate";
import LoggedLayout from "../sharedComponents/layouts/LoggedLayout";

function Family() {
  return (
    <LoggedLayout>
      <Helmet defer={false}>
        <title>◆ Sapphire ◆</title>
      </Helmet>
      <FamilyTemplate />
    </LoggedLayout>
  );
}

export default Family;
