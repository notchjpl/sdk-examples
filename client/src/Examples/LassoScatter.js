import React from "react";
import { publicAPI } from "../utils/publicAPI";
import { lassoAllVisitors } from "../utils/visitors";
import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";

// Pull all assets.  Loop through and include any assets with a uniqueName in a select (with search)
// Lasso, v1 is select asset (by unique name), and when click button everyone in world lassoed to that spot
// Scatter, v1 is input box where select asset.  Plus below where can add additional asset.  Scatters evenly across as many assets as are added when click button.
// v2 of both is being able to select specific players from a list (pull visitors) to be involve in lasso and scatter.  List of players is at top or bottom and when select, stay selected so can scatter, then lasso same group without having to re-select.

export function LassoScatter({ apiKey }) {
  const [urlSlug, setUrlSlug] = React.useState(null);
  const [uniqueAssets, setAssetsWithUniqueNames] = React.useState({});
  const [lassoAsset, setLassoAsset] = React.useState("");

  const fetchAssets = () => {
    publicAPI(apiKey)
      .get(`/world/${urlSlug}/assets`)
      .then((response) => {
        const { data } = response;
        let assetsToDisplay = {};
        data.forEach((element) => {
          if (element.uniqueName) assetsToDisplay[element.id] = element;
        });
        setAssetsWithUniqueNames(assetsToDisplay);
      });
  };

  const createSelectItems = (elementsObj) =>
    Object.values(elementsObj).map((element) => (
      <MenuItem value={element.id}>{element.uniqueName}</MenuItem>
    ));

  const handleChangeLassoAsset = (event) => setLassoAsset(event.target.value);

  const lassoCallback = (result) => {
    console.log("Got callback");
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
        <Button onClick={fetchAssets} variant="contained" disabled={!urlSlug}>
          Fetch Assets with Unique Names
        </Button>
      </Grid>
      <Grid container direction="column" xs={5}>
        <Typography variant="h3" component="h3" color={"black"}>
          Lasso
        </Typography>
        <FormControl>
          <InputLabel id="demo-simple-select-label">Asset</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={lassoAsset}
            label="Asset"
            onChange={handleChangeLassoAsset}
          >
            {createSelectItems(uniqueAssets)}
          </Select>
        </FormControl>
        <Button
          onClick={() =>
            lassoAllVisitors({
              apiKey,
              asset: uniqueAssets[lassoAsset],
              urlSlug,
              callback: lassoCallback,
            })
          }
          variant="contained"
          disabled={!urlSlug}
        >
          Lasso Everyone
        </Button>
      </Grid>
    </Grid>
  );
}
