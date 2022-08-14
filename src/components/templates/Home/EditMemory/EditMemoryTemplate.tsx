import { useForm } from "react-hook-form";
import { useMemory } from "../../../../contextProviders/MemoryProvider";

import { errorToast, successToast } from "../../../../services/toastService";
import { getImage, uploadImage } from "../../../../utils/FirebaseStorageUtils";
import { IMemoryData } from "../../../../utils/types";
import MemoryForm from "../../../modules/MemoryForm/MemoryForm";

interface IEditMemoryProps {
  file: File | undefined;
  setFile: (file?: File) => void;
  onClose: () => void;
  openedMemory: IMemoryData;
}

const EditMemoryTemplate = ({
  file,
  setFile,
  onClose,
  openedMemory,
}: IEditMemoryProps) => {
  const { editMemory, deleteMemory, memories, changeLoadingState, isLoading } =
    useMemory();
  const methods = useForm<IMemoryData>({
    defaultValues: openedMemory,
  });
  const { setError } = methods;

  const onSubmit = async (data: IMemoryData) => {
    try {
      if (
        memories.find(
          (x) => x.date === data.date && x.date !== openedMemory.date
        )
      ) {
        errorToast("Memory already exists!");
        return;
      }

      changeLoadingState(true);
      if (data.date !== openedMemory.date) {
        if (!file) {
          //NOTE: This is where code ends and continues in callback function
          await getImage(openedMemory.id, getImageCallback, data, setError);
          return;
        } else {
          const isDeleted = await deleteMemory(openedMemory);

          if (!isDeleted) {
            changeLoadingState(false);
            return;
          }
        }
      }

      const memory: IMemoryData = {
        ...data,
        imageUrl: openedMemory.imageUrl,
      };

      if (file) {
        const storageResponse = await uploadImage(data.date.toString(), file);

        if (!storageResponse) {
          changeLoadingState(false);
          return;
        }
        memory.imageUrl = storageResponse;
      }

      await editMemory(memory);

      successToast("Memory edited!");
      changeLoadingState(false);
      setFile();
      onClose();
    } catch (err: any) {
      changeLoadingState(false);
      setError(err.field, err.error);
    }
  };

  const getImageCallback = async (
    file: File,
    data: IMemoryData
  ): Promise<void> => {
    try {
      const isDeleted = await deleteMemory(openedMemory);

      if (!isDeleted) {
        changeLoadingState(false);
        return;
      }

      const storageResponse = await uploadImage(data.date.toString(), file);

      if (!storageResponse) {
        changeLoadingState(false);
        return;
      }

      const memory: IMemoryData = {
        ...data,
        imageUrl: storageResponse,
      };

      await editMemory(memory);

      successToast("Memory edited!");
      changeLoadingState(false);
      onClose();
    } catch (err: any) {
      changeLoadingState(false);
      setError(err.field, err.error);
    }
  };

  return (
    <MemoryForm
      onSubmit={onSubmit}
      methods={methods}
      setFile={setFile}
      file={file}
      isLoading={isLoading}
      openedMemory={openedMemory}
    />
  );
};

export default EditMemoryTemplate;
