import { makeStyles } from "@mui/styles";

const drawerWidth = 240;

export default makeStyles(() => ({
  drawerOpen: {
    width: drawerWidth,
    height: "100vh",
    zIndex: 1000,
    "& .MuiDrawer-paper": { "padding-top": 80, width: drawerWidth },
  },
}));
