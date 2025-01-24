import { Avatar } from "@material-ui/core";
import {
  CredentialWrapper,
  SmallBubble,
  SmallerBubble,
  StatusBubble,
  StatusWrapper,
  StyledImage,
  Wrapper,
} from "./index.styled";
import { IUserData } from "../../../model";
import { getAvatarUrl } from "../../../helpers/getAvatarUrl";

interface IFamilyMemberBadgeProps {
  familyMember: IUserData;
}

const FamilyMemberBadge = ({ familyMember }: IFamilyMemberBadgeProps) => {
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
      </StatusWrapper>

      {familyMember.nickname && (
        <CredentialWrapper>{familyMember.nickname}</CredentialWrapper>
      )}
      <CredentialWrapper>{familyMember.email}</CredentialWrapper>
    </Wrapper>
  );
};

export default FamilyMemberBadge;
