import styled from "styled-components";
import { theme } from "../../utils/theme";

const Wrapper = styled.div`
  border-radius: 5px;
  padding: 10px;
  max-width: fit-content;
  height: fit-content;
  margin: 10px;

  .dot {
    float: left;
    width: 8px;
    height: 8px;
    margin: 0 4px;
    background: ${theme.primary};
    border-radius: 50%;
    opacity: 0;
    animation: loadingFade 1s infinite;
  }

  .dot:nth-child(1) {
    animation-delay: 0s;
  }

  .dot:nth-child(2) {
    animation-delay: 0.2s;
  }

  .dot:nth-child(3) {
    animation-delay: 0.4s;
  }

  @keyframes loadingFade {
    0% {
      opacity: 0;
    }
    50% {
      opacity: 0.8;
    }
    100% {
      opacity: 0;
    }
  }
`;

const ThreeDots = () => {
  return (
    <Wrapper>
      <div className="dot"></div>
      <div className="dot"></div>
      <div className="dot"></div>
    </Wrapper>
  );
};

export default ThreeDots;
