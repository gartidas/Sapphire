import Icon from "../../elements/Icon";
import { EIcon } from "../../elements/Icon/model";
import Spinner from "../../elements/Spinner";
import {
  ButtonContent,
  ButtonsWrapper,
  StyledButton,
  Title,
  Wrapper,
} from "./index.styled";

interface IConfirmationForm {
  onClose: () => void;
  onDelete: () => Promise<void>;
  isLoading: boolean;
  title?: string;
  icon?: EIcon;
}

const ConfirmationForm = ({
  onClose,
  onDelete,
  isLoading,
  title,
  icon,
}: IConfirmationForm) => {
  return (
    <Wrapper>
      <Title>{title ?? "Are you sure?"}</Title>
      <Icon
        icon={icon ?? EIcon.DeleteConfirmation}
        alt="Confirmation"
        width={150}
      />
      <ButtonsWrapper>
        <StyledButton onClick={onDelete}>
          {isLoading ? (
            <Spinner size={{ desktop: 60, mobile: 60 }} />
          ) : (
            <ButtonContent>
              <Icon icon={EIcon.Confirm} alt="Confirm" width={60} />
              Yes
            </ButtonContent>
          )}
        </StyledButton>
        <StyledButton onClick={() => onClose()}>
          <ButtonContent>
            <Icon icon={EIcon.Deny} alt="Deny" width={60} />
            No
          </ButtonContent>
        </StyledButton>
      </ButtonsWrapper>
    </Wrapper>
  );
};

export default ConfirmationForm;
