import { ErrorOption, FieldName } from "react-hook-form";

export interface ISubmitError<TFormData> {
  field: FieldName<TFormData>;
  error: ErrorOption;
}

export interface IUserData {
  email: string;
  password: string;
}

export interface IMemoryData {
  id: string;
  imageUrl: string;
  date: Date;
  description: string;
}

export enum ModalType {
  Add,
  Edit,
  Detail,
}
