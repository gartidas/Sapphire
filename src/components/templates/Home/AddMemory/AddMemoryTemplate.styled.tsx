import styled from "styled-components";
import { Button as MuiButton } from "@material-ui/core";

export const FormContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;

  > * + * {
    margin-top: 30px;
  }
`;

export const Button = styled(MuiButton)`
  svg {
    margin-right: 10px;
  }
`;

export const StyledInput = styled.input`
  display: none;
`;

export const StyledFileName = styled.p`
  font-weight: bold;
  padding: 0;
  margin: 0;
`;
