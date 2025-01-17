import { Helmet } from "react-helmet";

import LoggedLayout from "../components/layouts/LoggedLayout";
import FamilyTemplate from "../components/templates/FamilyTemplate/FamilyTemplate";

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
