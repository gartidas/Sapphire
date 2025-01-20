import { IUserData } from "../../../model";

export const registerErrorConfig: Partial<Record<string, keyof IUserData>> = {
  "auth/wrong-password": "password",
  "auth/user-not-found": "email",
  "auth/invalid-email": "email",
  "auth/too-many-requests": "email",
};
