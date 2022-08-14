import { CircularProgress } from "@material-ui/core";
import styled from "styled-components";
import { SM } from "../../../utils/theme";

import { NAVBAR_HEIGHT } from "../../modules/Navbar/Navbar.styled";

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
`;

export const Spinner = styled(CircularProgress)`
  align-self: center;
`;
