import {
  BannerPlaceholder,
  ButtonLabel,
  ControlButtons,
  DeleteButton,
  DeleteButtonWrapper,
  FamilyMembersWrapper,
  FamilyNicknamePlaceholder,
  ButtonBadge,
  NicknameWrapper,
  ProfilePictureWrapper,
  SocialIcon,
  StyledImage,
  StyledMenuWrapper,
  StyledTextBox,
  Wrapper,
} from "./index.styled";
import { KeyboardEvent, MouseEvent, useEffect, useRef, useState } from "react";
import BannerUploadTemplate from "./components/BannerUploadTemplate";
import { useUser } from "../../../contextProviders/UserProvider";
import {
  errorToast,
  infoToast,
  successToast,
} from "../../../services/toastService";
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
import Spinner from "../../elements/Spinner";
import ConfirmationForm from "../../modules/ConfirmationForm";
import { v4 as uuidv4 } from "uuid";
import JoinFamilyForm from "../../modules/JoinFamilyForm";
import { firebaseErrorToFieldError } from "../../../helpers/firebaseErrorToFieldError/firebaseErrorToFieldError";
import { joinFamilyConfig } from "../../../helpers/firebaseErrorToFieldError/config/joinFamilyConfig";
import { useForm } from "react-hook-form";
import { IUserData } from "../../../model";

const FamilyTemplate = () => {
  const [file, setFile] = useState<File>();
  const {
    user,
    family,
    familyMembers,
    isFamilyLoading,
    updateFamily,
    deleteBanner,
    joinFamily,
    leaveFamily,
    removeMemberFromFamily,
    addMemberToFamily,
    changeFamilyLoadingState,
  } = useUser();
  const randomId = uuidv4();
  const emailTag = user?.email.trim().split("@")[0];
  const finalId = `${emailTag}-${randomId}`;
  const [openedBannerModal, setOpenedBannerModal] = useState(false);
  const [openedDeleteBannerModal, setOpenedDeleteBannerModal] = useState(false);
  const [openedLeaveFamilyModal, setOpenedLeaveFamilyModal] = useState(false);
  const [openedJoinFamilyModal, setOpenedJoinFamilyModal] = useState(false);
  const [openedConfirmJoinFamilyModal, setOpenedConfirmJoinFamilyModal] =
    useState(false);
  const [familyJoinLink, setFamilyJoinLink] = useState<string>();
  const textFieldRef = useRef<HTMLInputElement>(null);
  const [isEditing, setIsEditing] = useState(false);
  const appDomain = commonConfig.appDomain!;
  const isDesktop = useWindowSize().width > MD;
  const shareUrl = `${appDomain}register`;
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const anchorRef = useRef<HTMLButtonElement>(null);
  const prevOpen = useRef(isMenuOpen);
  const { scrollContainerRef, hasOverflow } = useDragScroll();
  const joinFamilyFormMethods = useForm<{ joinLink: string }>({
    mode: "onSubmit",
  });

  const { setError } = joinFamilyFormMethods;

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

      if (user!.nickname || textBoxValue !== "") {
        await updateFamily({
          ...family!,
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

  const handleJoinFamilySubmit = async ({ joinLink }: { joinLink: string }) => {
    try {
      const linkParts = joinLink.split("/register/");
      const targetFamilyId = linkParts[1];

      if (!targetFamilyId) {
        setError("joinLink", {
          type: "manual",
          message: "Invalid join link",
        });
        return;
      }

      if (user?.email === family?.familyOwnerEmail) {
        setFamilyJoinLink(joinLink);
        setOpenedJoinFamilyModal(false);
        setOpenedConfirmJoinFamilyModal(true);
        return;
      }

      const result = await addMemberToFamily(user!, linkParts[1]);

      setOpenedJoinFamilyModal(false);

      if (result) {
        successToast("Family joined!");
      }
    } catch (err: any) {
      const error = firebaseErrorToFieldError<{ joinLink: string }>(
        err,
        joinFamilyConfig
      );
      setError(error.field, error.error);
    }
  };

  const handleConfirmJoinFamilySubmit = async () => {
    try {
      const removedMembers: {
        member: Omit<IUserData, "familyId">;
        tempFamilyId: string;
      }[] = [];

      for (const familyMember of familyMembers!) {
        if (familyMember.email === user?.email) continue;

        const randomId = uuidv4();
        const emailTag = familyMember.email.trim().split("@")[0];
        const tempFamilyId = `${emailTag}-${randomId}`;

        await removeMemberFromFamily(familyMember, tempFamilyId);
        removedMembers.push({ member: familyMember, tempFamilyId });
      }

      const linkParts = familyJoinLink!.split("/register/");
      const result = await joinFamily(user!, user!.familyId, linkParts[1]);

      if (!result) {
        await Promise.all(
          removedMembers.map(({ member, tempFamilyId }) =>
            joinFamily(member, user!.familyId, tempFamilyId)
          )
        );

        errorToast("Failed to join family!");
      }
    } catch (err: any) {
      const error = firebaseErrorToFieldError<{ joinLink: string }>(
        err,
        joinFamilyConfig
      );
      setError(error.field, error.error);
    }
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
      <ProfilePictureWrapper>
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

        {family?.bannerUrl && (
          <DeleteButtonWrapper>
            <DeleteButton
              onClick={() => {
                setOpenedDeleteBannerModal(true);
              }}
            >
              {isFamilyLoading ? (
                <Spinner size={{ desktop: 40, mobile: 40 }} />
              ) : (
                <Icon icon={EIcon.Delete} alt="Delete" width={40} />
              )}
            </DeleteButton>
          </DeleteButtonWrapper>
        )}
      </ProfilePictureWrapper>

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

      <ControlButtons>
        <Button style={{ padding: 0 }} ref={anchorRef} onClick={handleToggle}>
          <ButtonBadge>
            <Icon icon={EIcon.Add} alt="Add" width={40} />
            <ButtonLabel>Invite member</ButtonLabel>
          </ButtonBadge>
        </Button>

        <Button
          style={{ padding: 0 }}
          onClick={() => setOpenedJoinFamilyModal((prev) => !prev)}
        >
          {/* TODO: Icon */}
          <ButtonBadge>
            {isFamilyLoading ? (
              <Spinner size={{ desktop: 40, mobile: 40 }} />
            ) : (
              <Icon icon={EIcon.Add} alt="Join family" width={40} />
            )}
            <ButtonLabel>Join family</ButtonLabel>
          </ButtonBadge>
        </Button>

        {user?.email !== family?.familyOwnerEmail && (
          <Button
            style={{ padding: 0 }}
            onClick={() => setOpenedLeaveFamilyModal((prev) => !prev)}
          >
            {/* TODO: Icon */}
            <ButtonBadge>
              {isFamilyLoading ? (
                <Spinner size={{ desktop: 40, mobile: 40 }} />
              ) : (
                <Icon icon={EIcon.Logout} alt="Leave family" width={40} />
              )}
              <ButtonLabel>Leave family</ButtonLabel>
            </ButtonBadge>
          </Button>
        )}
      </ControlButtons>

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

      {openedDeleteBannerModal && (
        <Modal
          open
          onClose={() => {
            setOpenedDeleteBannerModal(false);
          }}
        >
          <ConfirmationForm
            title="Are you sure you want to delete the banner?"
            onClose={() => setOpenedDeleteBannerModal(false)}
            onDelete={async () => {
              changeFamilyLoadingState(true);
              await deleteBanner();
              successToast("Banner deleted!");
              setOpenedDeleteBannerModal(false);
            }}
            isLoading={isFamilyLoading}
          />
        </Modal>
      )}

      {openedLeaveFamilyModal && (
        <Modal
          open
          onClose={() => {
            setOpenedLeaveFamilyModal(false);
          }}
        >
          <ConfirmationForm
            title="Are you sure you want to leave the family?"
            onClose={() => setOpenedLeaveFamilyModal(false)}
            onDelete={async () => {
              changeFamilyLoadingState(true);
              await leaveFamily(user!, finalId);
              successToast("Family left!");
              setOpenedLeaveFamilyModal(false);
            }}
            isLoading={isFamilyLoading}
          />
        </Modal>
      )}

      {openedJoinFamilyModal && (
        <Modal
          open
          onClose={() => {
            setOpenedJoinFamilyModal(false);
          }}
        >
          <JoinFamilyForm
            methods={joinFamilyFormMethods}
            onSubmit={handleJoinFamilySubmit}
            isLoading={isFamilyLoading}
          />
        </Modal>
      )}

      {openedConfirmJoinFamilyModal && (
        <Modal
          open
          onClose={() => {
            setOpenedConfirmJoinFamilyModal(false);
          }}
        >
          <ConfirmationForm
            title="Are you sure you want to dissolve the family?"
            onClose={() => setOpenedConfirmJoinFamilyModal(false)}
            onDelete={async () => {
              changeFamilyLoadingState(true);
              await handleConfirmJoinFamilySubmit();
              successToast("Family joined!");
              setOpenedConfirmJoinFamilyModal(false);
            }}
            isLoading={isFamilyLoading}
          />
        </Modal>
      )}
    </Wrapper>
  );
};

export default FamilyTemplate;
