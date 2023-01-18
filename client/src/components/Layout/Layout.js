import React from "react";
import { useLocation } from "react-router-dom";

// styles
import { useTheme } from "@mui/system";

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
  const theme = useTheme();
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
    isInteractiveIframe,
  } = useGlobalState();

  const handleCloseSnackbar = () => {
    removeMessage(globalDispatch);
  };

  return (
    <Grid
      sx={{
        display: "flex",
        maxWidth: "100vw",
        overflowX: "hidden",
      }}
    >
      {!isInteractiveIframe && (
        <>
          <Header />
          <Sidebar />
        </>
      )}
      <Grid
        container
        spacing={4}
        sx={{
          flexGrow: 1,
          padding: theme.spacing(3),
          top: theme.spacing(8),
          width: `calc(100vw - 240px)`,
          position: "relative",
          alignSelf: "flex-start",
        }}
      >
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
    </Grid>
  );
}

export default Layout;
