import { useState } from "react";

import { projectFirestore } from "../../../../firebase/config";
import { errorToast, successToast } from "../../../../services/toastService";
import {
  deleteImage,
  getImage,
  uploadImage,
} from "../../../../utils/FirebaseStorageUtils";
import { IMemoryData, SetError } from "../../../../utils/types";
import Form from "../../../modules/Form/Form";

interface IEditMemoryProps {
  file: File | undefined;
  memories: IMemoryData[];
  setFile: (file?: File) => void;
  onClose: () => void;
  openedMemory: IMemoryData;
}

const EditMemoryTemplate = ({
  file,
  setFile,
  onClose,
  memories,
  openedMemory,
}: IEditMemoryProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = (setError: SetError) => async (data: IMemoryData) => {
    try {
      if (
        memories.find(
          (x) => x.date === data.date && x.date !== openedMemory.date
        )
      ) {
        errorToast("Memory already exists!");
        return;
      }

      setIsLoading(true);
      if (data.date !== openedMemory.date) {
        if (!file) {
          //This is where code ends and continues in callback function
          await getImage(openedMemory.id, getImageCallback, data, setError);
          return;
        } else {
          const isDeleted = await deleteMemory(openedMemory);

          if (!isDeleted) {
            setIsLoading(false);
            return;
          }
        }
      }

      const memory: Omit<IMemoryData, "id"> = {
        ...data,
        imageUrl: openedMemory.imageUrl,
      };

      if (file) {
        const storageResponse = await uploadImage(data.date.toString(), file);

        if (!storageResponse) {
          setIsLoading(false);
          return;
        }
        memory.imageUrl = storageResponse;
      }

      try {
        await projectFirestore
          .collection("/memories")
          .doc(memory.date.toString())
          .set(memory);
      } catch (err: any) {
        errorToast(
          err.code === "permission-denied"
            ? "Permission denied!"
            : `${err.name}:${err.code}`
        );
        setIsLoading(false);
        return;
      }

      successToast("Memory edited!");
      setIsLoading(false);
      setFile();
      onClose();
    } catch (err: any) {
      setIsLoading(false);
      setError(err.field, err.error);
    }
  };

  const getImageCallback = async (
    file: File,
    data: IMemoryData,
    setError: SetError
  ): Promise<void> => {
    try {
      const isDeleted = await deleteMemory(openedMemory);

      if (!isDeleted) {
        setIsLoading(false);
        return;
      }

      const storageResponse = await uploadImage(data.date.toString(), file);

      if (!storageResponse) {
        setIsLoading(false);
        return;
      }

      const memory: Omit<IMemoryData, "id"> = {
        ...data,
        imageUrl: storageResponse,
      };

      try {
        await projectFirestore
          .collection("/memories")
          .doc(memory.date.toString())
          .set(memory);
      } catch (err: any) {
        errorToast(err.code);
        setIsLoading(false);
        return;
      }

      successToast("Memory edited!");
      setIsLoading(false);
      onClose();
    } catch (err: any) {
      setIsLoading(false);
      setError(err.field, err.error);
    }
  };

  const deleteMemory = async (openedMemory: IMemoryData): Promise<boolean> => {
    try {
      const isDeleted = await deleteImage(openedMemory.id);
      if (!isDeleted) {
        setIsLoading(false);
        return false;
      }

      await projectFirestore
        .collection("/memories")
        .doc(openedMemory.id)
        .delete();

      setIsLoading(false);
      return true;
    } catch (err: any) {
      setIsLoading(false);
      errorToast(err.code);
      return false;
    }
  };

  return (
    <Form
      createSubmitHandler={onSubmit}
      setFile={setFile}
      file={file}
      isLoading={isLoading}
      openedMemory={openedMemory}
    />
  );
};

export default EditMemoryTemplate;
