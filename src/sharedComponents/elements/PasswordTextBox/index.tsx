import { useState } from "react";
import { PasswordWrapper, ShowHideButton, StyledTextBox } from "./index.styled";
import { TextFieldProps } from "@material-ui/core";
import Icon from "../Icon";
import { EIcon } from "../Icon/model";

const PasswordTextBox = (props: TextFieldProps) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  return (
    <PasswordWrapper>
      <StyledTextBox
        {...props}
        type={isPasswordVisible ? "text" : "password"}
      />
      <ShowHideButton onClick={() => setIsPasswordVisible(!isPasswordVisible)}>
        <Icon
          icon={isPasswordVisible ? EIcon.Hide : EIcon.Show}
          alt={isPasswordVisible ? "Hide" : "Show"}
          width={40}
        />
      </ShowHideButton>
    </PasswordWrapper>
  );
};

export default PasswordTextBox;
