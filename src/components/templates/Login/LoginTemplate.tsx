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
  PasswordWrapper,
  ShowHideButton,
  StyledTextBox,
} from "./LoginTemplate.styled";
import loginIcon from "./Login.gif";
import showIcon from "./Show.gif";
import hideIcon from "./Hide.gif";
import Spinner from "../../elements/Spinner/Spinner";

const LoginTemplate = () => {
  const { register, handleSubmit, errors, setError } = useForm<IUserData>();
  const [isLoading, setIsLoading] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const router = useHistory();

  const onSubmit = async (data: IUserData) => {
    try {
      setIsLoading(true);
      await projectAuth.signInWithEmailAndPassword(
        data.email.trim(),
        data.password
      );
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

        <PasswordWrapper>
          <StyledTextBox
            name="password"
            type={isPasswordVisible ? "text" : "password"}
            label="Password"
            inputRef={register({ required: "Is required" })}
            error={!!errors.password?.message}
            helperText={errors.password?.message}
            fullWidth
          />
          <ShowHideButton
            onClick={() => setIsPasswordVisible(!isPasswordVisible)}
          >
            <img
              src={isPasswordVisible ? hideIcon : showIcon}
              alt={isPasswordVisible ? "Hide" : "Show"}
              width={40}
            />
          </ShowHideButton>
        </PasswordWrapper>

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
      </StyledForm>
    </PageContent>
  );
};

export default LoginTemplate;
