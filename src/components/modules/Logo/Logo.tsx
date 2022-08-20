import { useState } from "react";
import LogoImage, { LogoImageProps } from "../LogoImage/LogoImage";
import { Wrapper, Title } from "./Logo.styled";

interface LogoProps {
  className?: string;
  imageProps?: LogoImageProps;
}

const Logo = ({ className, imageProps }: LogoProps) => {
  const [isAnimationRunning, setIsAnimationRunning] = useState(false);

  return (
    <Wrapper className={className}>
      <LogoImage
        {...imageProps}
        onMouseEnter={() => setIsAnimationRunning(true)}
        isAnimationRunning={isAnimationRunning}
        onAnimationEnd={() => setIsAnimationRunning(false)}
      />
      <Title>Sapphıre</Title>
    </Wrapper>
  );
};

export default Logo;
