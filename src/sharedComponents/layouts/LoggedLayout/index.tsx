import { FC } from "react";
import BackgroundFallEffect from "../../elements/BackgroundFallEffect";
import Navbar from "../../modules/Navbar";

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
