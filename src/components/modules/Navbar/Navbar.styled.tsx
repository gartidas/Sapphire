import styled from "styled-components";

import { SM, theme } from "../../../utils/theme";

export const NAVBAR_HEIGHT = 80;

export const StyledNavbar = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  height: calc(${NAVBAR_HEIGHT}px - 1px);
  border-bottom: 1px solid ${theme.primary};
`;

export const UserTag = styled.h1`
  font-size: 1.5rem;

  @media screen and (max-width: ${SM}px) {
    font-size: 1rem;
  }
`;
