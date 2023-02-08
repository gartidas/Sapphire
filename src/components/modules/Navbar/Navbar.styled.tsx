import styled, { css } from "styled-components";

import { LG, SM, theme } from "../../../utils/theme";
import LogoImage from "../LogoImage/LogoImage";
import Logo from "../Logo/Logo";

export const NAVBAR_HEIGHT = 80;

interface StyledLinkProps {
  useLogoLink?: boolean;
}

export const StyledNavbar = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: calc(${NAVBAR_HEIGHT}px - 1px);
  border-bottom: 1px solid ${theme.primary};
  background-color: ${theme.secondary};
`;

export const UserTag = styled.h1`
  font-size: 1.5rem;

  @media screen and (max-width: ${LG}px) {
    font-size: 1.3rem;
  }

  @media screen and (max-width: ${SM}px) {
    font-size: 1rem;
  }
`;

export const Chip = styled.div`
  display: flex;
`;

export const StyledLogo = styled(Logo)`
  margin-left: 20px;

  h1 {
    font-size: 3rem;
  }

  img {
    top: calc(50% - 1.47rem);
    margin-left: 65.1px;
  }
`;

export const StyledLogoImage = styled(LogoImage)`
  margin-left: 20px;
`;

export const StyledLink = styled.div<StyledLinkProps>`
  ${({ useLogoLink }) =>
    useLogoLink &&
    css`
      cursor: pointer;
    `};
`;
