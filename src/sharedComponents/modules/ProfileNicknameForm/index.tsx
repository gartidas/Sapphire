import { FormContent } from "./index.styled";
import TextBox from "../../elements/TextBox";
import { useUser } from "../../../contextProviders/UserProvider";
import { successToast } from "../../../services/toastService";
import { KeyboardEvent } from "react";

interface IProfileNicknameFormProps {
  onSubmit?: () => void;
}

const ProfileNicknameForm = ({ onSubmit }: IProfileNicknameFormProps) => {
  const { user, updateUser } = useUser();

  const handleNicknameSubmit = async (
    event: KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Enter") {
      const input = event.target as HTMLInputElement;
      const textBoxValue = input.value;

      if (user!.nickname || textBoxValue !== "") {
        await updateUser({
          ...user!,
          nickname: textBoxValue !== "" ? textBoxValue : undefined,
        });

        onSubmit && onSubmit();
        successToast("Nickname updated!");
      }
    }
  };

  return (
    <FormContent>
      <TextBox
        placeholder={user?.nickname ?? user?.email}
        onKeyUp={handleNicknameSubmit}
        fullWidth
      />
    </FormContent>
  );
};

export default ProfileNicknameForm;
