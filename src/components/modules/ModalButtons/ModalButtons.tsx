import { CircularProgress } from "@material-ui/core";
import { Delete, Edit } from "@material-ui/icons";
import { useMemory } from "../../../contextProviders/MemoryProvider";
import { useModal } from "../../../contextProviders/ModalProvider";
import { successToast } from "../../../services/toastService";

import { IMemoryData, ModalType } from "../../../utils/types";

import { Wrapper, Button } from "../ModalButtons/ModalButtons.styled";

interface IModalButtonsProps {
  openedMemory: IMemoryData;
}

const ModalButtons = ({ openedMemory }: IModalButtonsProps) => {
  const { changeOpenedModalState } = useModal();
  const { deleteMemory, isLoading, changeLoadingState } = useMemory();

  return (
    <Wrapper>
      <Button
        onClick={() => {
          changeOpenedModalState({
            type: ModalType.Edit,
            memory: openedMemory,
          });
        }}
      >
        <Edit />
      </Button>
      <Button
        onClick={async () => {
          changeLoadingState(true);
          await deleteMemory(openedMemory);
          successToast("Memory deleted!");
          changeOpenedModalState(undefined);
        }}
      >
        {isLoading ? <CircularProgress /> : <Delete />}
      </Button>
    </Wrapper>
  );
};

export default ModalButtons;
