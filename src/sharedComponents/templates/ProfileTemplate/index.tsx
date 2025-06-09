import { KeyboardEvent, useEffect, useRef, useState } from "react";
import {
  ContentWrapper,
  DeleteButton,
  DeleteButtonWrapper,
  EmailWrapper,
  NicknamePlaceholder,
  ProfilePictureWrapper,
  StatusTextbox,
  StatusWrapper,
  StyledCharacterCounter,
  StyledIcon,
  StyledImage,
  StyledTextBox,
  TitleCard,
  Wrapper,
} from "./index.styled";
import { useUser } from "../../../contextProviders/UserProvider";
import { successToast } from "../../../services/toastService";
import { Avatar } from "@material-ui/core";
import { getAvatarUrl } from "../../../helpers/getAvatarUrl";
import Modal from "../../elements/Modal";
import ProfilePictureUploadTemplate from "./components/ProfilePictureUploadTemplate";
import useDebounce from "../../../hooks/useDebounce";
import { EIcon } from "../../elements/Icon/model";
import Spinner from "../../elements/Spinner";
import Icon from "../../elements/Icon";
import ConfirmationForm from "../../modules/ConfirmationForm";

const ProfileTemplate = () => {
  const [file, setFile] = useState<File>();
  const {
    user,
    isUserLoading,
    updateUser,
    changeUserLoadingState,
    deleteProfilePicture,
  } = useUser();
  const nicknameTextFieldRef = useRef<HTMLInputElement>(null);
  const statusTextFieldRef = useRef<HTMLInputElement>(null);
  const isFirstRender = useRef(true);
  const [isNicknameEditing, setIsNicknameEditing] = useState(false);
  const [isStatusLoading, setIsStatusLoading] = useState(false);
  const [statusLength, setStatusLength] = useState(0);
  const debouncedHandleStatusSubmit = useDebounce(
    (targetElement: HTMLInputElement) => handleStatusSubmit(targetElement),
    500
  );
  const [openedProfilePictureModal, setOpenedProfilePictureModal] =
    useState(false);
  const [openedDeleteProfilePictureModal, setOpenedDeleteProfilePictureModal] =
    useState(false);

  const handleNicknameSubmit = async (
    event: KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Enter") {
      const input = event.target as HTMLInputElement;
      const textBoxValue = input.value;

      if (user!.nickname || textBoxValue !== "") {
        await updateUser({
          ...user!,
          nickname: textBoxValue !== "" ? textBoxValue : undefined,
        });
        successToast("Nickname updated!");
      }
      setIsNicknameEditing(false);
    } else if (event.key === "Escape") {
      setIsNicknameEditing(false);
    }
  };

  const handleStatusSubmit = async (targetElement: HTMLInputElement) => {
    const textBoxValue = targetElement.value;

    if (
      (user!.status || textBoxValue !== "") &&
      textBoxValue !== user!.status
    ) {
      setIsStatusLoading(true);

      await updateUser({
        ...user!,
        status: textBoxValue !== "" ? textBoxValue : undefined,
      });

      setIsStatusLoading(false);
      successToast("Status updated!");
    }
  };

  const handleNicknameTextBoxFocus = () => {
    if (nicknameTextFieldRef.current) {
      nicknameTextFieldRef.current.focus();
    }
  };

  const handleNicknameTextBoxUnfocus = () => {
    setIsNicknameEditing(false);
  };

  useEffect(() => {
    if (user?.status && isFirstRender.current) {
      setStatusLength(user?.status.length);
      isFirstRender.current = false;
    }
  }, [user?.status]);

  useEffect(() => {
    if (isNicknameEditing) {
      handleNicknameTextBoxFocus();
    }
  }, [isNicknameEditing]);

  return (
    <Wrapper>
      <ContentWrapper>
        <TitleCard>
          <ProfilePictureWrapper>
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

            {user?.profilePicture && (
              <DeleteButtonWrapper>
                <DeleteButton
                  onClick={() => {
                    setOpenedDeleteProfilePictureModal(true);
                  }}
                >
                  {isUserLoading ? (
                    <Spinner size={{ desktop: 40, mobile: 40 }} />
                  ) : (
                    <Icon icon={EIcon.Delete} alt="Delete" width={40} />
                  )}
                </DeleteButton>
              </DeleteButtonWrapper>
            )}
          </ProfilePictureWrapper>

          {isNicknameEditing ? (
            <StyledTextBox
              placeholder={user?.nickname ?? user?.email}
              onKeyUp={handleNicknameSubmit}
              onBlur={() => handleNicknameTextBoxUnfocus()}
              inputRef={nicknameTextFieldRef}
            />
          ) : (
            <NicknamePlaceholder onClick={() => setIsNicknameEditing(true)}>
              {user?.nickname ?? user?.email}
            </NicknamePlaceholder>
          )}
        </TitleCard>

        {user?.nickname && <EmailWrapper>({user?.email})</EmailWrapper>}

        <StatusWrapper>
          <StatusTextbox
            placeholder={user?.status ? undefined : "What's on your mind?"}
            onKeyUp={(event) => {
              const targetElement = event.target as HTMLInputElement;

              setStatusLength(
                targetElement.value ? targetElement.value.length : 0
              );
              debouncedHandleStatusSubmit(targetElement);
            }}
            multiline
            minRows={10}
            maxRows={18}
            inputProps={{ maxLength: 60 }}
            inputRef={statusTextFieldRef}
            defaultValue={user?.status ? user?.status : undefined}
          />
          <StyledCharacterCounter>{statusLength} / 60</StyledCharacterCounter>
          {isStatusLoading && <StyledIcon icon={EIcon.Spinner} width={40} />}
        </StatusWrapper>
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

      {openedDeleteProfilePictureModal && (
        <Modal
          open
          onClose={() => {
            setOpenedDeleteProfilePictureModal(false);
          }}
        >
          <ConfirmationForm
            onClose={() => setOpenedDeleteProfilePictureModal(false)}
            onDelete={async () => {
              changeUserLoadingState(true);
              await deleteProfilePicture(user!);
              successToast("Profile picture deleted!");
              setOpenedDeleteProfilePictureModal(false);
            }}
            isLoading={isUserLoading}
          />
        </Modal>
      )}
    </Wrapper>
  );
};

export default ProfileTemplate;
