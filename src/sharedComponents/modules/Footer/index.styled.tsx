import styled from "styled-components";
import { MD, SM, theme } from "../../../theme/theme";
import { FOOTER_HEIGHT } from "../../../constants";

export const StyledFooter = styled.div`
  bottom: 0;
  position: fixed;
  width: calc(100vw - 1.25rem);
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: calc(${FOOTER_HEIGHT}px - 1px);
  border-top: 1px solid ${theme.primary};
  padding: 0 0.625rem;
  background-color: ${theme.secondary};
`;

export const SocialsWrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const DevelopedBy = styled.h1`
  font-size: 1.5rem;

  @media screen and (max-width: ${MD}px) {
    display: none;
  }
`;

export const Version = styled.h1`
  font-size: 1.5rem;

  @media screen and (max-width: ${SM}px) {
    font-size: 1.3rem;
  }
`;

export const SocialIcon = styled.a`
  transition: transform 0.5s ease;
  padding: 0 0.625rem 0 0.625rem;

  :hover {
    transform: scale(1.5);
  }

  svg {
    font-size: 2.5rem;
  }

  @media screen and (max-width: ${SM}px) {
    svg {
      font-size: 2rem;
    }
  }
`;
