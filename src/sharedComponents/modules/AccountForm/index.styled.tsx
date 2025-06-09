import styled from "styled-components";
import { theme } from "../../../theme/theme";
import { NAVBAR_HEIGHT } from "../../../constants";

export const PageContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  height: calc(100vh - ${NAVBAR_HEIGHT}px);
`;

export const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 31.25rem;
  width: 90%;
  height: 100%;
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
