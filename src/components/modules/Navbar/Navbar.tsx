import { Button } from "@material-ui/core";
import { useState } from "react";
import { useHistory } from "react-router-dom";

import { useAuth } from "../../../contextProviders/AuthProvider";
import { useUser } from "../../../contextProviders/UserProvider";
import { projectAuth } from "../../../firebase/config";
import useWindowSize from "../../../hooks/useWindowSize";
import { noop } from "../../../utils";
import { MD } from "../../../utils/theme";
import logoutIcon from "./Logout.gif";

import {
  Chip,
  StyledLink,
  StyledLogo,
  StyledLogoImage,
  StyledNavbar,
  UserTag,
} from "./Navbar.styled";

interface NavabarProps {
  hideUserTag?: boolean;
  useLogoLink?: boolean;
}

const Navbar = ({ hideUserTag, useLogoLink }: NavabarProps) => {
  const auth = useAuth();
  const router = useHistory();
  const isDesktop = useWindowSize().width > MD;
  const [isAnimationRunning, setIsAnimationRunning] = useState(false);
  const { clearUser } = useUser();
  const onLogoutClick = async () => {
    await projectAuth.signOut();
    clearUser();
  };

  return (
    <StyledNavbar>
      <StyledLink
        useLogoLink={useLogoLink}
        onClick={useLogoLink ? () => router.push("/home") : noop}
      >
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
      </StyledLink>
      {!hideUserTag && (
        <Chip>
          <UserTag>{auth.user?.email}</UserTag>
          <Button onClick={onLogoutClick}>
            <img src={logoutIcon} alt="Log out" width={40} />
          </Button>
        </Chip>
      )}
    </StyledNavbar>
  );
};

export default Navbar;
