import styled from "styled-components";
import { NAVBAR_HEIGHT } from "../../modules/Navbar/Navbar.styled";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: calc(100vh - ${NAVBAR_HEIGHT}px);
`;
