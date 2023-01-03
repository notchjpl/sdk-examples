import { makeStyles } from "@mui/styles";

export default makeStyles((theme) => ({
  appBar: {
    zIndex: 2000,
    transition: theme.transitions.create(["margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    "background-color": `${theme.palette.secondary.main} !important`,
  },
  toolbar: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
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
}));
