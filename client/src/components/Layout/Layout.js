import React from "react";
import { useLocation } from "react-router-dom";

// styles
import useStyles from "./styles";

// components
import { Header } from "../Header";
import Sidebar from "../Sidebar/Sidebar";
import { Alert, Grid, Snackbar, Typography } from "@mui/material";

// context
import {
  removeMessage,
  useGlobalDispatch,
  useGlobalState,
} from "../../context/GlobalContext";

// utils
import { getRouteByPath } from "../../utils";
import { pageContent } from "../../content/pageContent";

export function Layout({ children }) {
  const classes = useStyles();
  const location = useLocation();
  const { id } = getRouteByPath(location.pathname);
  const { description, title, requiresUrlSlug } = pageContent[id];

  // context
  const globalDispatch = useGlobalDispatch();
  var { hasMessage, message, messageType, selectedWorld } = useGlobalState();

  const handleCloseSnackbar = () => {
    removeMessage(globalDispatch);
  };

  return (
    <div className={classes.root}>
      <Header />
      <Sidebar />
      <Grid container className={classes.content} spacing={4}>
        <Grid item xs={12}>
          <Typography variant="h3" component="h1">
            {title}
          </Typography>
        </Grid>
        {description && (
          <Grid item xs={12}>
            <Typography>{description}</Typography>
          </Grid>
        )}
        <Grid item xs={12}>
          {requiresUrlSlug && !selectedWorld.urlSlug ? (
            <Grid container p={10} justifyContent="space-around">
              <Grid item>
                <Typography variant="h5" color="black">
                  Please enter an API Key and Url Slug above to continue
                </Typography>
              </Grid>
            </Grid>
          ) : (
            children
          )}
        </Grid>
      </Grid>
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        open={hasMessage}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={messageType || "info"}
          sx={{ width: "100%" }}
        >
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default Layout;
