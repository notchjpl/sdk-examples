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
import { Search, UniqueAssetTable } from "@components";
import { VideoTrack } from "./VideoTrack";

// utils
import { EXAMPLE_VIDEOS, backendAPI } from "@utils";

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
  const globalState = useGlobalState();

  let assetId = searchParams.get("assetId") || globalState.assetId;
  const urlSlug = searchParams.get("urlSlug") || globalState.urlSlug;
  const apiKey = localStorage.getItem("apiKey");
  // if (urlSlugParam) setUrlSlug(urlSlugParam);
  // if (assetIdParam) setUrlSlug(assetIdParam)
  // if (!playerId) {
  //   // Meaning not coming from iframe
  //   assetId = asset.id;
  // }

  const playMedia = async (mediaLink) => {
    // If API Key is included in an input, send to backend and overwrite the server's default API Key.
    await backendAPI
      .post("/updatemedia", {
        apiKey,
        assetId: assetId || asset.id,
        mediaLink,
        urlSlug,
      })
      .then(() => {
        setMessage({
          dispatch: globalDispatch,
          message: "Success!",
          messageType: "success",
        });
      })
      .catch((error) => {
        setMessage({
          dispatch: globalDispatch,
          message: error,
          messageType: "error",
        });
      });
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
      <Grid item>
        <UniqueAssetTable handleChangeAsset={setAsset} />
      </Grid>

      <Grid container p={2} spacing={2}>
        <Grid item>
          <Search
            onChange={() => null}
            runSearch={() => null}
            searchVal="hi"
          ></Search>
        </Grid>
        {asset.id && (
          <Grid item>
            <Paper sx={{ p: 2 }}>{calcVideos()}</Paper>
          </Grid>
        )}
      </Grid>
    </Grid>
  );
}
