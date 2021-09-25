import { projectFirestore } from "../firebase/config";
import { errorToast } from "../services/toastService";
import { IUserState } from "./types";

export const handleUserStateChanged = async (userState: IUserState) => {
  try {
    await projectFirestore
      .collection("/users")
      .doc(userState.id)
      .set(userState, { merge: true });
  } catch (err: any) {
    errorToast(err.code);
  }
};
