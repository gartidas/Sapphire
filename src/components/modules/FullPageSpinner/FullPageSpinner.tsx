import { CircularProgress } from "@material-ui/core";
import styled from "styled-components";

const StyledWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
`;

const FullPageSpinner = () => {
  return (
    <StyledWrapper>
      <CircularProgress color="secondary" />
    </StyledWrapper>
  );
};

export default FullPageSpinner;
