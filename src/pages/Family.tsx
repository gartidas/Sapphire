import { Helmet } from "react-helmet";

import FamilyTemplate from "../components/templates/FamilyTemplate";
import LoggedLayout from "../components/layouts/LoggedLayout";

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
