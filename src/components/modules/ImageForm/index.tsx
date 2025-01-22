import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  UseFormMethods,
} from "react-hook-form";

import { FormContent } from "./index.styled";
import Spinner from "../../elements/Spinner";
import { FormButton } from "../../elements/FormButton";
import { SubmitIcon } from "../../elements/SubmitIcon";
import DropZone from "../../elements/DropZone";
import { useDropzone, DropEvent, FileRejection } from "react-dropzone";
import FormFile from "../../elements/FormFile";

interface IImageFormProps<T extends FieldValues> {
  methods: UseFormMethods<T>;
  onSubmit: (data: T) => Promise<void>;
  file: File | undefined;
  setFile: (file?: File) => void;
  isLoading: boolean;
}

const ImageForm = <T extends FieldValues>({
  methods,
  setFile,
  file,
  isLoading,
  onSubmit,
}: IImageFormProps<T>) => {
  const { handleSubmit } = methods;

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
      "image/jpeg": [".jpg", ".jpeg"],
    },
    maxFiles: 1,
  });

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit as SubmitHandler<T>)}>
        <FormContent>
          {file ? (
            <>
              <FormFile fileName={file.name} fullWidth />
            </>
          ) : (
            <DropZone state={dropZoneConfig} fullWidth />
          )}

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

export default ImageForm;
