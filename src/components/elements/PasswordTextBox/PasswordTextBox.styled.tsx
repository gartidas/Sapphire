import styled from "styled-components";
import TextBox from "../TextBox";
import { Button as MuiButton } from "@material-ui/core";

export const ShowHideButton = styled(MuiButton)`
  position: absolute;
  padding-top: 8px;
  right: 0;
`;

export const PasswordWrapper = styled.div`
  position: relative;
  width: 100%;
`;

export const StyledTextBox = styled(TextBox)`
  input {
    padding: 18.5px 64px 18.5px 14px;
  }
`;
