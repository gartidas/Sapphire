import styled from "styled-components";

import { SM } from "../../../utils/theme";

export const PageContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

export const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 500px;
  width: 90%;
  > * + * {
    margin-top: 30px;
  }
`;

export const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 10px;
`;

export const LogoImage = styled.img`
  margin-right: 10px;
  height: 50px;
`;

export const LogoTitle = styled.h1`
  font-size: 5rem;

  @media screen and (max-width: ${SM}px) {
    font-size: 3rem;
  }
`;
