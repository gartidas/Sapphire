import { createContext, FC, useCallback, useContext, useState } from "react";
import { OpenedModalType } from "../model";

interface IModalContextValue {
  openedModal: OpenedModalType | undefined;
  changeOpenedModalState: (openedModal: OpenedModalType | undefined) => void;
}

const ModalContext = createContext<IModalContextValue>(null!);

export const useModal = () => useContext(ModalContext);

const ModalProvider: FC = ({ children }) => {
  const [openedModal, setOpenedModal] = useState<OpenedModalType>();

  const changeOpenedModalState = useCallback(
    (openedModal: OpenedModalType | undefined) => {
      setOpenedModal(openedModal);
    },
    []
  );

  return (
    <ModalContext.Provider value={{ changeOpenedModalState, openedModal }}>
      {children}
    </ModalContext.Provider>
  );
};

export default ModalProvider;
