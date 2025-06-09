import { FormProvider, UseFormMethods } from "react-hook-form";

import { FormContent } from "./index.styled";
import Spinner from "../../elements/Spinner";
import { FormButton } from "../../elements/FormButton";
import TextBox from "../../elements/TextBox";
import Icon from "../../elements/Icon";
import { EIcon } from "../../elements/Icon/model";

interface IJoinFamilyFormProps {
  methods: UseFormMethods<{ joinLink: string }>;
  onSubmit: (data: { joinLink: string }) => Promise<void>;
  isLoading: boolean;
}

const JoinFamilyForm = ({
  isLoading,
  onSubmit,
  methods,
}: IJoinFamilyFormProps) => {
  const { register, handleSubmit, errors } = methods;

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormContent>
          <TextBox
            name="joinLink"
            label="Join link"
            inputRef={register({
              required: "Join link is required",
              pattern: {
                value:
                  /^(https?:\/\/)?(([\w-]+(\.[\w-]+)+)|localhost)([\w.,@?^=%&:/~+#-]*[\w@?^=%&/~+#-])?$/,
                message: "Invalid join link",
              },
            })}
            error={!!errors.joinLink?.message}
            helperText={errors.joinLink?.message}
            fullWidth
          />

          <FormButton
            type="submit"
            fullWidth
            variant="outlined"
            color="secondary"
          >
            {isLoading ? (
              <Spinner size={{ desktop: 30, mobile: 30 }} />
            ) : (
              <>
                <Icon icon={EIcon.JoinFamily} alt="Join family" width={30} />
                Join
              </>
            )}
          </FormButton>
        </FormContent>
      </form>
    </FormProvider>
  );
};

export default JoinFamilyForm;
