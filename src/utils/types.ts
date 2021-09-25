import { ErrorOption, FieldName } from "react-hook-form";

export interface ISubmitError<TFormData> {
  field: FieldName<TFormData>;
  error: ErrorOption;
}

export interface IUserData {
  email: string;
  password: string;
}

export interface IUserState {
  id?: string;
  isTyping?: boolean;
  isOnline?: boolean;
}

export interface IMemoryData {
  id: string;
  imageUrl: string;
  date: string;
  description: string;
}

export interface IMessage {
  id?: string;
  date: string;
  from: string;
  content: string;
}

export enum ModalType {
  Add,
  Edit,
  Detail,
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
    };

export type SetError = (name: keyof IMemoryData, error: ErrorOption) => void;
