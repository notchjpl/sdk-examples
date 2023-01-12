// https://github.com/lalwanivikas/jukebox
// https://github.com/CookPete/react-player

// Controls: audio only or video?
// Volume
// Radius
// Add YouTube search https://developers.google.com/youtube/v3/docs
// https://github.com/mattwright324/youtube-metadata/blob/master/js/youtube-api-v3.js
// Add a server listener for 'next track' and 'previous track'
// Add a server listener for 'pause' and 'play'
// Add a server listener for 'pause'.  Update data object with current track time.
// https://sdk-examples.metaversecloud.com/jukebox?urlSlug=jukebox-demo-s9zdortms&playerId=1&assetId=-NJN9E9YVXSgR5yxaKG3&apiKey=4885c9eb-88ec-4792-a13f-fdb74fbf56a9

// Make playlist draggable https://codesandbox.io/s/draggable-material-ui-oj3wz

// Add a 'teleport to asset' button that portal teleports you to the selected asset

import React from "react";
import { useGlobalState } from "@context";
import { useSearchParams } from "react-router-dom";

// components
import { Grid } from "@mui/material";
import { Playlist, UniqueAssetTable, YouTubeSearch } from "@components";

export function Jukebox() {
  const [asset, setAsset] = React.useState({});
  const [searchParams] = useSearchParams();

  const globalState = useGlobalState();
  let assetId = searchParams.get("assetId") || globalState.assetId;

  return (
    <Grid
      container
      direction="column"
      justifyContent="space-around"
      p={1}
      spacing={2}
    >
      <Grid item>
        <UniqueAssetTable handleChangeAsset={setAsset} />
      </Grid>

      <Grid container p={2} spacing={2}>
        <Grid item>
          <YouTubeSearch assetId={assetId || asset.id} />
        </Grid>
        <Grid item>
          <Playlist assetId={assetId || asset.id} />
        </Grid>
      </Grid>
    </Grid>
  );
}
