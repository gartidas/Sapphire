import { Delete, Edit } from "@material-ui/icons";

import { IMemoryData, ModalType, OpenedModalType } from "../../../utils/types";

import { Wrapper, Button } from "../ModalButtons/ModalButtons.styled";

interface IModalButtonsProps {
  openedMemory: IMemoryData;
  setOpenedModal: (openedModal: OpenedModalType) => void;
}

const ModalButtons = ({ openedMemory, setOpenedModal }: IModalButtonsProps) => {
  const openedModalType: OpenedModalType = {
    type: ModalType.Edit,
    memory: openedMemory,
  };

  return (
    <Wrapper>
      <Button
        onClick={() => {
          setOpenedModal(openedModalType);
        }}
      >
        <Edit />
      </Button>
      <Button>
        <Delete />
      </Button>
    </Wrapper>
  );
};

export default ModalButtons;
