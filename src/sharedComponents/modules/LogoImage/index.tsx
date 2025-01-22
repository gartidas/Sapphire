import { Image } from "./index.styled";
import logoImage from "./Logo.png";
export interface ILogoImageProps {
  isAnimationRunning?: boolean;
  isInfinite?: boolean;
  size?: { mobile?: number; desktop?: number };
  onMouseEnter?: () => void;
  onAnimationEnd?: () => void;
}

const LogoImage = (props: ILogoImageProps) => {
  return <Image src={logoImage} {...props} />;
};

export default LogoImage;
