import styled from "styled-components";
import { NAVBAR_HEIGHT } from "../../modules/Navbar/index.styled";
import TextBox from "../../elements/TextBox";
import { MD } from "../../../utils/theme";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: calc(100vh - ${NAVBAR_HEIGHT}px - 2rem);
  padding: 1rem 0;
`;

export const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 60%;

  @media screen and (max-width: ${MD}px) {
    width: 90%;
  }
`;

export const StyledTextBox = styled(TextBox)`
  width: 32rem;

  @media screen and (max-width: ${MD}px) {
    width: 19rem;
  }
`;

export const FamilyNicknamePlaceholder = styled.h2`
  cursor: pointer;
  font-size: 2rem;
  margin: 0;
  word-wrap: break-word;

  @media screen and (max-width: ${MD}px) {
    font-size: 1.5rem;
  }
`;

export const EmailWrapper = styled.h2`
  font-size: 2rem;
  margin: 0;
  margin-left: 6rem;
  word-wrap: break-word;
  align-self: flex-start;

  @media screen and (max-width: ${MD}px) {
    font-size: 1.5rem;
  }
`;

export const TitleCard = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

export const StyledImage = styled.img`
  cursor: pointer;
  border-radius: 50%;
  height: 5rem;
  width: 5rem;
  object-fit: cover;
  object-position: center;
`;
