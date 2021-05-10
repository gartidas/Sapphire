import firebase from "firebase/app";
import { IUserData, ISubmitError } from "./types";

export const firebaseErrorToFieldError = ({
  code,
}: firebase.FirebaseError): ISubmitError<IUserData> => {
  switch (code) {
    case "auth/wrong-password":
      return { field: "password", error: { message: "Wrong password" } };

    case "auth/user-not-found":
      return { field: "email", error: { message: "User not found" } };

    case "auth/invalid-email":
      return { field: "email", error: { message: "Invalid email" } };

    case "auth/too-many-requests":
      return { field: "email", error: { message: "Too many requests" } };

    default:
      return { field: "email", error: { message: code } };
  }
};
