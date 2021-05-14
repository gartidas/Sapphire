import { IMemoryData } from "../../../../utils/types";

import {
  Wrapper,
  StyledImage,
  WrapperRightSide,
  DetailTitle,
  DetailDescription,
} from "./MemoryDetail.styled";

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
    </Wrapper>
  );
};

export default MemoryDetail;
