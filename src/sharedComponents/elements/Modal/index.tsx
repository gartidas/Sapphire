import { useCallback } from "react";
import { ModalProps, Dialog, makeStyles, Paper } from "@material-ui/core";
import { theme } from "../../../theme/theme";

const useStyles = makeStyles(() => ({
  paper: {
    backgroundColor: theme.secondary,
    minWidth: "50%",
    maxHeight: "80%",
    textAlign: "center",
  },
}));

const Modal = (props: ModalProps) => {
  const styles = useStyles();

  return (
    <Dialog
      {...props}
      PaperProps={{ classes: { root: styles.paper } }}
      PaperComponent={useCallback(
        (props) => (
          <Paper {...props} />
        ),
        []
      )}
      fullWidth
    />
  );
};

export default Modal;
