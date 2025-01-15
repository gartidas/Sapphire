import { FC } from "react";
import styled from "styled-components";
import BackgroundFallEffect from "../elements/BackgroundFallEffect/BackgroundFallEffect";

const Wrapper = styled.div`
  min-height: 100vh;
`;

const DefaultLayout: FC = ({ children }) => {
  return (
    <Wrapper>
      <BackgroundFallEffect />
      {children}
    </Wrapper>
  );
};

export default DefaultLayout;
