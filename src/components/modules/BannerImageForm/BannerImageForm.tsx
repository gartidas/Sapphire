import { FormProvider, UseFormMethods } from "react-hook-form";

import { FormContent } from "./BannerImageForm.styled";
import Spinner from "../../elements/Spinner/Spinner";
import { FormButton } from "../../elements/FormButton/FormButton";
import { SubmitIcon } from "../../elements/SubmitIcon/SubmitIcon";
import DropZone from "../../elements/DropZone/DropZone";
import { useDropzone, DropEvent, FileRejection } from "react-dropzone";
import FormFile from "../../elements/FormFile/FormFile";
import { IFamily } from "../../../model";

interface IBannerImageFormProps {
  methods: UseFormMethods<IFamily>;
  onSubmit: (data: IFamily) => Promise<void>;
  file: File | undefined;
  setFile: (file?: File) => void;
  isLoading: boolean;
}

const BannerImageForm = ({
  methods,
  setFile,
  file,
  isLoading,
  onSubmit,
}: IBannerImageFormProps) => {
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
      <form onSubmit={handleSubmit(onSubmit)}>
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

export default BannerImageForm;
