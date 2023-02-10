import { ChangeEvent, useRef } from "react";
import moment from "moment";
import { Controller, FormProvider, UseFormMethods } from "react-hook-form";

import TextBox from "../../elements/TextBox";
import DatePicker from "../../elements/DatePicker";
import { IMemoryData } from "../../../utils/types";

import { FormContent } from "./MemoryForm.styled";
import uploadImageIcon from "./UploadImage.gif";
import Spinner from "../../elements/Spinner/Spinner";
import { FormPictureInput } from "../../elements/FormPictureInput";
import { FormButton } from "../../elements/FormButton";
import { FormFileName } from "../../elements/FormFileName";
import { SubmitIcon } from "../../elements/SubmitIcon/SubmitIcon";

interface IMemoryFormProps {
  methods: UseFormMethods<IMemoryData>;
  onSubmit: (data: IMemoryData) => Promise<void>;
  file: File | undefined;
  setFile: (file?: File) => void;
  isLoading: boolean;
  openedMemory: Partial<IMemoryData>;
}

const MemoryForm = ({
  methods,
  setFile,
  file,
  isLoading,
  onSubmit,
}: IMemoryFormProps) => {
  const inputRef = useRef<HTMLInputElement>(null!);
  const { register, handleSubmit, errors } = methods;

  const handleUploadImageClicked = () => {
    if (!inputRef.current) return;
    inputRef.current.click();
  };

  const handleInputChanged = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFile(file);
  };

  // NOTE: Upload image doesn't have the same context as the image tag
  /* eslint-disable jsx-a11y/img-redundant-alt */

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormContent>
          <FormButton
            variant="outlined"
            fullWidth
            onClick={handleUploadImageClicked}
            color="secondary"
          >
            {file ? (
              <FormFileName>{file?.name}</FormFileName>
            ) : (
              <>
                <img src={uploadImageIcon} alt="Upload image" width={30} />
                Upload image
              </>
            )}
          </FormButton>

          <Controller
            name="date"
            rules={{ required: "Is required" }}
            render={({ onChange, ref, ...rest }) => (
              <DatePicker
                {...rest}
                label="Date"
                views={["year", "month"]}
                format="YYYY-MM"
                error={!!errors.date?.message}
                helperText={errors.date?.message}
                // TODO: Add minimal date limit to family detail (anniversary)
                // minDate={moment("2020-05").toDate()}
                fullWidth
                onChange={(date) => onChange(date?.format("YYYY-MM"))}
              />
            )}
          />

          <TextBox
            name="description"
            label="Description"
            inputRef={register}
            error={!!errors.description?.message}
            helperText={errors.description?.message}
            multiline
            rows={5}
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
                <SubmitIcon />
                Submit
              </>
            )}
          </FormButton>

          <FormPictureInput
            name="image"
            value=""
            type="file"
            accept="image/*"
            ref={inputRef}
            onChange={handleInputChanged}
          />
        </FormContent>
      </form>
    </FormProvider>
  );
};

export default MemoryForm;
