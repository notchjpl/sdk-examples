import { makeStyles } from "@mui/styles";

export default makeStyles((theme) => ({
  container: {
    height: "100vh",
    width: "100vw",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme.palette.secondary.main,
    position: "absolute",
    top: 0,
    left: 0,
  },
  paperRoot: {
    boxShadow: theme.customShadows.widgetDark,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: theme.spacing(6),
    maxWidth: 500,
  },
  textRow: {
    paddingBottom: theme.spacing(4),
    textAlign: "center",
  },
  backButton: {
    boxShadow: theme.customShadows.widget,
    textTransform: "none",
    fontSize: 22,
  },
}));
