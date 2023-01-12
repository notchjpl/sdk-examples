import React from "react";
import PropTypes from "prop-types";
import { useGlobalDispatch, useGlobalState } from "@context";

// components
import { Grid, Paper } from "@mui/material";
import { VideoTrack } from "@components";

// utils
import { EXAMPLE_VIDEOS, playMediaInAsset } from "@utils";

function randInt(max) {
  return Math.floor(Math.random() * max);
}

Playlist.propTypes = {
  assetId: PropTypes.string.isRequired,
};

export function Playlist({ assetId }) {
  // context
  const globalDispatch = useGlobalDispatch();
  const globalState = useGlobalState();

  const urlSlug = globalState.urlSlug;
  const apiKey = localStorage.getItem("apiKey");

  const calcVideos = () => {
    const min = randInt(EXAMPLE_VIDEOS.length - 20);
    return EXAMPLE_VIDEOS.slice(min, min + 20).map((id) => {
      return (
        <VideoTrack
          key={id}
          play={() =>
            playMediaInAsset({
              apiKey,
              assetId,
              videoId: id,
              urlSlug,
              globalDispatch,
            })
          }
          youtubeId={id}
        />
      );
    });
  };

  return (
    <Grid item>
      <Paper sx={{ p: 2 }}>
        <div>Playlist!</div>
        {calcVideos()}
      </Paper>
    </Grid>
  );
}
