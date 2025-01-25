import styled from "styled-components";
import TextBox from "../../elements/TextBox";
import { MD } from "../../../theme/theme";
import { NAVBAR_HEIGHT } from "../../../constants";
import Icon from "../../elements/Icon";
import { Button as MuiButton } from "@material-ui/core";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: calc(100vh - ${NAVBAR_HEIGHT}px - 2rem);
  width: 100%;
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

export const NicknamePlaceholder = styled.h2`
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
  text-overflow: ellipsis;
  word-wrap: break-word;
  font-size: 2rem;
  margin: 0;
  max-width: 72.5%;
  cursor: pointer;

  @media screen and (max-width: ${MD}px) {
    font-size: 1.5rem;
  }
`;

export const EmailWrapper = styled.h2`
  font-size: 2rem;
  margin: 0;
  margin-left: 6rem;
  max-width: 72.5%;
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

export const StatusWrapper = styled.div`
  position: relative;
  margin-top: 1rem;
`;

export const StatusTextbox = styled(TextBox)`
  width: 100%;
`;

export const StyledIcon = styled(Icon)`
  position: absolute;
  right: 0;
  top: 0;
`;

export const ProfilePictureWrapper = styled.div`
  position: relative;
`;

export const DeleteButtonWrapper = styled.div`
  position: absolute;
  right: -0.5rem;
  top: -1rem;
`;

export const DeleteButton = styled(MuiButton)`
  border-radius: 50%;
  padding: 0;
  min-width: fit-content;
`;

export const StyledCharacterCounter = styled.div`
  position: absolute;
  right: 0.5rem;
  bottom: 0.5rem;
`;
