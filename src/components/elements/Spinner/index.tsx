import useWindowSize from "../../../hooks/useWindowSize";
import { SM } from "../../../utils/theme";
import Icon from "../Icon";
import { EIcon } from "../Icon/model";

interface ISpinnerProps {
  size?: { mobile?: number; desktop?: number };
  className?: string;
}

const Spinner = ({ size, className }: ISpinnerProps) => {
  const isDesktop = useWindowSize().width > SM;
  const mobile = size ? (size.mobile ? size.mobile : 20) : 20;
  const desktop = size ? (size.desktop ? size.desktop : 30) : 30;

  return (
    <Icon
      className={className}
      icon={EIcon.Spinner}
      alt="Loading"
      width={isDesktop ? desktop : mobile}
    />
  );
};

export default Spinner;
