import { useState } from "react";
import moment from "moment";

import { projectFirestore } from "../../../../firebase/config";
import {
  deleteImage,
  uploadImage,
} from "../../../../utils/FirebaseStorageUtils";
import { IMemoryData, SetError } from "../../../../utils/types";
import { errorToast, successToast } from "../../../../services/toastService";
import Form from "../../../modules/MemoryForm/MemoryForm";

interface IAddMemoryProps {
  file: File | undefined;
  memories: IMemoryData[];
  setFile: (file?: File) => void;
  onClose: () => void;
}

const AddMemoryTemplate = ({
  file,
  setFile,
  onClose,
  memories,
}: IAddMemoryProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = (setError: SetError) => async (data: IMemoryData) => {
    try {
      if (!file) {
        errorToast("File not set!");
        return;
      }

      if (memories.find((x) => x.date === data.date)) {
        errorToast("Memory already exists!");
        return;
      }

      setIsLoading(true);
      const storageResponse = await uploadImage(data.date.toString(), file!);

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
        await deleteImage(data.date.toString());

        errorToast(
          err.code === "permission-denied"
            ? "Permission denied!"
            : `${err.name}:${err.code}`
        );
        setIsLoading(false);
        return;
      }

      successToast("Memory added!");
      setIsLoading(false);
      setFile();
      onClose();
    } catch (err: any) {
      setError(err.field, err.error);
      setIsLoading(false);
    }
  };

  return (
    <Form
      createSubmitHandler={onSubmit}
      setFile={setFile}
      file={file}
      isLoading={isLoading}
      openedMemory={{ date: moment().format("YYYY-MM") }}
    />
  );
};

export default AddMemoryTemplate;
