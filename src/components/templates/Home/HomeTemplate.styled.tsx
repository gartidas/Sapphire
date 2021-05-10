import { Button as MuiButton } from "@material-ui/core";
import styled from "styled-components";

import { NAVBAR_HEIGHT } from "../../modules/Navbar/Navbar.styled";

export const AddButton = styled(MuiButton)`
  position: fixed;
  bottom: 10px;
  left: 10px;
  border-radius: 50%;
  padding: 20px;
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
