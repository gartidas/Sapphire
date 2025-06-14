import { useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router";

import { IUserData } from "../../../model";
import { projectAuth } from "../../../firebase/config";
import { firebaseErrorToFieldError } from "../../../helpers/firebaseErrorToFieldError/firebaseErrorToFieldError";

import {
  StyledForm,
  PageContent,
  StyledLogo,
  LoginButton,
  Text,
} from "./index.styled";
import Spinner from "../../elements/Spinner";
import { useUser } from "../../../contextProviders/UserProvider";
import PasswordTextBox from "../../elements/PasswordTextBox";
import TextBox from "../../elements/TextBox";
import { loginErrorConfig } from "../../../helpers/firebaseErrorToFieldError/config/loginErrorConfig";
import Icon from "../../elements/Icon";
import { EIcon } from "../../elements/Icon/model";

const LoginTemplate = () => {
  const { register, handleSubmit, errors, setError } = useForm<IUserData>();
  const [isLoading, setIsLoading] = useState(false);
  const router = useHistory();
  const { fetchUser } = useUser();

  const onSubmit = async (data: IUserData) => {
    try {
      setIsLoading(true);
      await projectAuth.signInWithEmailAndPassword(
        data.email.trim(),
        data.password
      );
      fetchUser(data.email.trim());

      router.replace("/home");
    } catch (err: any) {
      var error = firebaseErrorToFieldError<IUserData>(err, loginErrorConfig);
      setError(error.field, error.error);
    }
    setIsLoading(false);
  };

  return (
    <PageContent>
      <StyledLogo />
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
          inputRef={register({ required: "Is required" })}
          error={!!errors.password?.message}
          helperText={errors.password?.message}
          fullWidth
        />

        <LoginButton
          type="submit"
          fullWidth
          variant="outlined"
          color="secondary"
        >
          {isLoading ? (
            <Spinner size={{ desktop: 40, mobile: 40 }} />
          ) : (
            <>
              <Icon icon={EIcon.Login} alt="Login" width={40} />
              Login
            </>
          )}
        </LoginButton>
        <Text>
          Don't have a account?&nbsp;
          <span onClick={() => router.push("/register")}>Sign up.</span>
        </Text>
      </StyledForm>
    </PageContent>
  );
};

export default LoginTemplate;
