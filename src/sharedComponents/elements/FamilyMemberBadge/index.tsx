import { Avatar } from "@material-ui/core";
import {
  CredentialWrapper,
  DeleteButton,
  SmallBubble,
  SmallerBubble,
  StatusBubble,
  StatusWrapper,
  StyledImage,
  Wrapper,
} from "./index.styled";
import { IUserData } from "../../../model";
import { getAvatarUrl } from "../../../helpers/getAvatarUrl";
import { Close } from "@material-ui/icons";
import { v4 as uuidv4 } from "uuid";
import { useState } from "react";
import Modal from "../Modal";
import ConfirmationForm from "../../modules/ConfirmationForm";
import Spinner from "../Spinner";
import { useUser } from "../../../contextProviders/UserProvider";
import { successToast } from "../../../services/toastService";

interface IFamilyMemberBadgeProps {
  familyMember: IUserData;
}

const FamilyMemberBadge = ({ familyMember }: IFamilyMemberBadgeProps) => {
  const randomId = uuidv4();
  const emailTag = familyMember.email.trim().split("@")[0];
  const finalId = `${emailTag}-${randomId}`;
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const {
    isFamilyLoading,
    changeFamilyLoadingState,
    user,
    removeMemberFromFamily,
  } = useUser();
  const familyOwnerEmailTag = familyMember!.familyId.split("-")[0].trim();

  return (
    <Wrapper>
      <StatusWrapper>
        {familyMember.status && (
          <>
            <StatusBubble>{familyMember.status}</StatusBubble>
            <SmallBubble />
            <SmallerBubble />
          </>
        )}

        {familyMember?.profilePicture ? (
          <StyledImage src={familyMember?.profilePicture} />
        ) : (
          <Avatar src={getAvatarUrl(familyMember.email!)} />
        )}

        {familyMember.email !== user?.email &&
          familyOwnerEmailTag !== emailTag && (
            <DeleteButton onClick={() => setIsDeleteModalOpen(true)}>
              {isDeleteModalOpen && isFamilyLoading ? (
                <Spinner size={{ desktop: 40, mobile: 40 }} />
              ) : (
                <Close />
              )}
            </DeleteButton>
          )}
      </StatusWrapper>

      {familyMember.nickname && (
        <CredentialWrapper>{familyMember.nickname}</CredentialWrapper>
      )}
      <CredentialWrapper>{familyMember.email}</CredentialWrapper>

      {isDeleteModalOpen && (
        <Modal
          open
          onClose={() => {
            setIsDeleteModalOpen(false);
          }}
        >
          <ConfirmationForm
            title={`Are you sure you want to remove ${
              familyMember.nickname ?? familyMember.email
            }?`}
            onClose={() => setIsDeleteModalOpen(false)}
            onDelete={async () => {
              changeFamilyLoadingState(true);
              await removeMemberFromFamily(familyMember, finalId);
              successToast("Member removed!");
              setIsDeleteModalOpen(false);
            }}
            isLoading={isFamilyLoading}
          />
        </Modal>
      )}
    </Wrapper>
  );
};

export default FamilyMemberBadge;
