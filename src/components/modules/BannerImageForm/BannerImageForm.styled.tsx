import styled from "styled-components";

export const FormContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;

  > * + * {
    margin-top: 30px;
  }
`;
