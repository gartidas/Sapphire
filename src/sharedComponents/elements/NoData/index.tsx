import Icon from "../Icon";
import { EIcon } from "../Icon/model";
import { Title, Wrapper } from "./index.styled";

const NoData = () => {
  return (
    <Wrapper>
      <Icon icon={EIcon.NoData} alt="No data" />
      <Title>Look, it's empty. We should fill it with our memories...</Title>
    </Wrapper>
  );
};

export default NoData;
