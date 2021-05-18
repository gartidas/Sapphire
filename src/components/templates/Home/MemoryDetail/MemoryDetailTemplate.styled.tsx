import styled from "styled-components";

import { MD, SM } from "../../../../utils/theme";

export const Wrapper = styled.div`
  display: flex;
  padding: 20px;
  align-items: center;
  justify-content: center;

  @media screen and (max-width: ${MD}px) {
    flex-direction: column;
  }
`;

export const StyledImage = styled.img`
  margin-right: 20px;
  max-width: 70%;
  max-height: 50%;
  object-fit: contain;

  @media screen and (max-width: ${MD}px) {
    max-width: 100%;
    max-height: 60%;
    margin-right: 0;
  }
`;

export const WrapperRightSide = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 55%;

  @media screen and (max-width: ${SM}px) {
    width: 60%;
  }
`;

export const DetailTitle = styled.h1`
  @media screen and (max-width: ${SM}px) {
    font-size: 1.3rem;
  }
`;

export const DetailDescription = styled.div`
  overflow-wrap: anywhere;
`;
