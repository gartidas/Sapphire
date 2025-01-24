import {
  BannerPlaceholder,
  ButtonLabel,
  FamilyMembersWrapper,
  FamilyNicknamePlaceholder,
  InviteMemberBadge,
  NicknameWrapper,
  SocialIcon,
  StyledImage,
  StyledMenuWrapper,
  StyledTextBox,
  Wrapper,
} from "./index.styled";
import { KeyboardEvent, MouseEvent, useEffect, useRef, useState } from "react";
import BannerUploadTemplate from "./components/BannerUploadTemplate";
import { useUser } from "../../../contextProviders/UserProvider";
import { infoToast, successToast } from "../../../services/toastService";
import FamilyMemberBadge from "../../elements/FamilyMemberBadge";
import { Button, ClickAwayListener, MenuItem, Popper } from "@material-ui/core";
import commonConfig from "../../../config";
import useWindowSize from "../../../hooks/useWindowSize";
import { MD } from "../../../theme/theme";
import { Email, Link, Share, WhatsApp } from "@material-ui/icons";
import ThemedDivider from "../../elements/ThemedDivider";
import Modal from "../../elements/Modal";
import Icon from "../../elements/Icon";
import { EIcon } from "../../elements/Icon/model";
import { useDragScroll } from "../../../hooks/useDragScroll";

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
  const { scrollContainerRef, hasOverflow } = useDragScroll();

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

      <NicknameWrapper>
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
      </NicknameWrapper>

      <FamilyMembersWrapper ref={scrollContainerRef} hasOverflow={hasOverflow}>
        {familyMembers &&
          familyMembers.map((familyMember) => (
            <FamilyMemberBadge
              key={familyMember.email}
              familyMember={familyMember}
            />
          ))}
      </FamilyMembersWrapper>

      <Button style={{ padding: 0 }} ref={anchorRef} onClick={handleToggle}>
        <InviteMemberBadge>
          <Icon icon={EIcon.Add} alt="Add" width={40} />
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
          style={{ zIndex: 100 }}
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
                      <Icon
                        icon={EIcon.FacebookMessenger}
                        alt="Messenger"
                        width={40}
                      />
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
