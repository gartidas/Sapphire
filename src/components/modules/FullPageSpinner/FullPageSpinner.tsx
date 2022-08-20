import styled, { css } from "styled-components";
import LogoImage from "../LogoImage/LogoImage";
import { NAVBAR_HEIGHT } from "../Navbar/Navbar.styled";

const StyledWrapper = styled.div<FullPageSpinnerProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: ${({ hasNavbar }) =>
    hasNavbar ? css`calc(100vh - ${NAVBAR_HEIGHT}px)` : css`100vh`};
`;

interface FullPageSpinnerProps {
  hasNavbar?: boolean;
}

const FullPageSpinner = (props: FullPageSpinnerProps) => {
  return (
    <StyledWrapper {...props}>
      <LogoImage
        isAnimationRunning
        isInfinite
        size={{ desktop: 100, mobile: 50 }}
      />
    </StyledWrapper>
  );
};

export default FullPageSpinner;
