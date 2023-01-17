import React from "react";

// components
import {
  Button,
  Grid,
  InputLabel,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { DroppedAssetTable } from "@components";

// context
import { setMessage, useGlobalDispatch } from "@context";

export function EditTextAsset() {
  const [asset, setAsset] = React.useState();
  const [assetText, setAssetText] = React.useState("");

  // context
  const globalDispatch = useGlobalDispatch();

  const handleSetAsset = (asset) => {
    setAsset(asset);
    setAssetText(asset.text);
  };

  const handleUpdateAsset = async () => {
    await asset
      .updateCustomText({}, assetText)
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
          <DroppedAssetTable
            assetType="text"
            handleChangeAsset={handleSetAsset}
          />
        </Grid>
        <Grid item xs={4}>
          <Paper sx={{ p: 2 }}>
            {asset ? (
              <Grid
                container
                direction="column"
                justifyContent="space-between"
                spacing={2}
              >
                <Grid item>
                  <InputLabel>Update Text Asset</InputLabel>
                  <TextField
                    fullWidth
                    onChange={(event) => setAssetText(event.target.value)}
                    value={assetText}
                    variant="outlined"
                  />
                </Grid>
                <Grid item>
                  <Button onClick={handleUpdateAsset} variant="contained">
                    Update
                  </Button>
                </Grid>
              </Grid>
            ) : (
              <Typography>Select an asset to continue</Typography>
            )}
          </Paper>
        </Grid>
      </Grid>
    </>
  );
}
