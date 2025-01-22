import { useState } from "react";
import LogoImage, { ILogoImageProps } from "../LogoImage";
import { Wrapper, Title } from "./index.styled";

interface ILogoProps {
  className?: string;
  imageProps?: ILogoImageProps;
}

const Logo = ({ className, imageProps }: ILogoProps) => {
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
