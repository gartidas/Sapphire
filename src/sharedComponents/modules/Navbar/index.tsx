import {
  Avatar,
  Button,
  ClickAwayListener,
  makeStyles,
  MenuItem,
  Popper,
} from "@material-ui/core";
import { MouseEvent, useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";

import { useUser } from "../../../contextProviders/UserProvider";
import { projectAuth } from "../../../firebase/config";
import useWindowSize from "../../../hooks/useWindowSize";
import { noop } from "../../../utils/generic";
import { MD } from "../../../theme/theme";

import {
  ChipContent,
  StyledImage,
  StyledLink,
  StyledLogo,
  StyledLogoImage,
  StyledMenuWrapper,
  StyledNavbar,
} from "./index.styled";
import ThemedDivider from "../../elements/ThemedDivider";
import { getAvatarUrl } from "../../../helpers/getAvatarUrl";
import { useAuth } from "../../../contextProviders/AuthProvider";
import Icon from "../../elements/Icon";
import { EIcon } from "../../elements/Icon/model";

interface INavbarProps {
  hideUserTag?: boolean;
  useLogoLink?: boolean;
}

const useStyles = makeStyles({
  menuItem: {
    gap: "0.5rem",
    "&:hover": {
      backgroundColor: "#f500570a",
    },
  },
});

const Navbar = ({ hideUserTag, useLogoLink }: INavbarProps) => {
  const classes = useStyles();
  const auth = useAuth();
  const router = useHistory();
  const isDesktop = useWindowSize().width > MD;
  const [isAnimationRunning, setIsAnimationRunning] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const anchorRef = useRef<HTMLButtonElement>(null);
  const prevOpen = useRef(isMenuOpen);
  const { clearUser, user } = useUser();

  const handleToggle = () => {
    setIsMenuOpen((prevOpen) => !prevOpen);
  };

  // NOTE: No way to specify further
  const handleClose = (event: MouseEvent<Document, any>) => {
    if (
      anchorRef.current &&
      anchorRef.current.contains(event.target as HTMLElement)
    ) {
      return;
    }

    setIsMenuOpen(false);
  };

  const onLogoutClick = async () => {
    await projectAuth.signOut();
    clearUser();
  };

  useEffect(() => {
    if (prevOpen.current === true && isMenuOpen === false) {
      anchorRef.current!.focus();
    }

    prevOpen.current = isMenuOpen;
  }, [isMenuOpen]);

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
        <Button ref={anchorRef} onClick={handleToggle}>
          <ChipContent>
            {user?.profilePicture ? (
              <StyledImage src={user?.profilePicture} />
            ) : (
              <Avatar src={getAvatarUrl(auth.user?.email!)} />
            )}
            <div>{isMenuOpen ? "▲" : "▼"}</div>
          </ChipContent>
        </Button>
      )}
      <Popper
        open={isMenuOpen}
        anchorEl={anchorRef.current}
        role={undefined}
        placement="bottom-start"
        transition
      >
        <ClickAwayListener onClickAway={handleClose}>
          <StyledMenuWrapper autoFocusItem={isMenuOpen}>
            <MenuItem
              onClick={() => router.push("/profile")}
              className={classes.menuItem}
            >
              <Icon icon={EIcon.Profile} alt="Profile" width={40} />
              <div>Profile</div>
            </MenuItem>
            <MenuItem
              onClick={() => router.push("/family")}
              className={classes.menuItem}
            >
              <Icon icon={EIcon.Family} alt="Family" width={40} />
              <div>Family</div>
            </MenuItem>
            <MenuItem
              onClick={() => router.push("/settings")}
              className={classes.menuItem}
            >
              <Icon icon={EIcon.Settings} alt="Settings" width={40} />
              <div>Settings</div>
            </MenuItem>
            <ThemedDivider />
            <MenuItem onClick={onLogoutClick} className={classes.menuItem}>
              <Icon icon={EIcon.Logout} alt="Log out" width={40} />
              <div>Log out</div>
            </MenuItem>
          </StyledMenuWrapper>
        </ClickAwayListener>
      </Popper>
    </StyledNavbar>
  );
};

export default Navbar;
