import styled, { css } from "styled-components";
import { MD, SM, theme } from "../../../utils/theme";
import { ButtonProps, IconButton as MuiButton } from "@material-ui/core";
import Spinner from "../../elements/Spinner";
import { NAVBAR_HEIGHT } from "../../../const";

interface IIndicatingButtonProps extends ButtonProps {
  isIndicating?: boolean;
}

export const IndicatingButton = styled(MuiButton)<IIndicatingButtonProps>`
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
  bottom: 0.625rem;
  left: 0.625rem;

  button {
    border-radius: 50%;
    padding: 1.25rem;
  }

  @media screen and (max-width: ${SM}px) {
    left: 0.3125rem;

    button {
      padding: 0.625rem;
    }
  }
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: calc(100vh - ${NAVBAR_HEIGHT}px);
  padding-top: 0.5rem;
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

export const FamilyNickname = styled.h2`
  font-size: 3rem;
  margin: 0;
  max-width: 70%;
  word-wrap: break-word;
  text-align: center;

  @media screen and (max-width: ${MD}px) {
    font-size: 1.5rem;
  }
`;
