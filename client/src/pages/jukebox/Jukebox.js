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

import React from "react";
import ReactPlayer from "react-player/lazy";
import { useSearchParams } from "react-router-dom";
import { DroppedAsset } from "@rtsdk/topia";

// components
import { Button, Grid, Paper } from "@mui/material";
import { UniqueAssetTable } from "@components";

// utils
import { EXAMPLE_VIDEOS } from "@utils";

// context
import { setMessage, useGlobalDispatch, useGlobalState } from "@context";

function randInt(max) {
  return Math.floor(Math.random() * max);
}

export function Jukebox() {
  const playerRef = React.useRef(null);
  const [asset, setAsset] = React.useState({});
  const [searchParams] = useSearchParams();

  // context
  const globalDispatch = useGlobalDispatch();
  const { selectedWorld } = useGlobalState();

  const apiKey = localStorage.getItem("apiKey");
  let assetId = searchParams.get("assetId");
  const playerId = searchParams.get("playerId");
  const urlSlug = searchParams.get("urlSlug") || selectedWorld.urlSlug;
  // if (urlSlugParam) setUrlSlug(urlSlugParam);
  // if (assetIdParam) setUrlSlug(assetIdParam)
  if (!playerId) {
    // Meaning not coming from iframe
    assetId = asset.id;
  }

  const handleUpdateMedia = async (mediaLink) => {
    const droppedAsset = await new DroppedAsset({
      apiKey,
      id: assetId,
      urlSlug,
    });
    await droppedAsset
      .updateMediaType({ mediaLink })
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

  const renderRow = (id) => {
    const mediaLink = `https://www.youtube.com/watch?v=${id}`;
    return (
      <Paper
        elevation={3}
        key={id}
        style={{ width: 220, margin: 5 }}
        variant="elevation"
      >
        <Grid
          alignItems="center"
          container
          direction="row"
          justifyContent="space-between"
        >
          <Grid item xs={4}>
            <ReactPlayer
              config={{
                youtube: {
                  playerVars: {
                    modestbranding: 1,
                    controls: 0,
                  },
                },
              }}
              controls={false}
              height={75}
              light
              muted={true}
              onReady={(item) => item.getInternalPlayer().playVideo()}
              playsinline={true}
              ref={playerRef}
              url={mediaLink}
              width={100}
            />
          </Grid>
          <Grid item xs={4}>
            <Button
              onClick={() => handleUpdateMedia(mediaLink)}
              variant="contained"
            >
              Play
            </Button>
          </Grid>
        </Grid>
      </Paper>
    );
  };

  const calcVideos = () => {
    const min = randInt(EXAMPLE_VIDEOS.length - 20);
    return EXAMPLE_VIDEOS.slice(min, min + 20).map((id) => renderRow(id));
  };
  return (
    <Grid container justifyContent="space-around" p={4} spacing={2}>
      {!playerId && (
        <Grid item xs={6}>
          <UniqueAssetTable
            handleChangeAsset={setAsset}
            selectedWorld={selectedWorld}
          />
        </Grid>
      )}
      <Grid item xs={6}>
        <Paper sx={{ p: 2 }}>{calcVideos()}</Paper>
      </Grid>
    </Grid>
  );
}
