import { IMemoryData } from "../../../../utils/types";

import { Wrapper, StyledImage, WrapperRightSide } from "./MemoryDetail.styled";

interface IMemoryDetailProps {
  openedMemory: IMemoryData;
}

const MemoryDetail = ({ openedMemory }: IMemoryDetailProps) => {
  return (
    <Wrapper>
      <StyledImage src={openedMemory.imageUrl} />
      <WrapperRightSide>
        <h1>{openedMemory.date}</h1>
        <p>{openedMemory.description}</p>
      </WrapperRightSide>
    </Wrapper>
  );
};

export default MemoryDetail;
