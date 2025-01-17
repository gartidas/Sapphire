import useWindowSize from "../../../hooks/useWindowSize";
import { SM } from "../../../utils/theme";
import icon from "./Spinner.gif";

interface ISpinnerProps {
  size?: { mobile?: number; desktop?: number };
  className?: string;
}

const Spinner = ({ size, className }: ISpinnerProps) => {
  const isDesktop = useWindowSize().width > SM;
  const mobile = size ? (size.mobile ? size.mobile : 20) : 20;
  const desktop = size ? (size.desktop ? size.desktop : 30) : 30;

  return (
    <img
      className={className}
      src={icon}
      alt="Loading"
      width={isDesktop ? desktop : mobile}
    />
  );
};

export default Spinner;
