import styled, { css } from "styled-components";
import { SM } from "../../../theme/theme";

interface IImageProps {
  isAnimationRunning?: boolean;
  isInfinite?: boolean;
  size?: { mobile?: number; desktop?: number };
}

export const Image = styled.img<IImageProps>`
  height: ${({ size }) => (size ? size.desktop ?? 30 : 30)}px;
  width: ${({ size }) => (size ? size.desktop ?? 30 : 30)}px;

  ${({ isAnimationRunning }) =>
    isAnimationRunning &&
    css`
      -moz-animation: spinHorizontally 0.8s linear;
      -o-animation: spinHorizontally 0.8s linear;
      -webkit-animation: spinHorizontally 0.8s linear;
      animation: spinHorizontally 0.8s linear;
    `};

  ${({ isInfinite }) =>
    isInfinite &&
    css`
      -moz-animation-iteration-count: infinite;
      -o-animation-iteration-count: infinite;
      -webkit-animation-iteration-count: infinite;
      animation-iteration-count: infinite;
    `};

  @media screen and (max-width: ${SM}px) {
    height: ${({ size }) => (size ? size.mobile ?? 20 : 20)}px;
    width: ${({ size }) => (size ? size.mobile ?? 20 : 20)}px;
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
