import React from "react";
// import { fetchAssets } from "@utils/publicAPI";
import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";

// context
import { useGlobalState } from "@context";

/**
 * @deprecated
 */
export function SelectUniqueAsset({ asset, handleChangeAsset, title }) {
  const [uniqueAssets, setAssetsWithUniqueNames] = React.useState({});
  const createSelectItems = (elementsObj) =>
    Object.values(elementsObj).map((element) => (
      <MenuItem value={element.id}>{element.uniqueName}</MenuItem>
    ));
  const apiKey = localStorage.getItem("apiKey");

  // context
  const { selectedWorld } = useGlobalState();

  return (
    <div>
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        spacing={2}
        style={{ marginBottom: 20 }}
      >
        <Grid item xs={8}>
          <Button
            // onClick={() =>
            //   fetchAssets(
            //     apiKey,
            //     selectedWorld.urlSlug,
            //     setAssetsWithUniqueNames
            //   )
            // }
            variant="contained"
            disabled={!selectedWorld.urlSlug}
          >
            Fetch Assets with Unique Names
          </Button>
        </Grid>

        {title && (
          <Grid item xs={8}>
            <Typography variant="h3" component="h3" color={"black"}>
              {title}
            </Typography>
          </Grid>
        )}
        <Grid item xs={8}>
          <FormControl style={{ minWidth: 100 }} disabled={!selectedWorld}>
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
