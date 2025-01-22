import { Divider, DividerProps, makeStyles } from "@material-ui/core";
import { theme } from "../../../utils/theme";

const useStyles = makeStyles(() => ({
  divider: {
    background: theme.primary,
  },
}));

const ThemedDivider = (props: DividerProps) => {
  const classes = useStyles();

  return <Divider {...props} classes={{ root: classes.divider }} />;
};

export default ThemedDivider;
