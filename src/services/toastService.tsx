import { ReactNode } from "react";
import { toast as toastifyToast } from "react-toastify";
import { Alert, AlertProps } from "@material-ui/lab";

//NOTE: Fix for https://github.com/fkhadra/react-toastify/issues/224
const DummyContainer = ({ children }: { children: ReactNode }) => (
  <div>{children}</div>
);

interface IToastOptions {
  severity?: AlertProps["severity"];
}

const toast = (text: string, options?: IToastOptions) =>
  toastifyToast(
    <DummyContainer>
      <Alert variant="outlined" onClose={() => {}} {...options}>
        {text}
      </Alert>
    </DummyContainer>,
    {
      hideProgressBar: true,
      closeButton: false,
      position: "top-right",
      autoClose: 4000,
      draggablePercent: 30,
    }
  );

export const successToast = (text: string) =>
  toast(text, { severity: "success" });
export const infoToast = (text: string) => toast(text, { severity: "info" });
export const errorToast = (text: string) => toast(text, { severity: "error" });
export const warningToast = (text: string) =>
  toast(text, { severity: "warning" });
