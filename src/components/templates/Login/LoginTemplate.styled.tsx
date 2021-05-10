import styled from "styled-components";

export const PageContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

export const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 50px;
  max-width: 500px;
  width: 100%;
  > * + * {
    margin-top: 30px;
  }
`;
