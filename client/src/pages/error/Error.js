import React from "react";
import { Link } from "react-router-dom";

// components
import { Button, Grid, Paper, Typography } from "@mui/material";

// styles
import useStyles from "./styles";

export function Error() {
  const classes = useStyles();
  // const error = useRouteError();

  return (
    <Grid className={classes.container} container>
      <Paper classes={{ root: classes.paperRoot }}>
        <Typography className={classes.textRow} color="primary" variant="h1">
          404
        </Typography>
        <Typography className={classes.textRow} color="primary" variant="h5">
          Oops. Looks like the page you&apos;re looking for no longer exists.
          {/* <i>{error.statusText || error.message}</i> */}
        </Typography>
        <Typography className={classes.textRow} color="text" variant="h6">
          But we&apos;re here to bring you back to safety
        </Typography>
        <Button
          className={classes.backButton}
          color="primary"
          component={Link}
          size="large"
          to="/"
          variant="contained"
        >
          Back to Home
        </Button>
      </Paper>
    </Grid>
  );
}
