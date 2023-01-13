// Should be able to add video to end of playlist by pasting in a youtube link

import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useGlobalDispatch, useGlobalState } from "@context";

// components
import { Grid, Paper, Typography } from "@mui/material";
import { Search, VideoTrack } from "@components";

// utils
import {
  getDataObject,
  playMediaInAsset,
  removeFromAssetPlaylist,
} from "@utils";

Playlist.propTypes = {
  assetId: PropTypes.string.isRequired,
};

export function Playlist({ assetId }) {
  const [searchVal, setSearchVal] = React.useState("");
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

  const handleRemoveFromPlaylist = async (index) => {
    const newDataObject = await removeFromAssetPlaylist({
      apiKey,
      assetId,
      globalDispatch,
      index,
      urlSlug,
    });
    if (newDataObject.mediaLinkPlaylist) setDataObject(newDataObject);
  };

  // Should add pagination
  const CreateVideoTracks = () => {
    if (!dataObject || !dataObject.mediaLinkPlaylist) return <div />;
    String.prototype.toHHMMSS = function () {
      var sec_num = parseInt(this, 10); // don't forget the second param
      var hours = Math.floor(sec_num / 3600);
      var minutes = Math.floor((sec_num - hours * 3600) / 60);
      var seconds = sec_num - hours * 3600 - minutes * 60;

      if (hours < 10) {
        hours = "0" + hours;
      }
      if (minutes < 10) {
        minutes = "0" + minutes;
      }
      if (seconds < 10) {
        seconds = "0" + seconds;
      }
      return hours + ":" + minutes + ":" + seconds;
    };
    return (
      dataObject.mediaLinkPlaylist
        // .slice(0, 20)
        .map((item, index) => {
          const { id } = item;

          return (
            <VideoTrack
              key={id}
              play={() =>
                playMediaInAsset({
                  apiKey,
                  assetId,
                  index,
                  globalDispatch,
                  urlSlug,
                  videoId: id,
                  videoInfo: item,
                })
              }
              removeFromPlaylist={() => handleRemoveFromPlaylist(index)}
              videoInfo={item}
              youtubeId={id}
            />
          );
        })
    );
  };

  const runSearch = () => {
    return;
  };

  return (
    <Grid item>
      <Paper sx={{ p: 2 }}>
        <Typography variant="h4">Playlist</Typography>
        <Search
          onChange={setSearchVal}
          runSearch={runSearch}
          searching={false}
          searchVal={searchVal}
        ></Search>
        {CreateVideoTracks()}
      </Paper>
    </Grid>
  );
}
