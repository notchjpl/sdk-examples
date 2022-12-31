import { makeStyles } from "@mui/styles";

export default makeStyles((theme) => ({
  logotype: {
    color: "white",
    marginLeft: theme.spacing(2.5),
    marginRight: theme.spacing(2.5),
    fontWeight: 500,
    fontSize: 18,
    whiteSpace: "nowrap",
    [theme.breakpoints.down("xs")]: {
      display: "none",
    },
  },
  appBar: {
    zIndex: 2000,
    transition: theme.transitions.create(["margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    "background-color": `${theme.palette.primary.main} !important`,
  },
  toolbar: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
  hide: {
    display: "none",
  },
  grow: {
    flexGrow: 1,
  },
  inputRoot: {
    color: "inherit",
    width: "100%",
  },
  inputInput: {
    padding: 0,
    width: "100%",
    "& .MuiFormLabel-root": { color: "white", top: -6 },
    "& input": {
      padding: 8,
      height: 20,
      border: "1px solid rgba(200,200,200,0.8)",
      "border-radius": 4,
      color: "white",
    },
  },
  headerIcon: {
    fontSize: 28,
    color: "rgba(255, 255, 255, 0.35)",
  },
  headerIconCollapse: {
    color: "white",
  },
}));
