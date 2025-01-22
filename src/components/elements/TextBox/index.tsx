import { makeStyles, TextField, TextFieldProps } from "@material-ui/core";
import { theme } from "../../../theme/theme";

const useStyles = makeStyles(() => ({
  textFieldPrimaryColor: {
    color: theme.primary,
  },

  textFieldBorderColor: {
    borderColor: theme.primary,
  },
}));

const TextBox = (props: TextFieldProps) => {
  const classes = useStyles();
  return (
    <TextField
      {...props}
      variant="outlined"
      color="secondary"
      InputLabelProps={{ className: classes.textFieldPrimaryColor }}
      InputProps={{
        classes: {
          input: classes.textFieldPrimaryColor,
          notchedOutline: classes.textFieldBorderColor,
          focused: classes.textFieldBorderColor,
        },
      }}
    />
  );
};

export default TextBox;
