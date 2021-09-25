import styled from "styled-components";
import { IconButton as MuiButton } from "@material-ui/core";
import { SM, theme } from "../../../utils/theme";

import { NAVBAR_HEIGHT } from "../../modules/Navbar/Navbar.styled";

export const ButtonsWrapper = styled.div`
  position: fixed;
  display: flex;
  flex-direction: column;
  bottom: 10px;
  left: 10px;

  button {
    border-radius: 50%;
    padding: 20px;
  }

  @media screen and (max-width: ${SM}px) {
    left: 5px;

    button {
      padding: 10px;
    }
  }
`;

export const IndicatingButton = styled(MuiButton)`
  box-shadow: 0 0 0 0 ${theme.primary}, 0 0 0 0 ${theme.primary};
  animation: pulse 2s infinite cubic-bezier(0.66, 0.33, 0, 1);

  @keyframes pulse {
    to {
      box-shadow: 0 0 0 12px transparent, 0 0 0 24px rgba(227, 115, 14, 0);
    }
  }
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: calc(100vh - ${NAVBAR_HEIGHT}px);
`;

export const TimelineWrapper = styled.div`
  min-width: 80%;
  margin-right: auto;
  margin-left: auto;
`;
