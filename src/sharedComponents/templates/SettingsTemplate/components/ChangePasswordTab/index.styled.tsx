import styled from "styled-components";
import { MD, theme } from "../../../../../theme/theme";

export const PageContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  height: 100%;
  width: 60%;
  max-width: 62.5rem;

  @media screen and (max-width: ${MD}px) {
    width: 80%;
  }
`;

export const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  flex: 1;
  > * + * {
    margin-top: 1.875rem;
  }
`;

export const Text = styled.p`
  color: ${theme.primary};

  span {
    font-weight: bold;
    cursor: pointer;
  }
`;
