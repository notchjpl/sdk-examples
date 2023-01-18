import React, { useEffect } from "react";

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
import { setMessage, useGlobalDispatch, useGlobalState } from "@context";

// utils
import { backendAPI, getDataObject } from "@utils";

export function EditTextAsset() {
  const [asset, setAsset] = React.useState();
  const [assetText, setAssetText] = React.useState("");

  // context
  const globalDispatch = useGlobalDispatch();
  const { assetId, isInteractiveIframe, urlSlug } = useGlobalState();

  useEffect(() => {
    const getDroppedAsset = async () => {
      const droppedAsset = await getDataObject({
        assetId,
        urlSlug,
      });
      setAsset(droppedAsset);
    };
    if (assetId) getDroppedAsset();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSetAsset = (asset) => {
    setAsset(asset);
    setAssetText(asset.text);
  };

  const handleUpdateAsset = async () => {
    await backendAPI
      .post("/updatetextasset", { assetId: asset.id, assetText, urlSlug })
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
        {!isInteractiveIframe && (
          <Grid item xs={8}>
            <DroppedAssetTable
              assetType="text"
              handleChangeAsset={handleSetAsset}
            />
          </Grid>
        )}
        <Grid item xs={isInteractiveIframe ? 12 : 4}>
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
