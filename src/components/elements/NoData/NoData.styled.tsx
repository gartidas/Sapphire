import styled from "styled-components";
import { LG, MD, SM } from "../../../utils/theme";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: auto;

  img {
    width: 90%;
  }
`;

export const Title = styled.h1`
  font-size: 2rem;

  @media screen and (max-width: ${LG}px) {
    font-size: 1.5rem;
  }

  @media screen and (max-width: ${MD}px) {
    font-size: 0.9rem;
  }

  @media screen and (max-width: ${SM}px) {
    font-size: 0.7rem;
  }
`;
