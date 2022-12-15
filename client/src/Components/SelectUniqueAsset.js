import React from "react";
import { fetchAssets } from "../utils/publicAPI";
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

export function SelectUniqueAsset({
  apiKey,
  asset,
  urlSlug,
  setUrlSlug,
  handleChangeAsset,
  title,
}) {
  const [uniqueAssets, setAssetsWithUniqueNames] = React.useState({});
  const createSelectItems = (elementsObj) =>
    Object.values(elementsObj).map((element) => (
      <MenuItem value={element.id}>{element.uniqueName}</MenuItem>
    ));

  return (
    <div>
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        spacing={2}
      >
        <Grid item>
          <TextField
            id="urlSlugInput"
            label="Add URL Slug"
            variant="standard"
            disabled={!apiKey}
            onChange={(event) => setUrlSlug(event.target.value)}
          />
        </Grid>

        <Grid item xs={8}>
          <Button
            onClick={() =>
              fetchAssets(apiKey, urlSlug, setAssetsWithUniqueNames)
            }
            variant="contained"
            disabled={!urlSlug}
          >
            Fetch Assets with Unique Names
          </Button>
        </Grid>

        <Grid item xs={8}>
          <Typography variant="h3" component="h3" color={"black"}>
            {title}
          </Typography>
        </Grid>
        <Grid item xs={8}>
          <FormControl style={{ minWidth: 100 }} disabled={!urlSlug}>
            <InputLabel id="demo-simple-select-label">Asset</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={asset.id}
              label="Asset"
              key={asset}
              onChange={(e) => handleChangeAsset(uniqueAssets[e.target.value])}
            >
              {createSelectItems(uniqueAssets)}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
    </div>
  );
}
