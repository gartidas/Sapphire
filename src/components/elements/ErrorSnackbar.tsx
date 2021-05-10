import { Snackbar, SnackbarProps as MuiSnackbarProps } from "@material-ui/core";
import { Alert } from "@material-ui/lab";

export type SnackbarProps = MuiSnackbarProps & {
  onClose: () => void;
  errorMessage: string;
};

const ErrorSnackbar = ({ onClose, errorMessage }: SnackbarProps) => {
  return (
    <Snackbar onClose={onClose} autoHideDuration={3000} open>
      <Alert severity="error">{errorMessage}</Alert>
    </Snackbar>
  );
};

export default ErrorSnackbar;
