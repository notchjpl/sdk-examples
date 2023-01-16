import React from "react";
import { useLocation } from "react-router-dom";

// styles
import useStyles from "./styles";

// components
import { Header } from "../Header";
import Sidebar from "../Sidebar/Sidebar";
import { Alert, Grid, Snackbar, Typography } from "@mui/material";

// context
import { removeMessage, useGlobalDispatch, useGlobalState } from "@context";

// utils
import { getRouteByPath } from "@utils";
import { pageContent } from "../../content/pageContent";

export function Layout({ children }) {
  const classes = useStyles();
  const location = useLocation();
  const route = getRouteByPath(location.pathname);
  const routeId = route ? route.id : "ERROR";
  const { description, title, requiresUrlSlug } = pageContent[routeId];

  // context
  const globalDispatch = useGlobalDispatch();
  const {
    hasMessage,
    message,
    messageType,
    selectedWorld,
    urlSlug,
    visitorId,
    interactiveNonce,
    assetId,
  } = useGlobalState();
  const isInteractiveIframe = visitorId && interactiveNonce && assetId;

  const handleCloseSnackbar = () => {
    removeMessage(globalDispatch);
  };

  return (
    <div className={classes.root}>
      {!isInteractiveIframe && (
        <>
          <Header />
          <Sidebar />
        </>
      )}
      <Grid className={classes.content} container spacing={4}>
        <Grid item xs={12}>
          <Typography component="h1" variant="h3">
            {title}
          </Typography>
        </Grid>
        {description && (
          <Grid item xs={12}>
            <Typography>{description}</Typography>
          </Grid>
        )}
        <Grid item xs={12}>
          {requiresUrlSlug && !selectedWorld.urlSlug && !urlSlug ? (
            <Grid container justifyContent="space-around" p={10}>
              <Grid item>
                <Typography color="black" variant="h5">
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
        onClose={handleCloseSnackbar}
        open={hasMessage}
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
