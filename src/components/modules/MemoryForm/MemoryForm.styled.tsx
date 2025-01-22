import styled from "styled-components";

export const FormContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1.25rem;

  > * + * {
    margin-top: 1.875rem;
  }
`;
