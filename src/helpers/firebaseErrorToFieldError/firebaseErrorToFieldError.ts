import firebase from "firebase/app";
import { ISubmitError } from "../../model";
import { FieldName, FieldValues } from "react-hook-form";

export const firebaseErrorToFieldError = <TFormData extends FieldValues>(
  error: firebase.FirebaseError,
  fieldMap: Partial<Record<string, keyof TFormData>>
): ISubmitError<TFormData> => {
  const field = fieldMap[error.code] || "email";

  return {
    field: field as FieldName<TFormData>,
    error: { message: error.message || "An unknown error occurred" },
  };
};
