import { uploadImage } from "../../../../../utils/FirebaseStorageUtils";
import { IUserData } from "../../../../../model";
import { errorToast, successToast } from "../../../../../services/toastService";
import { useForm } from "react-hook-form";
import { useUser } from "../../../../../contextProviders/UserProvider";
import ImageForm from "../../../../modules/ImageForm/ImageForm";

interface IProfilePictureUploadProps {
  file: File | undefined;
  setFile: (file?: File) => void;
  onClose: () => void;
}

const ProfilePictureUploadTemplate = ({
  file,
  setFile,
  onClose,
}: IProfilePictureUploadProps) => {
  const { changeUserLoadingState, updateUser, isUserLoading } = useUser();
  const methods = useForm<IUserData>();
  const { setError } = methods;
  const { user } = useUser();

  const onSubmit = async () => {
    try {
      if (!file) {
        errorToast("File not set!");
        return;
      }

      changeUserLoadingState(true);
      const storageResponse = await uploadImage(
        `${user!.email}/profilePicture`,
        file!,
        "users"
      );

      if (!storageResponse) {
        changeUserLoadingState(false);
        return;
      }

      await updateUser(
        {
          ...user!,
          profilePicture: storageResponse,
        },
        true
      );

      successToast("Profile picture uploaded!");
      changeUserLoadingState(false);
      setFile();
      onClose();
    } catch (err: any) {
      setError(err.field, err.error);
      changeUserLoadingState(false);
    }
  };

  return (
    <ImageForm
      onSubmit={onSubmit}
      methods={methods}
      setFile={setFile}
      file={file}
      isLoading={isUserLoading}
    />
  );
};

export default ProfilePictureUploadTemplate;
