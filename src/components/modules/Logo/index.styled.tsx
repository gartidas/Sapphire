import styled from "styled-components";
import { SM } from "../../../theme/theme";

export const Wrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    position: absolute;
    top: calc(50% - 3.5rem);
    margin-left: 9.6875rem;

    @media screen and (max-width: ${SM}px) {
      top: calc(50% - 2rem);
      margin-left: 4.0625rem;
    }
  }
`;

export const Title = styled.h1`
  font-family: "Shadows Into Light", cursive;
  font-size: 7rem;
  margin: 0;
  @media screen and (max-width: ${SM}px) {
    font-size: 3rem;
  }
`;
