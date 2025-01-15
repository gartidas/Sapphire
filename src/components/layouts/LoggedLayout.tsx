import { FC } from "react";

import Navbar from "../modules/Navbar/Navbar";
import BackgroundFallEffect from "../elements/BackgroundFallEffect/BackgroundFallEffect";

const LoggedLayout: FC = ({ children }) => {
  return (
    <div>
      <BackgroundFallEffect />
      <Navbar useLogoLink={true} />
      {children}
    </div>
  );
};

export default LoggedLayout;
