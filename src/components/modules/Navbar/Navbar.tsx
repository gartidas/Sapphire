import { Button } from "@material-ui/core";
import { ExitToAppRounded } from "@material-ui/icons";
import { useState } from "react";

import { useAuth } from "../../../contextProviders/AuthProvider";
import { projectAuth } from "../../../firebase/config";
import useWindowSize from "../../../hooks/useWindowSize";
import { MD } from "../../../utils/theme";

import {
  Chip,
  StyledLogo,
  StyledLogoImage,
  StyledNavbar,
  UserTag,
} from "./Navbar.styled";

const Navbar = () => {
  const auth = useAuth();
  const isDesktop = useWindowSize().width > MD;
  const [isAnimationRunning, setIsAnimationRunning] = useState(false);
  const onLogoutClick = async () => {
    await projectAuth.signOut();
  };

  return (
    <StyledNavbar>
      {isDesktop ? (
        <StyledLogo imageProps={{ size: { desktop: 12.6 } }} />
      ) : (
        <StyledLogoImage
          size={{ mobile: 40 }}
          onMouseEnter={() => setIsAnimationRunning(true)}
          isAnimationRunning={isAnimationRunning}
          onAnimationEnd={() => setIsAnimationRunning(false)}
        />
      )}
      <Chip>
        <UserTag>{auth.user?.email}</UserTag>
        <Button onClick={onLogoutClick}>
          <ExitToAppRounded />
        </Button>
      </Chip>
    </StyledNavbar>
  );
};

export default Navbar;
