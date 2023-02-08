import { useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router";

import { IUserData } from "../../../utils/types";
import { projectAuth } from "../../../firebase/config";
import { firebaseErrorToFieldError } from "../../../utils/firebase-error";
import TextBox from "../../elements/TextBox";

import {
  StyledForm,
  PageContent,
  StyledLogo,
  LoginButton,
  Text,
} from "./LoginTemplate.styled";
import loginIcon from "./Login.gif";
import Spinner from "../../elements/Spinner/Spinner";
import { useUser } from "../../../contextProviders/UserProvider";
import PasswordTextBox from "../../elements/PasswordTextBox/PasswordTextBox";

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
      var error = firebaseErrorToFieldError(err);
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
              <img src={loginIcon} alt="Login" width={40} />
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
