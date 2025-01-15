import { FC } from "react";
import Snowfall from "react-snowfall";
import { theme } from "../../utils/theme";

import Navbar from "../modules/Navbar/Navbar";

const LoggedLayout: FC = ({ children }) => {
  return (
    <div>
      <Snowfall color={theme.primary} />
      <Navbar useLogoLink={true} />
      {children}
    </div>
  );
};

export default LoggedLayout;
