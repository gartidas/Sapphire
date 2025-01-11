import { Divider, makeStyles } from "@material-ui/core";
import { theme } from "../../../utils/theme";

const useStyles = makeStyles(() => ({
  divider: {
    background: theme.primary,
  },
}));

const ThemedDivider = () => {
  const classes = useStyles();

  return <Divider classes={{ root: classes.divider }} />;
};

export default ThemedDivider;
