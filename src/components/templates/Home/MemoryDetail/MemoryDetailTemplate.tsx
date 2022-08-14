import { IMemoryData } from "../../../../utils/types";
import ModalButtons from "../../../modules/ModalButtons/ModalButtons";

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
      <ModalButtons openedMemory={openedMemory} />
    </Wrapper>
  );
};

export default MemoryDetail;
