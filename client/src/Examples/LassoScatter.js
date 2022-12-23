import React from "react";
import {
  Button,
  Grid,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { UniqueAssetTable } from "../Components";

// Pull all assets.  Loop through and include any assets with a uniqueName in a select (with search)
// Lasso, v1 is select asset (by unique name), and when click button everyone in world lassoed to that spot
// Scatter, v1 is input box where select asset.  Plus below where can add additional asset.  Scatters evenly across as many assets as are added when click button.
// v2 of both is being able to select specific players from a list (pull visitors) to be involve in lasso and scatter.  List of players is at top or bottom and when select, stay selected so can scatter, then lasso same group without having to re-select.
// Include a 'select all' button, then remove people.  To exclude selectively from the lasso.

export function LassoScatter({
  setHasMessage,
  setMessage,
  setMessageType,
  selectedWorld,
}) {
  const [asset, setAsset] = React.useState({});
  const [scatterVisitorsBy, setScatterVisitorsBy] = React.useState(0);
  const [shouldTeleportVisitors, setShouldTeleportVisitors] =
    React.useState(false);

  const handleLassoAll = async () => {
    await selectedWorld
      .moveAllVisitors({
        shouldTeleportVisitors,
        scatterVisitorsBy,
        x: asset.x,
        y: asset.y,
      })
      .then(() => {
        setHasMessage(true);
        setMessage("Success!");
        setMessageType("success");
      })
      .catch((error) => {
        setHasMessage(true);
        setMessage(error);
        setMessageType("error");
      });
  };

  return (
    <Grid container spacing={2} p={4} justifyContent="space-around">
      <Grid item xs>
        <UniqueAssetTable
          handleChangeAsset={setAsset}
          selectedWorld={selectedWorld}
        />
      </Grid>
      <Grid item xs>
        <Paper sx={{ p: 2 }}>
          {asset.name ? (
            <Grid
              container
              spacing={2}
              justifyContent="space-between"
              direction="column"
            >
              <Grid item>
                <Typography variant="h5">
                  Lasso Visitors to {asset.name}
                </Typography>
              </Grid>
              <Grid item>
                <TextField
                  id="scatter"
                  label="Scatter by"
                  onChange={(event) => setScatterVisitorsBy(event.target.value)}
                />
              </Grid>
              <Grid item>
                <Select
                  id="shouldTeleportVisitors"
                  value={shouldTeleportVisitors}
                  label="Teleport visitors?"
                  onChange={(e) => setShouldTeleportVisitors(e.target.value)}
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
  );
}
