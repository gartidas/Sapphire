import { IMemoryData, OpenedModalType } from "../../../../utils/types";
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
  setOpenedModal: (openedModal: OpenedModalType) => void;
}

const MemoryDetail = ({ openedMemory, setOpenedModal }: IMemoryDetailProps) => {
  return (
    <Wrapper>
      <StyledImage src={openedMemory.imageUrl} />
      <WrapperRightSide>
        <DetailTitle>{openedMemory.date}</DetailTitle>
        <DetailDescription>{openedMemory.description}</DetailDescription>
      </WrapperRightSide>
      <ModalButtons
        openedMemory={openedMemory}
        setOpenedModal={setOpenedModal}
      />
    </Wrapper>
  );
};

export default MemoryDetail;
