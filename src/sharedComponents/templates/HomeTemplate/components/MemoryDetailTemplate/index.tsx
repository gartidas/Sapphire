import { IMemoryData } from "../../../../../model";
import MemoryModalButtons from "../../../../modules/MemoryModalButtons";

import {
  Wrapper,
  StyledImage,
  WrapperRightSide,
  DetailTitle,
  DetailDescription,
} from "./index.styled";

interface IMemoryDetailProps {
  openedMemory: IMemoryData;
}

const MemoryDetail = ({ openedMemory }: IMemoryDetailProps) => {
  return (
    <Wrapper>
      <StyledImage src={openedMemory.imageUrl} />
      <WrapperRightSide>
        <DetailTitle>{openedMemory.date}</DetailTitle>
        <DetailDescription>{openedMemory.description}</DetailDescription>
      </WrapperRightSide>
      <MemoryModalButtons openedMemory={openedMemory} />
    </Wrapper>
  );
};

export default MemoryDetail;
