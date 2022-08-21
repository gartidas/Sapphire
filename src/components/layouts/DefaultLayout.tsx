import { FC } from "react";
import Snowfall from "react-snowfall";
import styled from "styled-components";
import { theme } from "../../utils/theme";
import Footer from "../modules/Footer/Footer";

const Wrapper = styled.div`
  min-height: 100vh;
`;

const DefaultLayout: FC = ({ children }) => {
  return (
    <Wrapper>
      <Snowfall color={theme.primary} />
      {children}
      <Footer />
    </Wrapper>
  );
};

export default DefaultLayout;
