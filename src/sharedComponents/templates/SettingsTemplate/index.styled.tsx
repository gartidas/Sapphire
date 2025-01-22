import styled, { css } from "styled-components";
import { Tabs } from "@material-ui/core";
import { MD } from "../../../theme/theme";
import { NAVBAR_HEIGHT } from "../../../constants";

interface IWrapperProps {
  isHorizontal: boolean;
}

export const Wrapper = styled.div<IWrapperProps>`
  display: flex;
  height: calc(100vh - ${NAVBAR_HEIGHT}px);

  ${({ isHorizontal }) =>
    isHorizontal &&
    css`
      flex-direction: column;
    `}
`;

export const TabWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
`;

export const StyledTabs = styled(Tabs)`
  height: calc(100vh - ${NAVBAR_HEIGHT}px);

  @media screen and (max-width: ${MD}px) {
    height: initial;
  }
`;
