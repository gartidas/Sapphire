import { useState } from "react";
import moment from "moment";

import { uploadImage } from "../../../../utils/FirebaseStorageUtils";
import { IMemoryData } from "../../../../utils/types";
import { errorToast, successToast } from "../../../../services/toastService";
import MemoryForm from "../../../modules/MemoryForm/MemoryForm";
import { useForm } from "react-hook-form";
import { useMemory } from "../../../../contextProviders/MemoryProvider";

interface IAddMemoryProps {
  file: File | undefined;
  setFile: (file?: File) => void;
  onClose: () => void;
}

const AddMemoryTemplate = ({ file, setFile, onClose }: IAddMemoryProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const { addMemory, memories } = useMemory();
  const methods = useForm<IMemoryData>({
    defaultValues: { date: moment().format("YYYY-MM") },
  });
  const { setError } = methods;

  const onSubmit = async (data: IMemoryData) => {
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

      const memory: IMemoryData = {
        ...data,
        imageUrl: storageResponse,
      };

      await addMemory(memory);

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
    <MemoryForm
      onSubmit={onSubmit}
      methods={methods}
      setFile={setFile}
      file={file}
      isLoading={isLoading}
      openedMemory={{ date: moment().format("YYYY-MM") }}
    />
  );
};

export default AddMemoryTemplate;
