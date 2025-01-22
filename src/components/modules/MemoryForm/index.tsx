import { Controller, FormProvider, UseFormMethods } from "react-hook-form";

import { IMemoryData } from "../../../model";

import { FormContent } from "./index.styled";
import Spinner from "../../elements/Spinner";
import { FormButton } from "../../elements/FormButton";
import { SubmitIcon } from "../../elements/SubmitIcon";
import DropZone from "../../elements/DropZone";
import { useDropzone, DropEvent, FileRejection } from "react-dropzone";
import FormFile from "../../elements/FormFile";
import DatePicker from "../../elements/DatePicker";
import TextBox from "../../elements/TextBox";

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
  const { register, handleSubmit, errors } = methods;

  const handleOnDrop = (
    acceptedFiles: File[],
    _: FileRejection[],
    __: DropEvent
  ) => {
    if (!acceptedFiles) return;
    const file = acceptedFiles[0];

    setFile(file);
  };

  const dropZoneConfig = useDropzone({
    onDrop: handleOnDrop,
    accept: {
      "image/png": [".png"],
      "image/gif": [".gif"],
      "image/jpeg": [".jpg", ".jpeg"],
    },
    maxFiles: 1,
  });

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormContent>
          {file ? (
            <>
              <FormFile fileName={file.name} fullWidth />
            </>
          ) : (
            <DropZone state={dropZoneConfig} fullWidth />
          )}

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
        </FormContent>
      </form>
    </FormProvider>
  );
};

export default MemoryForm;
