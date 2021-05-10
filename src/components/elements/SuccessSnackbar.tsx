import { Snackbar, SnackbarProps as MuiSnackbarProps } from "@material-ui/core";
import { Alert } from "@material-ui/lab";

export type SnackbarProps = MuiSnackbarProps & {
  onClose: () => void;
};

const SuccessSnackbar = ({ onClose }: SnackbarProps) => {
  return (
    <Snackbar onClose={onClose} autoHideDuration={3000} open>
      <Alert severity="success">Success!</Alert>
    </Snackbar>
  );
};

export default SuccessSnackbar;
