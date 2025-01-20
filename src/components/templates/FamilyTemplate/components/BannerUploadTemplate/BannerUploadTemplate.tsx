import { uploadImage } from "../../../../../utils/FirebaseStorageUtils";
import { IFamily } from "../../../../../model";
import { errorToast, successToast } from "../../../../../services/toastService";
import { useForm } from "react-hook-form";
import { useUser } from "../../../../../contextProviders/UserProvider";
import BannerImageForm from "../../../../modules/BannerImageForm/BannerImageForm";

interface IBannerUploadProps {
  file: File | undefined;
  setFile: (file?: File) => void;
  onClose: () => void;
}

const BannerUploadTemplate = ({
  file,
  setFile,
  onClose,
}: IBannerUploadProps) => {
  const { changeFamilyLoadingState, isFamilyLoading, updateFamily } = useUser();
  const methods = useForm<IFamily>();
  const { setError } = methods;
  const { user, family } = useUser();

  const onSubmit = async (data: IFamily) => {
    try {
      if (!file) {
        errorToast("File not set!");
        return;
      }

      changeFamilyLoadingState(true);
      const storageResponse = await uploadImage(
        `${user!.familyId}/banner`,
        file!
      );

      if (!storageResponse) {
        changeFamilyLoadingState(false);
        return;
      }

      await updateFamily(
        {
          ...family,
          bannerUrl: storageResponse,
        },
        true
      );

      successToast("Banner uploaded!");
      changeFamilyLoadingState(false);
      setFile();
      onClose();
    } catch (err: any) {
      setError(err.field, err.error);
      changeFamilyLoadingState(false);
    }
  };

  return (
    <BannerImageForm
      onSubmit={onSubmit}
      methods={methods}
      setFile={setFile}
      file={file}
      isLoading={isFamilyLoading}
    />
  );
};

export default BannerUploadTemplate;
