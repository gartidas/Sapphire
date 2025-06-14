import styled, { css } from "styled-components";
import Spinner from "../../elements/Spinner";
import { NAVBAR_HEIGHT } from "../../../constants";

const StyledWrapper = styled.div<IFullPageSpinnerProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: ${({ hasNavbar }) =>
    hasNavbar ? css`calc(100vh - ${NAVBAR_HEIGHT}px)` : css`100vh`};
`;

interface IFullPageSpinnerProps {
  hasNavbar?: boolean;
}

const FullPageSpinner = (props: IFullPageSpinnerProps) => {
  return (
    <StyledWrapper {...props}>
      <Spinner size={{ desktop: 500, mobile: 200 }} />
    </StyledWrapper>
  );
};

export default FullPageSpinner;
