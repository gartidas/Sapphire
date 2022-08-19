import styled from "styled-components";

export const PageContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  height: 100vh;
`;

export const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 500px;
  width: 90%;
  flex: 1;
  > * + * {
    margin-top: 30px;
  }
`;
