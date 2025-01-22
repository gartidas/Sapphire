import styled from "styled-components";
import { Button as MuiButton } from "@material-ui/core";
import TextBox from "../TextBox";

export const ShowHideButton = styled(MuiButton)`
  position: absolute;
  padding-top: 0.5rem;
  right: 0;
`;

export const PasswordWrapper = styled.div`
  position: relative;
  width: 100%;
`;

export const StyledTextBox = styled(TextBox)`
  input {
    padding: 1.15625rem 4rem 1.15625rem 0.875rem;
  }
`;
