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
    padding: theme.spacing(1),
  },
  inputField: {
    width: "100%",
    "& .MuiFormLabel-root": {
      color: "white",
      top: -6,
    },
    "& .MuiInputLabel-shrink": {
      "background-color": `${theme.palette.secondary.main} !important`,
      top: 0,
      paddingLeft: theme.spacing(1),
      paddingRight: theme.spacing(1),
    },
    "& input": {
      padding: 8,
      border: "1px solid rgba(200,200,200,0.8)",
      "border-radius": 4,
      color: "white",
      "background-color": `${theme.palette.secondary.main} !important`,
    },
  },
}));
