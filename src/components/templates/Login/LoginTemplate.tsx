import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button, CircularProgress } from "@material-ui/core";
import { useHistory } from "react-router";

import { IUserData } from "../../../utils/types";
import { projectAuth } from "../../../firebase/config";
import { firebaseErrorToFieldError } from "../../../utils/firebase-error";
import TextBox from "../../elements/TextBox";

import { StyledForm, PageContent } from "./LoginTemplate.styled";

const LoginTemplate = () => {
  const { register, handleSubmit, errors, setError } = useForm<IUserData>();
  const [isLoading, setIsLoading] = useState(false);
  const router = useHistory();

  const onSubmit = async (data: IUserData) => {
    try {
      setIsLoading(true);
      await projectAuth.signInWithEmailAndPassword(
        data.email.trim(),
        data.password
      );
      router.replace("/home");
    } catch (err) {
      var error = firebaseErrorToFieldError(err);
      setError(error.field, error.error);
    }
    setIsLoading(false);
  };

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

        <TextBox
          name="password"
          type="password"
          label="Password"
          inputRef={register({ required: "Is required" })}
          error={!!errors.password?.message}
          helperText={errors.password?.message}
          fullWidth
        />
        {isLoading ? (
          <CircularProgress />
        ) : (
          <Button type="submit" fullWidth variant="outlined" color="secondary">
            Login
          </Button>
        )}
      </StyledForm>
    </PageContent>
  );
};

export default LoginTemplate;
