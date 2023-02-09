import styled from "styled-components";
import { theme } from "../../../utils/theme";
import { NAVBAR_HEIGHT } from "../../modules/Navbar/Navbar.styled";

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
  max-width: 500px;
  width: 90%;
  height: 100%;
  flex: 1;
  > * + * {
    margin-top: 30px;
  }
`;

export const Text = styled.p`
  color: ${theme.primary};

  span {
    font-weight: bold;
    cursor: pointer;
  }
`;
