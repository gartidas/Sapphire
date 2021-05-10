import { FC } from "react";

import Navbar from "../modules/Navbar/Navbar";

const LoggedLayout: FC = ({ children }) => {
  return (
    <div>
      <Navbar />
      {children}
    </div>
  );
};

export default LoggedLayout;
