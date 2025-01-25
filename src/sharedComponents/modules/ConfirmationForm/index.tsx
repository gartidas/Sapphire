import Icon from "../../elements/Icon";
import { EIcon } from "../../elements/Icon/model";
import Spinner from "../../elements/Spinner";
import { ButtonsWrapper, StyledButton, Title, Wrapper } from "./index.styled";

interface IConfirmationForm {
  onClose: () => void;
  onDelete: () => Promise<void>;
  isLoading: boolean;
}

const ConfirmationForm = ({
  onClose,
  onDelete,
  isLoading,
}: IConfirmationForm) => {
  return (
    <Wrapper>
      <Title>Are you sure?</Title>
      <Icon icon={EIcon.DeleteConfirmation} alt="Confirmation" width={150} />
      <ButtonsWrapper>
        <StyledButton onClick={onDelete}>
          {isLoading ? (
            <Spinner size={{ desktop: 60, mobile: 60 }} />
          ) : (
            <Icon icon={EIcon.Confirm} alt="Confirm" width={60} />
          )}
        </StyledButton>
        <StyledButton onClick={() => onClose()}>
          <Icon icon={EIcon.Deny} alt="Deny" width={60} />
        </StyledButton>
      </ButtonsWrapper>
    </Wrapper>
  );
};

export default ConfirmationForm;
