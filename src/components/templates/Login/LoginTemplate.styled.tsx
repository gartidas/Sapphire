import styled from "styled-components";
import Logo from "../../modules/Logo/Logo";
import { Button as MuiButton } from "@material-ui/core";

export const PageContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  height: 100vh;
`;

export const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 500px;
  width: 90%;
  flex: 1;
  > * + * {
    margin-top: 30px;
  }
`;

export const StyledLogo = styled(Logo)`
  flex: 1;
`;

export const Button = styled(MuiButton)`
  img {
    margin-right: 10px;
  }
`;
