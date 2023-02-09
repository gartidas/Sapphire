import styled from "styled-components";
import Logo from "../../modules/Logo/Logo";
import { Button as MuiButton } from "@material-ui/core";
import { FOOTER_HEIGHT } from "../../modules/Footer/Footer.styled";
import { theme } from "../../../utils/theme";

export const PageContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  height: calc(100vh - ${FOOTER_HEIGHT}px);
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

export const LoginButton = styled(MuiButton)`
  img {
    margin-right: 10px;
  }
`;

export const Text = styled.p`
  color: ${theme.primary};

  span {
    font-weight: bold;
    cursor: pointer;
  }
`;
