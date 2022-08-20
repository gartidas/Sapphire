import { FC } from "react";
import Snowfall from "react-snowfall";
import styled from "styled-components";
import { theme } from "../../utils/theme";

const Wrapper = styled.div`
  min-height: 100vh;
`;

const DefaultLayout: FC = ({ children }) => {
  return (
    <Wrapper>
      <Snowfall color={theme.primary} />
      {children}
    </Wrapper>
  );
};

export default DefaultLayout;
