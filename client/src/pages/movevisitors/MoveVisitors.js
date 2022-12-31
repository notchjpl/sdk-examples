import React from "react";

// components
import {
  Button,
  Grid,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { UniqueAssetTable, VisitorsTable } from "@components";

// context
import { setMessage, useGlobalDispatch, useGlobalState } from "@context";

// Pull all assets.  Loop through and include any assets with a uniqueName in a select (with search)
// Lasso, v1 is select asset (by unique name), and when click button everyone in world lassoed to that spot
// Scatter, v1 is input box where select asset.  Plus below where can add additional asset.  Scatters evenly across as many assets as are added when click button.
// v2 of both is being able to select specific players from a list (pull visitors) to be involve in lasso and scatter.  List of players is at top or bottom and when select, stay selected so can scatter, then lasso same group without having to re-select.
// Include a 'select all' button, then remove people.  To exclude selectively from the lasso.

export function MoveVisitors() {
  const [asset, setAsset] = React.useState({});
  const [scatterVisitorsBy, setScatterVisitorsBy] = React.useState(0);
  const [shouldTeleportVisitors, setShouldTeleportVisitors] =
    React.useState(false);

  // context
  const globalDispatch = useGlobalDispatch();
  const { selectedWorld } = useGlobalState();

  const handleLassoAll = async () => {
    await selectedWorld
      .moveAllVisitors({
        shouldTeleportVisitors,
        scatterVisitorsBy,
        x: asset.x,
        y: asset.y,
      })
      .then(() => {
        setMessage({
          dispatch: globalDispatch,
          message: "Success!",
          messageType: "success",
        });
      })
      .catch((error) =>
        setMessage({
          dispatch: globalDispatch,
          message: error,
          messageType: "error",
        })
      );
  };

  const handleMoveVisitors = async (visitors) => {
    let visitorsToMove = visitors.filter((v) => v.selected === true);
    await selectedWorld
      .moveVisitors(visitorsToMove)
      .then(() => {
        setMessage({
          dispatch: globalDispatch,
          message: "Success!",
          messageType: "success",
        });
      })
      .catch((error) =>
        setMessage({
          dispatch: globalDispatch,
          message: error,
          messageType: "error",
        })
      );
  };

  return (
    <>
      <Grid container justifyContent="space-around" p={4} spacing={2}>
        <Grid item xs={8}>
          <UniqueAssetTable
            handleChangeAsset={setAsset}
            selectedWorld={selectedWorld}
          />
        </Grid>
        <Grid item xs={4}>
          <Paper sx={{ p: 2 }}>
            {asset.name ? (
              <Grid
                container
                direction="column"
                justifyContent="space-between"
                spacing={2}
              >
                <Grid item>
                  <Typography variant="h5">
                    Lasso Visitors to <b>{asset.name}</b>
                  </Typography>
                </Grid>
                <Grid item>
                  <TextField
                    id="scatter"
                    label="Scatter by"
                    onChange={(event) =>
                      setScatterVisitorsBy(event.target.value)
                    }
                  />
                </Grid>
                <Grid item>
                  <Select
                    id="shouldTeleportVisitors"
                    label="Teleport visitors?"
                    onChange={(e) => setShouldTeleportVisitors(e.target.value)}
                    value={shouldTeleportVisitors}
                  >
                    <MenuItem value={true}>True</MenuItem>
                    <MenuItem value={false}>False</MenuItem>
                  </Select>
                </Grid>
                <Grid item>
                  <Button onClick={handleLassoAll} variant="contained">
                    Lasso Everyone
                  </Button>
                </Grid>
              </Grid>
            ) : (
              <Typography>Select an asset to continue</Typography>
            )}
          </Paper>
        </Grid>
      </Grid>
      <Grid container justifyContent="space-around" p={4} spacing={2}>
        <Grid item xs={12}>
          <VisitorsTable
            handleMoveVisitors={handleMoveVisitors}
            selectedWorld={selectedWorld}
          />
        </Grid>
      </Grid>
    </>
  );
}
