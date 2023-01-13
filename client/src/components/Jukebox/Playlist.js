// Should be able to add video to end of playlist by pasting in a youtube link

import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useGlobalDispatch, useGlobalState } from "@context";

// components
import { Grid, Paper, Typography } from "@mui/material";
import { VideoTrack } from "@components";

// utils
import { getDataObject, playMediaInAsset } from "@utils";

Playlist.propTypes = {
  assetId: PropTypes.string.isRequired,
};

export function Playlist({ assetId }) {
  const [dataObject, setDataObject] = React.useState({});
  // context
  const globalDispatch = useGlobalDispatch();
  const globalState = useGlobalState();

  const urlSlug = globalState.urlSlug;
  const apiKey = localStorage.getItem("apiKey");

  useEffect(() => {
    const fetchData = async () => {
      if (assetId) {
        const dataObject = await getDataObject({ assetId, urlSlug, apiKey });
        setDataObject(dataObject);
      }
    };
    fetchData();
  }, [apiKey, assetId, urlSlug]);

  // Should add pagination
  const CreateVideoTracks = () => {
    if (!dataObject.mediaLinkPlaylist) return <div />;
    return (
      dataObject.mediaLinkPlaylist
        // .slice(0, 20)
        .map((item) => {
          const { id } = item;
          const { videoId } = id;
          return (
            <VideoTrack
              key={videoId}
              play={() =>
                playMediaInAsset({
                  apiKey,
                  assetId,
                  videoId,
                  urlSlug,
                  globalDispatch,
                })
              }
              videoInfo={{
                title: item.snippet.title,
                channelTitle: item.snippet.channelTitle,
              }}
              youtubeId={videoId}
            />
          );
        })
    );
  };

  return (
    <Grid item>
      <Paper sx={{ p: 2 }}>
        <Typography variant="h4">Playlist</Typography>
        {CreateVideoTracks()}
      </Paper>
    </Grid>
  );
}
