import styled from "styled-components";
import { MD, theme } from "../../../utils/theme";
import { NAVBAR_HEIGHT } from "../../modules/Navbar/Navbar.styled";
import TextBox from "../../elements/TextBox";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: calc(100vh - ${NAVBAR_HEIGHT}px);
  padding: 1rem 0;
  gap: 1rem;
`;

export const BannerPlaceholder = styled.div`
  display: flex;
  background: rgb(0, 0, 0);
  background: linear-gradient(
    193deg,
    rgba(0, 0, 0, 1) 0%,
    rgba(245, 0, 87, 1) 100%
  );
  width: 80%;
  min-height: 25vh;
  color: ${theme.primary};
  text-shadow: 0.1rem 0.1rem ${theme.secondary};
  cursor: pointer;
  height: fit-content;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 1rem;
`;

export const StyledImage = styled.img`
  cursor: pointer;
  border-radius: 1rem;
  height: 25vh;
  width: 80%;
  object-fit: cover;
  object-position: center;
`;

export const FamilyNicknamePlaceholder = styled.h2`
  cursor: pointer;
  font-size: 3rem;
  margin: 0;
  max-width: 70%;
  word-wrap: break-word;

  @media screen and (max-width: ${MD}px) {
    font-size: 1.75rem;
  }
`;

export const StyledTextBox = styled(TextBox)`
  width: 32rem;

  @media screen and (max-width: ${MD}px) {
    width: 19rem;
  }
`;
