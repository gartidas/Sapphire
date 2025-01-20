import { Avatar } from "@material-ui/core";
import { Wrapper } from "./FamilyMemberBadge.styled";
import { IUserData } from "../../../model";
import { getAvatarUrl } from "../../../helpers/getAvatarUrl";

interface IFamilyMemberBadgeProps {
  familyMember: IUserData;
}

const FamilyMemberBadge = ({ familyMember }: IFamilyMemberBadgeProps) => {
  return (
    <Wrapper>
      <Avatar src={getAvatarUrl(familyMember.email!)} />
      <div>{familyMember.email}</div>
    </Wrapper>
  );
};

export default FamilyMemberBadge;
