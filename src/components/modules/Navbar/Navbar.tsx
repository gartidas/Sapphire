import { Button } from "@material-ui/core";
import { ExitToAppRounded } from "@material-ui/icons";
import moment from "moment";
import { useCallback } from "react";

import { useAuth } from "../../../contextProviders/AuthProvider";
import { projectAuth } from "../../../firebase/config";
import { handleUserStateChanged } from "../../../utils/helperMethods";
import { IUserState } from "../../../utils/types";

import { StyledNavbar, UserTag } from "./Navbar.styled";

const Navbar = () => {
  const auth = useAuth();
  const onLogoutClick = async () => {
    await handleIsOnlineChanged(false);
    await projectAuth.signOut();
  };

  const handleIsOnlineChanged = useCallback(
    async (isOnline: boolean) => {
      if (!auth.user?.email) return;

      let userState: IUserState = {
        id: auth.user.email,
        isOnline: isOnline,
        lastOnline: isOnline ? "" : moment().toLocaleString(),
      };
      await handleUserStateChanged(userState);
    },
    [auth]
  );

  return (
    <StyledNavbar>
      <UserTag>{auth.user?.email}</UserTag>
      <Button onClick={onLogoutClick}>
        <ExitToAppRounded />
      </Button>
    </StyledNavbar>
  );
};

export default Navbar;
