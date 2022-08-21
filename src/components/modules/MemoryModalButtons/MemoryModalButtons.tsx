import { useMemory } from "../../../contextProviders/MemoryProvider";
import { useModal } from "../../../contextProviders/ModalProvider";
import { successToast } from "../../../services/toastService";

import { IMemoryData, ModalType } from "../../../utils/types";

import { Wrapper, Button } from "./MemoryModalButtons.styled";
import editIcon from "./Edit.gif";
import deleteIcon from "./Delete.gif";
import Spinner from "../../elements/Spinner/Spinner";

interface IMemoryModalButtonsProps {
  openedMemory: IMemoryData;
}

const MemoryModalButtons = ({ openedMemory }: IMemoryModalButtonsProps) => {
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
        <img src={editIcon} alt="Edit" width={40} />
      </Button>
      <Button
        onClick={async () => {
          changeLoadingState(true);
          await deleteMemory(openedMemory);
          successToast("Memory deleted!");
          changeOpenedModalState(undefined);
        }}
      >
        {isLoading ? (
          <Spinner size={{ desktop: 40, mobile: 40 }} />
        ) : (
          <img src={deleteIcon} alt="Delete" width={40} />
        )}
      </Button>
    </Wrapper>
  );
};

export default MemoryModalButtons;
