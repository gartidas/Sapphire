import { useState } from "react";

import { IMemoryData, SetError } from "../../../../utils/types";
import SubmitForm from "../../../modules/Form/Form";

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
      //TODO: Add implementation
    } catch (err) {
      setError(err.field, err.error);
    }
    setIsLoading(false);
  };

  return (
    <SubmitForm
      createSubmitHandler={onSubmit}
      setFile={setFile}
      file={file}
      isLoading={isLoading}
      openedMemory={openedMemory}
    />
  );
};

export default EditMemoryTemplate;
