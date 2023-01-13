import { makeStyles } from "@mui/styles";

export default makeStyles((theme) => ({
  container: {
    borderRadius: 4,
    background: theme.palette.secondary.main,
    overflow: "hidden",
  },
  playerContainer: {
    background: "rgba(0, 0, 0, 0.5)",
    position: "relative",
  },
  controls: {
    background: "linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.4))",
    position: "absolute",
    height: "100%",
  },
  progress: {
    background: "white",
    paddingBottom: 2,
    position: "relative",
    width: "80%",
  },
  played: {
    height: 2,
    position: "absolute",
    background: theme.palette.primary.main,
  },
  circle: {
    background: theme.palette.primary.main,
    borderRadius: 50,
    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.7)",
    height: 10,
    marginTop: -4,
    position: "absolute",
    right: 0,
    width: 10,
  },
  menuItem: {
    background: theme.palette.secondary.main,
    borderBottom: `1px solid ${theme.palette.secondary.light}`,
  },
  thumbnail: {
    "& img": {
      height: 60,
      objectFit: "cover",
      width: 60,
    },
  },
  title: {
    color: theme.palette.secondary.contrastText,
    fontSize: "1.2rem !important",
    fontWeight: "bold",
  },
  artist: {
    color: theme.palette.text.hint,
    fontSize: ".9rem !important",
  },
  active: {
    color: theme.palette.primary.light,
  },
}));
