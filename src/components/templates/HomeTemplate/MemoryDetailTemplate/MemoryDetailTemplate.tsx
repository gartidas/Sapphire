import { IMemoryData } from "../../../../utils/types";
import MemoryModalButtons from "../../../modules/MemoryModalButtons/MemoryModalButtons";

import {
  Wrapper,
  StyledImage,
  WrapperRightSide,
  DetailTitle,
  DetailDescription,
} from "./MemoryDetailTemplate.styled";

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
