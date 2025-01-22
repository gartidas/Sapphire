import { useUser } from "../../../../../contextProviders/UserProvider";
import { successToast } from "../../../../../services/toastService";
import { IMemoryData, ModalType } from "../../../../../model";
import { ButtonsWrapper, StyledButton, Title, Wrapper } from "./index.styled";
import yesIcon from "./Yes.gif";
import noIcon from "./No.gif";
import deleteConfirmationIcon from "./DeleteConfirmation.gif";
import Spinner from "../../../../elements/Spinner";
import { useMemory } from "../../../../../contextProviders/MemoryProvider";
import { useModal } from "../../../../../contextProviders/ModalProvider";

interface IConfirmationProps {
  openedMemory: IMemoryData;
}

const ConfirmationTemplate = ({ openedMemory }: IConfirmationProps) => {
  const { changeOpenedModalState } = useModal();
  const { deleteMemory, changeLoadingState, isLoading } = useMemory();
  const { user } = useUser();

  const onDelete = async () => {
    changeLoadingState(true);
    await deleteMemory(openedMemory, user!.familyId);
    successToast("Memory deleted!");
    changeOpenedModalState(undefined);
  };

  return (
    <Wrapper>
      <Title>Are you sure?</Title>
      <img src={deleteConfirmationIcon} alt="Confirmation" width={150} />
      <ButtonsWrapper>
        <StyledButton onClick={onDelete}>
          {isLoading ? (
            <Spinner size={{ desktop: 60, mobile: 60 }} />
          ) : (
            <img src={yesIcon} alt="Yes" width={60} />
          )}
        </StyledButton>
        <StyledButton
          onClick={() =>
            changeOpenedModalState({
              type: ModalType.Detail,
              memory: openedMemory,
            })
          }
        >
          <img src={noIcon} alt="No" width={60} />
        </StyledButton>
      </ButtonsWrapper>
    </Wrapper>
  );
};

export default ConfirmationTemplate;
