import { Title, Wrapper } from "./index.styled";
import icon from "./NoData.svg";

const NoData = () => {
  return (
    <Wrapper>
      <img src={icon} alt="No data" />
      <Title>Look, it's empty. We should fill it with our memories...</Title>
    </Wrapper>
  );
};

export default NoData;
