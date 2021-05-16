import { CircularProgress } from "@material-ui/core";
import { Delete, Edit } from "@material-ui/icons";
import { useState } from "react";

import { projectFirestore } from "../../../firebase/config";
import { errorToast, successToast } from "../../../services/toastService";
import { deleteImage } from "../../../utils/FirebaseStorageUtils";
import { IMemoryData, ModalType, OpenedModalType } from "../../../utils/types";

import { Wrapper, Button } from "../ModalButtons/ModalButtons.styled";

interface IModalButtonsProps {
  openedMemory: IMemoryData;
  setOpenedModal: (openedModal: OpenedModalType | undefined) => void;
}

const ModalButtons = ({ openedMemory, setOpenedModal }: IModalButtonsProps) => {
  const openedModalType: OpenedModalType = {
    type: ModalType.Edit,
    memory: openedMemory,
  };
  const [isLoading, setIsLoading] = useState(false);

  const deleteMemory = async (openedMemory: IMemoryData) => {
    try {
      setIsLoading(true);

      const isDeleted = await deleteImage(openedMemory.id);
      if (!isDeleted) {
        setIsLoading(false);
        return;
      }

      await projectFirestore
        .collection("/memories")
        .doc(openedMemory.id)
        .delete()
        .then(() => {
          setIsLoading(false);
          successToast("Memory deleted!");
          setOpenedModal(undefined);
        });
    } catch (err) {
      setIsLoading(false);
      errorToast(err.code);
    }
  };

  return (
    <Wrapper>
      <Button
        onClick={() => {
          setOpenedModal(openedModalType);
        }}
      >
        <Edit />
      </Button>
      <Button
        onClick={() => {
          deleteMemory(openedMemory);
        }}
      >
        {isLoading ? <CircularProgress /> : <Delete />}
      </Button>
    </Wrapper>
  );
};

export default ModalButtons;
