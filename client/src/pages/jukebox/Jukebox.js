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

// Design at https://codepen.io/Roemerdt/pen/rOqVZx

import React from "react";
import { useSearchParams } from "react-router-dom";

// components
import { Grid, Paper } from "@mui/material";
import { UniqueAssetTable } from "@components";
import { VideoTrack } from "./VideoTrack";

// utils
import { EXAMPLE_VIDEOS, updateMedia } from "@utils";

// context
import { setMessage, useGlobalDispatch, useGlobalState } from "@context";

function randInt(max) {
  return Math.floor(Math.random() * max);
}

export function Jukebox() {
  const [asset, setAsset] = React.useState({});
  const [searchParams] = useSearchParams();

  // context
  const globalDispatch = useGlobalDispatch();
  const { selectedWorld } = useGlobalState();

  let assetId = searchParams.get("assetId");
  const playerId = searchParams.get("playerId");
  const urlSlug = searchParams.get("urlSlug") || selectedWorld.urlSlug;
  const apiKey = localStorage.getItem("apiKey");
  // if (urlSlugParam) setUrlSlug(urlSlugParam);
  // if (assetIdParam) setUrlSlug(assetIdParam)
  // if (!playerId) {
  //   // Meaning not coming from iframe
  //   assetId = asset.id;
  // }

  const playMedia = async (mediaLink) => {
    // If API Key is included in an input, send to backend and overwrite the server's default API Key.
    const result = await updateMedia({
      apiKey,
      assetId: assetId || asset.id,
      mediaLink,
      urlSlug,
    });
    if (!result.error) {
      setMessage({
        dispatch: globalDispatch,
        message: "Success!",
        messageType: "success",
      });
    } else {
      setMessage({
        dispatch: globalDispatch,
        message: result.error,
        messageType: "error",
      });
    }
  };

  const calcVideos = () => {
    const min = randInt(EXAMPLE_VIDEOS.length - 20);
    return EXAMPLE_VIDEOS.slice(min, min + 20).map((id) => {
      const mediaLink = `https://www.youtube.com/watch?v=${id}`;
      return VideoTrack(mediaLink, playMedia);
    });
  };
  return (
    <Grid
      container
      direction="column"
      justifyContent="space-around"
      p={1}
      spacing={2}
    >
      {!playerId && (
        <Grid item>
          <UniqueAssetTable
            handleChangeAsset={setAsset}
            selectedWorld={selectedWorld}
          />
        </Grid>
      )}

      {asset.id && (
        <Grid item>
          <Paper sx={{ p: 2 }}>{calcVideos()}</Paper>
        </Grid>
      )}
    </Grid>
  );
}
