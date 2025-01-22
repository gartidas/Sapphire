import styled from "styled-components";
import { MD, SM, theme } from "../../../utils/theme";
import { MenuList } from "@material-ui/core";
import TextBox from "../../elements/TextBox";
import { NAVBAR_HEIGHT } from "../../../const";

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

export const FamilyMembersWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  width: 70%;
  justify-content: center;
  gap: 3rem;
  margin-top: 2rem;

  @media screen and (max-width: ${MD}px) {
    justify-content: center;
  }
`;

export const InviteMemberBadge = styled.div`
  display: flex;
  align-items: center;
  text-transform: none;
  gap: 0.5rem;
`;

export const ButtonLabel = styled.div`
  margin-right: 0.25rem;
`;

export const SocialIcon = styled.a`
  transition: transform 0.5s ease;
  padding: 0;
  height: 2.5rem;

  :hover {
    transform: scale(1.5);
  }

  svg {
    font-size: 2.5rem;
  }

  @media screen and (max-width: ${SM}px) {
    svg {
      font-size: 2rem;
    }
  }
`;

export const StyledMenuWrapper = styled(MenuList)`
  background-color: ${theme.secondary};
  padding: 0;
`;
