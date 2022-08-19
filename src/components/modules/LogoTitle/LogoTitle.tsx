import { useState } from "react";
import { LogoImage } from "./LogoImage.styled";
import { Wrapper, Title } from "./LogoTitle.styled";
import logo from "../../../logo.png";

const LogoTitle = () => {
  const [isAnimationRunning, setIsAnimationRunning] = useState(false);

  return (
    <Wrapper>
      <LogoImage
        src={logo}
        onMouseEnter={() => setIsAnimationRunning(true)}
        isAnimationRunning={isAnimationRunning}
        onAnimationEnd={() => setIsAnimationRunning(false)}
      />
      <Title>Sapphıre</Title>
    </Wrapper>
  );
};

export default LogoTitle;
