import { IconButton as MuiButton } from "@material-ui/core";
import styled from "styled-components";

import { SM } from "../../../utils/theme";

export const Wrapper = styled.div`
  display: flex;
  position: fixed;
  bottom: 10px;
  right: 10px;
`;

export const Button = styled(MuiButton)`
  border-radius: 50%;
  padding: 20px;

  @media screen and (max-width: ${SM}px) {
    padding: 10px;
  }
`;
