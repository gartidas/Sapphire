import styled, { css } from "styled-components";
import { MD, SM, theme } from "../../../theme/theme";
import { ButtonProps, IconButton as MuiButton } from "@material-ui/core";
import Spinner from "../../elements/Spinner";
import { NAVBAR_HEIGHT } from "../../../constants";

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

  :hover {
    background-color: #f500570a;
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
  min-height: calc(100vh - ${NAVBAR_HEIGHT}px - 0.5rem);
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
  display: flex;
  justify-content: center;
  font-size: 3rem;
  margin: 0;
  max-width: 80%;
  text-align: center;

  span {
    max-width: 55%;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    word-wrap: break-word;
  }

  @media screen and (max-width: ${MD}px) {
    font-size: 1.5rem;
  }
`;
