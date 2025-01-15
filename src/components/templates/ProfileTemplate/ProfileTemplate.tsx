import {
  BannerPlaceholder,
  FamilyNicknamePlaceholder,
  StyledImage,
  StyledTextBox,
  Wrapper,
} from "./ProfileTemplate.styled";
import { KeyboardEvent, useEffect, useRef, useState } from "react";
import BannerUploadTemplate from "./BannerUploadTemplate/BannerUploadTemplate";
import Modal from "../../elements/Modal";
import { useUser } from "../../../contextProviders/UserProvider";
import { successToast } from "../../../services/toastService";

const ProfileTemplate = () => {
  const [file, setFile] = useState<File>();
  const { family, updateFamily } = useUser();
  const [openedBannerModal, setOpenedBannerModal] = useState(false);
  const textFieldRef = useRef<HTMLInputElement>(null);
  const [isEditing, setIsEditing] = useState(false);

  const handleNicknameSubmit = async (
    event: KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Enter") {
      const textBoxValue = (event.target as HTMLInputElement).value;

      if (textBoxValue !== "") {
        await updateFamily({ ...family, nickname: textBoxValue });
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
      {family?.bannerUrl ? (
        <StyledImage
          src={family.bannerUrl}
          onClick={() => setOpenedBannerModal(true)}
        />
      ) : (
        <BannerPlaceholder onClick={() => setOpenedBannerModal(true)}>
          No image available
        </BannerPlaceholder>
      )}

      {isEditing ? (
        <StyledTextBox
          placeholder={family?.nickname ?? "Your family's nickname"}
          onKeyUp={handleNicknameSubmit}
          onBlur={() => handleTextBoxUnfocus()}
          inputRef={textFieldRef}
        />
      ) : (
        <FamilyNicknamePlaceholder onClick={() => setIsEditing(true)}>
          {family?.nickname ?? "Your family's nickname"}
        </FamilyNicknamePlaceholder>
      )}

      {openedBannerModal && (
        <Modal
          open
          onClose={() => {
            setOpenedBannerModal(false);
            setFile(undefined);
          }}
        >
          <BannerUploadTemplate
            file={file}
            setFile={setFile}
            onClose={() => setOpenedBannerModal(false)}
          />
        </Modal>
      )}
    </Wrapper>
  );
};

export default ProfileTemplate;
