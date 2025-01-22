import { useForm } from "react-hook-form";
import PasswordTextBox from "../../../../elements/PasswordTextBox";
import { FormButton } from "../../../../elements/FormButton";
import Spinner from "../../../../elements/Spinner";
import { PageContent, StyledForm } from "./index.styled";
import { useState } from "react";
import { firebaseErrorToFieldError } from "../../../../../helpers/firebaseErrorToFieldError/firebaseErrorToFieldError";
import { successToast } from "../../../../../services/toastService";
import { projectAuthObject } from "../../../../../firebase/config";
import { IChangePasswordData } from "../../../../../model";
import { changePasswordErrorConfig } from "../../../../../helpers/firebaseErrorToFieldError/config/changePasswordErrorConfig";
import { useAuth } from "../../../../../contextProviders/AuthProvider";
import Icon from "../../../../elements/Icon";
import { EIcon } from "../../../../elements/Icon/model";

const ChangePasswordTab = () => {
  const { errors, register, reset, setError, handleSubmit } =
    useForm<IChangePasswordData>();
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [resetFormKey, resetForm] = useState(false);

  const onSubmit = async ({
    currentPassword,
    newPassword,
    repeatPassword,
  }: IChangePasswordData) => {
    try {
      if (newPassword !== repeatPassword) {
        setError("repeatPassword", { message: "Should be same as password" });
        return;
      }

      setIsLoading(true);

      const credentials = projectAuthObject.EmailAuthProvider.credential(
        user!.email!,
        currentPassword
      );

      await user!.reauthenticateWithCredential(credentials);
      await user!.updatePassword(newPassword);

      reset();
      resetForm((prev) => !prev);
      successToast("Password changed!");
    } catch (err: any) {
      var error = firebaseErrorToFieldError<IChangePasswordData>(
        err,
        changePasswordErrorConfig
      );

      setError(error.field, error.error);
    }
    setIsLoading(false);
  };

  return (
    <PageContent>
      <StyledForm onSubmit={handleSubmit(onSubmit)}>
        <PasswordTextBox
          key={`${resetFormKey}currentPassword`}
          name="currentPassword"
          label="Current password"
          type="password"
          inputRef={register({ required: "Is required" })}
          error={!!errors.currentPassword?.message}
          helperText={errors.currentPassword?.message}
          fullWidth
        />

        <PasswordTextBox
          key={`${resetFormKey}newPassword`}
          name="newPassword"
          label="New password"
          type="password"
          inputRef={register({ required: "Is required" })}
          error={!!errors.newPassword?.message}
          helperText={errors.newPassword?.message}
          fullWidth
        />

        <PasswordTextBox
          key={`${resetFormKey}repeatPassword`}
          name="repeatPassword"
          label="Repeat password"
          type="password"
          inputRef={register({ required: "Is required" })}
          error={!!errors.repeatPassword?.message}
          helperText={errors.repeatPassword?.message}
          fullWidth
        />

        <FormButton
          type="submit"
          fullWidth
          variant="outlined"
          color="secondary"
        >
          {isLoading ? (
            <Spinner size={{ desktop: 30, mobile: 30 }} />
          ) : (
            <>
              {/* TODO: Add real icon */}
              <Icon icon={EIcon.Submit} alt="Register" width={30} />
              Change password
            </>
          )}
        </FormButton>
      </StyledForm>
    </PageContent>
  );
};

export default ChangePasswordTab;
