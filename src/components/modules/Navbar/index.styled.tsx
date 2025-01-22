import styled, { css } from "styled-components";
import { LG, SM, theme } from "../../../utils/theme";
import LogoImage from "../LogoImage";
import Logo from "../Logo";
import { MenuList } from "@material-ui/core";
import { NAVBAR_HEIGHT } from "../../../const";

interface IStyledLinkProps {
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
  margin-left: 1.25rem;

  h1 {
    font-size: 3rem;
  }

  img {
    top: calc(50% - 1.47rem);
    margin-left: 4.06875rem;
  }
`;

export const StyledLogoImage = styled(LogoImage)`
  margin-left: 1.25rem;
`;

export const StyledLink = styled.div<IStyledLinkProps>`
  ${({ useLogoLink }) =>
    useLogoLink &&
    css`
      cursor: pointer;
    `};
`;

export const StyledMenuWrapper = styled(MenuList)`
  background-color: ${theme.secondary};
  padding: 0;
`;

export const ChipContent = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const StyledImage = styled.img`
  border-radius: 50%;
  height: 2.5rem;
  width: 2.5rem;
  object-fit: cover;
  object-position: center;
`;
