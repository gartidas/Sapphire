import styled, { css } from "styled-components";
import { MD, SM, theme } from "../../../theme/theme";
import { MenuList, Button as MuiButton } from "@material-ui/core";
import TextBox from "../../elements/TextBox";
import { NAVBAR_HEIGHT } from "../../../constants";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: calc(100vh - ${NAVBAR_HEIGHT}px - 2rem);
  padding: 1rem 0;
`;

export const BannerPlaceholder = styled.div`
  display: flex;
  background: rgb(0, 0, 0);
  background: linear-gradient(
    193deg,
    rgba(0, 0, 0, 1) 0%,
    rgba(245, 0, 87, 1) 100%
  );
  width: 100%;
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
  width: 100%;
  object-fit: cover;
  object-position: center;
`;

export const FamilyNicknamePlaceholder = styled.h2`
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  word-wrap: break-word;
  cursor: pointer;
  text-align: center;
  font-size: 3rem;
  margin: 0;
  max-width: 70%;

  @media screen and (max-width: ${MD}px) {
    font-size: 1.6rem;
    max-width: 80%;
  }
`;

export const StyledTextBox = styled(TextBox)`
  width: 32rem;

  @media screen and (max-width: ${MD}px) {
    width: 19rem;
  }
`;

export const NicknameWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 1.5rem;
  width: 70%;
  height: 4rem;

  @media screen and (max-width: ${MD}px) {
    width: 80%;
    height: 3.5rem;
  }
`;

export const FamilyMembersWrapper = styled.div<{ hasOverflow: boolean }>`
  display: flex;
  position: relative;
  align-items: flex-start;
  overflow-x: scroll;
  overflow-y: visible;
  padding: 4rem 0;
  max-width: 80%;
  gap: 6rem;
  margin-top: 2rem;

  ${({ hasOverflow }) =>
    hasOverflow &&
    css`
      cursor: grab;
    `}

  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }

  @media screen and (max-width: ${MD}px) {
    gap: 3rem;
  }
`;

export const ButtonBadge = styled.div`
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

export const ProfilePictureWrapper = styled.div`
  position: relative;
  width: 80%;
`;

export const DeleteButtonWrapper = styled.div`
  position: absolute;
  right: 0;
  top: 0;
`;

export const DeleteButton = styled(MuiButton)`
  border-radius: 50%;
  padding: 0;
  min-width: fit-content;
`;

export const ControlButtons = styled.div`
  display: flex;
  align-items: center;
  gap: 5rem;

  @media screen and (max-width: ${MD}px) {
    flex-direction: column;
    gap: 2rem;
  }
`;
