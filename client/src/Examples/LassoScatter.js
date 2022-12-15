import React from "react";
import { lassoAllVisitors } from "../utils/visitors";
import { Button, Grid } from "@mui/material";
import { SelectUniqueAsset } from "../Components";

// Pull all assets.  Loop through and include any assets with a uniqueName in a select (with search)
// Lasso, v1 is select asset (by unique name), and when click button everyone in world lassoed to that spot
// Scatter, v1 is input box where select asset.  Plus below where can add additional asset.  Scatters evenly across as many assets as are added when click button.
// v2 of both is being able to select specific players from a list (pull visitors) to be involve in lasso and scatter.  List of players is at top or bottom and when select, stay selected so can scatter, then lasso same group without having to re-select.
// Include a 'select all' button, then remove people.  To exclude selectively from the lasso.

export function LassoScatter({ apiKey }) {
  const [urlSlug, setUrlSlug] = React.useState(null);
  const [asset, setAsset] = React.useState({});

  const lassoCallback = (result) => {
    console.log("Everyone Lassoed!");
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
      <SelectUniqueAsset
        apiKey={apiKey}
        asset={asset}
        setUrlSlug={setUrlSlug}
        handleChangeAsset={setAsset}
        title="Lasso!"
        urlSlug={urlSlug}
      />
      <Button
        onClick={() =>
          lassoAllVisitors({
            apiKey,
            asset,
            urlSlug,
            callback: lassoCallback,
          })
        }
        variant="contained"
        disabled={!urlSlug || !apiKey || !asset.id}
      >
        Lasso Everyone
      </Button>
    </Grid>
  );
}
