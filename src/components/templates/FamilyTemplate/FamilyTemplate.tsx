import {
  BannerPlaceholder,
  ButtonLabel,
  FamilyMembersWrapper,
  FamilyNicknamePlaceholder,
  InviteMemberBadge,
  SocialIcon,
  StyledImage,
  StyledMenuWrapper,
  StyledTextBox,
  Wrapper,
} from "./FamilyTemplate.styled";
import { KeyboardEvent, MouseEvent, useEffect, useRef, useState } from "react";
import BannerUploadTemplate from "./BannerUploadTemplate/BannerUploadTemplate";
import Modal from "../../elements/Modal";
import { useUser } from "../../../contextProviders/UserProvider";
import { infoToast, successToast } from "../../../services/toastService";
import FamilyMemberBadge from "../../elements/FamilyMemberBadge/FamilyMemberBadge";
import addIcon from "./Add.gif";
import { Button, ClickAwayListener, MenuItem, Popper } from "@material-ui/core";
import commonConfig from "../../../config";
import useWindowSize from "../../../hooks/useWindowSize";
import { MD } from "../../../utils/theme";
import { Email, Link, Share, WhatsApp } from "@material-ui/icons";
import { FacebookMessengerIcon } from "../../elements/FacebookMessengerIcon/FacebookMessengerIcon";
import ThemedDivider from "../../elements/ThemedDivider/ThemedDivider";

const FamilyTemplate = () => {
  const [file, setFile] = useState<File>();
  const { user, family, familyMembers, updateFamily } = useUser();
  const [openedBannerModal, setOpenedBannerModal] = useState(false);
  const textFieldRef = useRef<HTMLInputElement>(null);
  const [isEditing, setIsEditing] = useState(false);
  const appDomain = commonConfig.appDomain!;
  const isDesktop = useWindowSize().width > MD;
  const shareUrl = `${appDomain}register`;
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const anchorRef = useRef<HTMLButtonElement>(null);
  const prevOpen = useRef(isMenuOpen);

  const handleToggle = () => {
    setIsMenuOpen((prevOpen) => !prevOpen);
  };

  // NOTE: No way to specify further
  const handleClose = (event: MouseEvent<Document, any>) => {
    if (
      anchorRef.current &&
      anchorRef.current.contains(event.target as HTMLElement)
    ) {
      return;
    }

    setIsMenuOpen(false);
  };

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

  useEffect(() => {
    if (prevOpen.current === true && isMenuOpen === false) {
      anchorRef.current!.focus();
    }

    prevOpen.current = isMenuOpen;
  }, [isMenuOpen]);

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

      <FamilyMembersWrapper>
        {familyMembers &&
          familyMembers.map((familyMember) => (
            <FamilyMemberBadge familyMember={familyMember} />
          ))}
      </FamilyMembersWrapper>
      <Button
        style={{ padding: 0, marginTop: "2rem" }}
        ref={anchorRef}
        onClick={handleToggle}
      >
        <InviteMemberBadge>
          <img src={addIcon} alt="Add" width={40} />
          <ButtonLabel>Invite member</ButtonLabel>
        </InviteMemberBadge>
      </Button>

      {user?.familyId && (
        <Popper
          open={isMenuOpen}
          anchorEl={anchorRef.current}
          role={undefined}
          placement="bottom-start"
          transition
        >
          <ClickAwayListener onClickAway={handleClose}>
            <StyledMenuWrapper autoFocusItem={isMenuOpen}>
              {isDesktop ? (
                <>
                  <MenuItem>
                    <SocialIcon
                      href={`mailto:?body=${shareUrl}/${user!.familyId}`}
                    >
                      <Email />
                    </SocialIcon>
                  </MenuItem>
                  <MenuItem>
                    <SocialIcon
                      href={`http://www.facebook.com/dialog/send?app_id=${commonConfig.facebookAppId!}&link=${`${shareUrl}/${
                        user!.familyId
                      }`}&redirect_uri=${`${shareUrl}/${user!.familyId}`}`}
                      target="_blank"
                    >
                      <FacebookMessengerIcon />
                    </SocialIcon>
                  </MenuItem>
                  <MenuItem>
                    <SocialIcon
                      href={`https://wa.me/?text=${`${shareUrl}/${
                        user!.familyId
                      }`}`}
                      target="_blank"
                    >
                      <WhatsApp />
                    </SocialIcon>
                  </MenuItem>
                  <ThemedDivider />
                  <MenuItem>
                    <SocialIcon
                      onClick={() => {
                        navigator.clipboard.writeText(
                          `${shareUrl}/${user!.familyId}`
                        );
                        infoToast("Copied to clipboard!");
                      }}
                    >
                      <Link />
                    </SocialIcon>
                  </MenuItem>
                </>
              ) : (
                <>
                  <MenuItem>
                    <SocialIcon
                      onClick={() => {
                        navigator.share({
                          url: `${shareUrl}/${user!.familyId}`,
                        });
                      }}
                    >
                      <Share />
                    </SocialIcon>
                  </MenuItem>
                  <ThemedDivider />
                  <MenuItem>
                    <SocialIcon
                      onClick={() => {
                        navigator.clipboard.writeText(
                          `${shareUrl}/${user!.familyId}`
                        );
                        infoToast("Copied to clipboard!");
                      }}
                    >
                      <Link />
                    </SocialIcon>
                  </MenuItem>
                </>
              )}
            </StyledMenuWrapper>
          </ClickAwayListener>
        </Popper>
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

export default FamilyTemplate;
