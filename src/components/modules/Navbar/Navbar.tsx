import { Button } from "@material-ui/core";
import { ExitToAppRounded } from "@material-ui/icons";

import { useAuth } from "../../../contextProviders/AuthProvider";
import { projectAuth } from "../../../firebase/config";

import { StyledNavbar, UserTag } from "./Navbar.styled";

const Navbar = () => {
  const auth = useAuth();
  const onLogoutClick = async () => {
    await projectAuth.signOut();
  };

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
