import { IUserData } from "../../../model";

export const loginErrorConfig: Partial<Record<string, keyof IUserData>> = {
  "auth/wrong-password": "password",
  "auth/user-not-found": "email",
  "auth/invalid-email": "email",
  "auth/too-many-requests": "email",
};
