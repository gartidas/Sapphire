import MomentUtils from "@date-io/moment";
import { makeStyles } from "@material-ui/core";
import {
  DatePickerProps,
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import moment from "moment";
import { theme } from "../../../theme/theme";

const useStyles = makeStyles(() => ({
  datePickerPrimaryColor: {
    color: theme.primary,
  },

  datePickerBorderColor: {
    borderColor: theme.primary,
  },
}));

const DatePicker = (props: DatePickerProps) => {
  const classes = useStyles();
  return (
    <MuiPickersUtilsProvider utils={MomentUtils} libInstance={moment}>
      <KeyboardDatePicker
        {...props}
        color="secondary"
        inputVariant="outlined"
        InputLabelProps={{ className: classes.datePickerPrimaryColor }}
        InputProps={{
          classes: {
            input: classes.datePickerPrimaryColor,
            notchedOutline: classes.datePickerBorderColor,
            focused: classes.datePickerBorderColor,
          },
        }}
      />
    </MuiPickersUtilsProvider>
  );
};

export default DatePicker;
