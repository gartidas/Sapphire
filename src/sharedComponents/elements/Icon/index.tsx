import { DetailedHTMLProps, ImgHTMLAttributes } from "react";
import addIcon from "./assets/Add.gif";
import confirmIcon from "./assets/Confirm.gif";
import defaultIcon from "./assets/Default.gif";
import deleteIcon from "./assets/Delete.gif";
import deleteConfirmationIcon from "./assets/DeleteConfirmation.gif";
import denyIcon from "./assets/Deny.gif";
import editIcon from "./assets/Edit.gif";
import facebookMessengerIcon from "./assets/FacebookMessenger.png";
import flowerIcon from "./assets/Flower.png";
import hideIcon from "./assets/Hide.gif";
import loginIcon from "./assets/Login.gif";
import logoIcon from "./assets/Logo.png";
import logoutIcon from "./assets/Logout.gif";
import noDataIcon from "./assets/NoData.svg";
import registerIcon from "./assets/Register.gif";
import showIcon from "./assets/Show.gif";
import spinnerIcon from "./assets/Spinner.gif";
import submitIcon from "./assets/Submit.gif";
import uploadImageIcon from "./assets/UploadImage.gif";
import wrongActionIcon from "./assets/WrongAction.gif";
import joinFamilyIcon from "./assets/JoinFamily.gif";
import leaveFamilyIcon from "./assets/LeaveFamily.gif";
import inviteMemberIcon from "./assets/InviteMember.gif";
import profileIcon from "./assets/Profile.gif";
import familyIcon from "./assets/Family.gif";
import settingsIcon from "./assets/Settings.gif";
import changePasswordIcon from "./assets/ChangePassword.gif";
import { EIcon } from "./model";

interface IIconProps
  extends Omit<
    Partial<
      DetailedHTMLProps<ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>
    >,
    "alt"
  > {
  icon: EIcon;
  alt?: string;
}

const getIconSrc = (icon: EIcon) => {
  switch (icon) {
    case EIcon.Add:
      return addIcon;
    case EIcon.Confirm:
      return confirmIcon;
    case EIcon.Delete:
      return deleteIcon;
    case EIcon.DeleteConfirmation:
      return deleteConfirmationIcon;
    case EIcon.Deny:
      return denyIcon;
    case EIcon.Edit:
      return editIcon;
    case EIcon.FacebookMessenger:
      return facebookMessengerIcon;
    case EIcon.Flower:
      return flowerIcon;
    case EIcon.Hide:
      return hideIcon;
    case EIcon.Login:
      return loginIcon;
    case EIcon.Logo:
      return logoIcon;
    case EIcon.Logout:
      return logoutIcon;
    case EIcon.NoData:
      return noDataIcon;
    case EIcon.Register:
      return registerIcon;
    case EIcon.Show:
      return showIcon;
    case EIcon.Spinner:
      return spinnerIcon;
    case EIcon.Submit:
      return submitIcon;
    case EIcon.UploadImage:
      return uploadImageIcon;
    case EIcon.WrongAction:
      return wrongActionIcon;
    case EIcon.JoinFamily:
      return joinFamilyIcon;
    case EIcon.LeaveFamily:
      return leaveFamilyIcon;
    case EIcon.InviteMember:
      return inviteMemberIcon;
    case EIcon.Profile:
      return profileIcon;
    case EIcon.Family:
      return familyIcon;
    case EIcon.Settings:
      return settingsIcon;
    case EIcon.ChangePassword:
      return changePasswordIcon;
    default:
      return defaultIcon;
  }
};

const Icon = ({ icon, alt, ...rest }: IIconProps) => {
  return <img src={getIconSrc(icon)} alt={alt} {...rest} />;
};

export default Icon;
