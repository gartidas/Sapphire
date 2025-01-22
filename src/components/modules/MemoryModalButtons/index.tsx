import { IMemoryData, ModalType } from "../../../model";

import { Wrapper, Button } from "./index.styled";
import Spinner from "../../elements/Spinner";
import { useMemory } from "../../../contextProviders/MemoryProvider";
import { useModal } from "../../../contextProviders/ModalProvider";
import Icon from "../../elements/Icon";
import { EIcon } from "../../elements/Icon/model";

interface IMemoryModalButtonsProps {
  openedMemory: IMemoryData;
}

const MemoryModalButtons = ({ openedMemory }: IMemoryModalButtonsProps) => {
  const { changeOpenedModalState } = useModal();
  const { isLoading } = useMemory();

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
        <Icon icon={EIcon.Edit} alt="Edit" width={40} />
      </Button>
      <Button
        onClick={() => {
          changeOpenedModalState({
            type: ModalType.Confirmation,
            memory: openedMemory,
          });
        }}
      >
        {isLoading ? (
          <Spinner size={{ desktop: 40, mobile: 40 }} />
        ) : (
          <Icon icon={EIcon.Delete} alt="Delete" width={40} />
        )}
      </Button>
    </Wrapper>
  );
};

export default MemoryModalButtons;
