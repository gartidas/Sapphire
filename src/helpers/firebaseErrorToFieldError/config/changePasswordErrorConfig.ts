import { IChangePasswordData } from "../../../model";

export const changePasswordErrorConfig: Partial<
  Record<string, keyof IChangePasswordData>
> = {
  "auth/wrong-password": "currentPassword",
};
