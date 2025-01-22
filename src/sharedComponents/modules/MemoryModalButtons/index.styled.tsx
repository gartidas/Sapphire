import { IconButton as MuiButton } from "@material-ui/core";
import styled from "styled-components";

import { SM } from "../../../theme/theme";

export const Wrapper = styled.div`
  display: flex;
  position: fixed;
  bottom: 0.625rem;
  right: 0.625rem;
`;

export const Button = styled(MuiButton)`
  border-radius: 50%;
  padding: 1.25rem;

  @media screen and (max-width: ${SM}px) {
    padding: 0.625rem;
  }
`;
