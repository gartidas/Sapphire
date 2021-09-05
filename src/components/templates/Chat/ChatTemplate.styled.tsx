import styled from "styled-components";
import { theme } from "../../../utils/theme";
import TextBox from "../../elements/TextBox";
import { NAVBAR_HEIGHT } from "../../modules/Navbar/Navbar.styled";

export const ButtonsWrapper = styled.div`
  position: fixed;
  display: flex;
  flex-direction: column;
  bottom: 10px;
  left: 10px;

  button {
    border-radius: 50%;
    padding: 20px;
  }
`;

export const ChatWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 60%;
  border-right: 1px solid ${theme.primary};
  border-left: 1px solid ${theme.primary};
`;

export const ActionsWrapper = styled.div`
  margin-top: 5px;
  width: 100%;
  height: fit-content;
  display: flex;
  justify-content: center;
`;

export const StyledTextBox = styled(TextBox)`
  width: 95%;
  .MuiOutlinedInput-multiline {
    padding: 5px 14px 5px 14px;
  }
`;

export const MessagesWrapper = styled.div`
  width: 100%;
  height: 100%;
  overflow-y: auto;
  display: flex;
  flex-direction: column-reverse;
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: calc(100vh - ${NAVBAR_HEIGHT}px);
`;

export const DummySpan = styled.span`
  height: 1px;
  display: inline-block;
`;
