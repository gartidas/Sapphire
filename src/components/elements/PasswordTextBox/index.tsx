import showIcon from "./Show.gif";
import hideIcon from "./Hide.gif";
import { useState } from "react";
import { PasswordWrapper, ShowHideButton, StyledTextBox } from "./index.styled";
import { TextFieldProps } from "@material-ui/core";

const PasswordTextBox = (props: TextFieldProps) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  return (
    <PasswordWrapper>
      <StyledTextBox
        {...props}
        type={isPasswordVisible ? "text" : "password"}
      />
      <ShowHideButton onClick={() => setIsPasswordVisible(!isPasswordVisible)}>
        <img
          src={isPasswordVisible ? hideIcon : showIcon}
          alt={isPasswordVisible ? "Hide" : "Show"}
          width={40}
        />
      </ShowHideButton>
    </PasswordWrapper>
  );
};

export default PasswordTextBox;
