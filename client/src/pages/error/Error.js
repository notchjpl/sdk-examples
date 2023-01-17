import React from "react";
import { Link } from "react-router-dom";

// components
import { Button, Grid, Paper, Typography } from "@mui/material";

// styles
import { styled, useTheme } from "@mui/system";

export function Error() {
  const theme = useTheme();
  // const error = useRouteError();

  const StyledTextRow = styled(Typography)(() => ({
    paddingBottom: theme.spacing(4),
    textAlign: "center",
  }));

  return (
    <Grid
      container
      sx={{
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
      }}
    >
      <Paper
        sx={{
          boxShadow: theme.customShadows.widgetDark,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: theme.spacing(6),
          maxWidth: 500,
        }}
      >
        <StyledTextRow color="primary" variant="h1">
          404
        </StyledTextRow>
        <StyledTextRow color="primary" variant="h5">
          Oops. Looks like the page you&apos;re looking for no longer exists.
          {/* <i>{error.statusText || error.message}</i> */}
        </StyledTextRow>
        <StyledTextRow color="text" variant="h6">
          But we&apos;re here to bring you back to safety
        </StyledTextRow>
        <Button
          color="primary"
          component={Link}
          size="large"
          sx={{
            boxShadow: theme.customShadows.widget,
            textTransform: "none",
            fontSize: 22,
          }}
          to="/"
          variant="contained"
        >
          Back to Home
        </Button>
      </Paper>
    </Grid>
  );
}
