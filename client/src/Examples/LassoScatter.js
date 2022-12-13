import React from "react";
import { publicAPI } from "../utils/publicAPI";
import { Button, Grid, TextField } from "@mui/material";

// Pull all assets.  Loop through and include any assets with a uniqueName in a select (with search)
// Lasso, v1 is select asset (by unique name), and when click button everyone in world lassoed to that spot
// Scatter, v1 is input box where select asset.  Plus below where can add additional asset.  Scatters evenly across as many assets as are added when click button.
// v2 of both is being able to select specific players from a list (pull visitors) to be involve in lasso and scatter.  List of players is at top or bottom and when select, stay selected so can scatter, then lasso same group without having to re-select.

export function LassoScatter({ apiKey }) {
  const [urlSlug, setUrlSlug] = React.useState(null);
  const [uniqueAssets, setAssetsWithUniqueNames] = React.useState(null);

  const fetchAssets = () => {
    publicAPI(apiKey)
      .get(`/world/${urlSlug}/assets`)
      .then((data) => {
        let assetsToDisplay = {};
        data.forEach((element) => {
          if (element.uniqueName) assetsToDisplay[element.uniqueName] = element;
        });
        setAssetsWithUniqueNames(assetsToDisplay);
      });
  };

  return (
    <Grid
      container
      spacing={2}
      justifyContent="space-between"
      alignItems="center"
      direction="column"
      style={{ minHeight: "40vh" }}
    >
      <Grid container direction="row" justifyContent="center" spacing={3}>
        <Grid item>
          <TextField
            id="urlSlugInput"
            label="Add URL Slug"
            variant="standard"
            onChange={(event) => setUrlSlug(event.target.value)}
          />
        </Grid>
      </Grid>

      <Grid item xs={8}>
        <Button onClick={fetchAssets} variant="contained">
          Fetch Assets with Unique Names
        </Button>
      </Grid>
    </Grid>
  );
}
