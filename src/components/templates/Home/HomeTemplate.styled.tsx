import styled, { css } from "styled-components";
import { SM, theme } from "../../../utils/theme";
import { ButtonProps, IconButton as MuiButton } from "@material-ui/core";
import { NAVBAR_HEIGHT } from "../../modules/Navbar/Navbar.styled";
import Spinner from "../../elements/Spinner/Spinner";

interface IndicatingButtonProps extends ButtonProps {
  isIndicating?: boolean;
}

export const IndicatingButton = styled(MuiButton)<IndicatingButtonProps>`
  ${({ isIndicating }) =>
    isIndicating &&
    css`
      animation: pulse 2s infinite cubic-bezier(0.66, 0.33, 0, 1);
      box-shadow: 0 0 0 0 ${theme.primary}, 0 0 0 0 ${theme.primary};
    `};

  @keyframes pulse {
    to {
      box-shadow: 0 0 0 12px transparent, 0 0 0 24px rgba(227, 115, 14, 0);
    }
  }
`;

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
  display: flex;
  flex-direction: column;
`;

export const DummymSpan = styled.span`
  height: 1px;
  display: inline-block;
  align-self: center;
`;

export const StyledSpinner = styled(Spinner)`
  align-self: center;
`;
