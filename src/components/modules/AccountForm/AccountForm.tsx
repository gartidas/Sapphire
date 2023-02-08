import { UseFormMethods } from "react-hook-form";

import TextBox from "../../elements/TextBox";
import { IUserData } from "../../../utils/types";

import Spinner from "../../elements/Spinner/Spinner";
import { FormButton } from "../../elements/FormButton";
import { PageContent, StyledForm, Text } from "./AccountForm.styled";
import { useHistory } from "react-router-dom";
import { RegisterIcon } from "../../elements/Register/RegisterIcon";
import PasswordTextBox from "../../elements/PasswordTextBox/PasswordTextBox";

interface IAccountFormProps {
  methods: UseFormMethods<IUserData & { repeatPassword: string }>;
  onSubmit: (data: IUserData & { repeatPassword: string }) => Promise<void>;
  isLoading: boolean;
}

const AccountForm = ({ methods, onSubmit, isLoading }: IAccountFormProps) => {
  const { register, handleSubmit, errors } = methods;
  const router = useHistory();

  return (
    <PageContent>
      <StyledForm onSubmit={handleSubmit(onSubmit)}>
        <TextBox
          name="email"
          label="Email"
          inputRef={register({ required: "Is required" })}
          error={!!errors.email?.message}
          helperText={errors.email?.message}
          fullWidth
        />

        <PasswordTextBox
          name="password"
          label="Password"
          type="password"
          inputRef={register({ required: "Is required" })}
          error={!!errors.password?.message}
          helperText={errors.password?.message}
          fullWidth
        />

        <PasswordTextBox
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
              <RegisterIcon />
              Register
            </>
          )}
        </FormButton>
        <Text>
          Already have an account?&nbsp;
          <span onClick={() => router.push("/home")}>Sign in.</span>
        </Text>
      </StyledForm>
    </PageContent>
  );
};

export default AccountForm;
