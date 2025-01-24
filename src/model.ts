import { ErrorOption, FieldName, FieldValues } from "react-hook-form";

export interface ISubmitError<TFormData extends FieldValues> {
  field: FieldName<TFormData>;
  error: ErrorOption;
}

export interface IUserData {
  familyId: string;
  email: string;
  nickname?: string;
  status?: string;
  dateOfBirth?: string;
  password: string;
  profilePicture?: string;
}

export interface IFamily {
  familyId: string;
  nickname?: string;
  bannerUrl?: string;
}

export interface IMemoryData {
  id: string;
  imageUrl: string;
  date: string;
  description: string;
}

export enum ModalType {
  Add,
  Edit,
  Detail,
  Confirmation,
}

export type OpenedModalType =
  | {
      type: ModalType.Add;
    }
  | {
      type: ModalType.Detail;
      memory: IMemoryData;
    }
  | {
      type: ModalType.Edit;
      memory: IMemoryData;
    }
  | {
      type: ModalType.Confirmation;
      memory: IMemoryData;
    };

export type SetError = (name: keyof IMemoryData, error: ErrorOption) => void;

export interface IChangePasswordData {
  currentPassword: string;
  newPassword: string;
  repeatPassword: string;
}
