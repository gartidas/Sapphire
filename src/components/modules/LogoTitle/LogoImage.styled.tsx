import styled, { css } from "styled-components";
import { SM } from "../../../utils/theme";

interface LogoImageProps {
  isAnimationRunning: boolean;
  size?: { mobile?: number; desktop?: number };
}

export const LogoImage = styled.img<LogoImageProps>`
  height: ${({ size }) => (size ? size.desktop ?? 30 : 30)}px;

  ${({ isAnimationRunning }) =>
    isAnimationRunning &&
    css`
      -moz-animation: spinHorizontally 0.8s linear;
      -o-animation: spinHorizontally 0.8s linear;
      -webkit-animation: spinHorizontally 0.8s linear;
      animation: spinHorizontally 0.8s linear;
    `};

  @media screen and (max-width: ${SM}px) {
    height: ${({ size }) => (size ? size.mobile ?? 20 : 20)}px;
  }

  @keyframes spinHorizontally {
    0% {
      transform: rotateY(0deg);
    }
    100% {
      transform: rotateY(360deg);
    }
  }
`;
