import { makeStyles } from "@mui/styles";

export default makeStyles((theme) => ({
  root: {
    display: "flex",
    maxWidth: "100vw",
    overflowX: "hidden",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    top: theme.spacing(8),
    width: `calc(100vw - 240px)`,
    position: "relative",
    alignSelf: "flex-start",
  },
}));
