import { Image } from "./LogoImage.styled";
import logo from "../../../logo.png";

export interface LogoImageProps {
  isAnimationRunning?: boolean;
  isInfinite?: boolean;
  size?: { mobile?: number; desktop?: number };
  onMouseEnter?: () => void;
  onAnimationEnd?: () => void;
}

const LogoImage = (props: LogoImageProps) => {
  return <Image src={logo} {...props} />;
};

export default LogoImage;
