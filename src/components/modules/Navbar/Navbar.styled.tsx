import styled from "styled-components";

import { SM } from "../../../utils/theme";

export const NAVBAR_HEIGHT = 80;

export const StyledNavbar = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  height: ${NAVBAR_HEIGHT}px;
`;

export const UserTag = styled.h1`
  font-size: 1.5rem;

  @media screen and (max-width: ${SM}px) {
    font-size: 1rem;
  }
`;
