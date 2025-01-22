import { Avatar } from "@material-ui/core";
import { StyledImage, Wrapper } from "./index.styled";
import { IUserData } from "../../../model";
import { getAvatarUrl } from "../../../helpers/getAvatarUrl";

interface IFamilyMemberBadgeProps {
  familyMember: IUserData;
}

const FamilyMemberBadge = ({ familyMember }: IFamilyMemberBadgeProps) => {
  return (
    <Wrapper>
      {familyMember?.profilePicture ? (
        <StyledImage src={familyMember?.profilePicture} />
      ) : (
        <Avatar src={getAvatarUrl(familyMember.email!)} />
      )}
      <div>{familyMember.email}</div>
    </Wrapper>
  );
};

export default FamilyMemberBadge;
