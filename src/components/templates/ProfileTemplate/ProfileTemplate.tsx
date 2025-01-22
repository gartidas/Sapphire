import { KeyboardEvent, useEffect, useRef, useState } from "react";
import {
  ContentWrapper,
  EmailWrapper,
  FamilyNicknamePlaceholder,
  StyledImage,
  StyledTextBox,
  TitleCard,
  Wrapper,
} from "./ProfileTemplate.styled";
import { useUser } from "../../../contextProviders/UserProvider";
import { successToast } from "../../../services/toastService";
import { Avatar } from "@material-ui/core";
import { getAvatarUrl } from "../../../helpers/getAvatarUrl";
import Modal from "../../elements/Modal/Modal";
import ProfilePictureUploadTemplate from "./components/ProfilePictureUploadTemplate/ProfilePictureUploadTemplate";

const ProfileTemplate = () => {
  const [file, setFile] = useState<File>();
  const { user, updateUser } = useUser();
  const textFieldRef = useRef<HTMLInputElement>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [openedProfilePictureModal, setOpenedProfilePictureModal] =
    useState(false);

  const handleNicknameSubmit = async (
    event: KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Enter") {
      const textBoxValue = (event.target as HTMLInputElement).value;

      if (user!.nickname || textBoxValue !== "") {
        await updateUser({
          ...user!,
          nickname: textBoxValue !== "" ? textBoxValue : undefined,
        });
        successToast("Nickname updated!");
      }
      setIsEditing(false);
    } else if (event.key === "Escape") {
      setIsEditing(false);
    }
  };

  const handleTextBoxFocus = () => {
    if (textFieldRef.current) {
      textFieldRef.current.focus();
    }
  };

  const handleTextBoxUnfocus = () => {
    setIsEditing(false);
  };

  useEffect(() => {
    if (isEditing) {
      handleTextBoxFocus();
    }
  }, [isEditing]);

  return (
    <Wrapper>
      <ContentWrapper>
        <TitleCard>
          {user?.profilePicture ? (
            <StyledImage
              src={user?.profilePicture}
              onClick={() => setOpenedProfilePictureModal(true)}
            />
          ) : (
            <Avatar
              src={getAvatarUrl(user?.email!)}
              style={{ width: "5rem", height: "5rem", cursor: "pointer" }}
              onClick={() => setOpenedProfilePictureModal(true)}
            />
          )}

          {isEditing ? (
            <StyledTextBox
              placeholder={user?.nickname ?? user?.email}
              onKeyUp={handleNicknameSubmit}
              onBlur={() => handleTextBoxUnfocus()}
              inputRef={textFieldRef}
            />
          ) : (
            <FamilyNicknamePlaceholder onClick={() => setIsEditing(true)}>
              {user?.nickname ?? user?.email}
            </FamilyNicknamePlaceholder>
          )}
        </TitleCard>

        {user?.nickname && (
          <EmailWrapper onClick={() => setIsEditing(true)}>
            ({user?.email})
          </EmailWrapper>
        )}
      </ContentWrapper>

      {openedProfilePictureModal && (
        <Modal
          open
          onClose={() => {
            setOpenedProfilePictureModal(false);
            setFile(undefined);
          }}
        >
          <ProfilePictureUploadTemplate
            file={file}
            setFile={setFile}
            onClose={() => setOpenedProfilePictureModal(false)}
          />
        </Modal>
      )}
    </Wrapper>
  );
};

export default ProfileTemplate;
