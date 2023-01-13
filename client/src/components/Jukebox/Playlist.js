// Should be able to add video to end of playlist by pasting in a youtube link

import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useGlobalDispatch, useGlobalState } from "@context";

// components
import { Grid, Paper, Typography } from "@mui/material";
import { Search, VideoTrack } from "@components";
import { Controlz } from "./";

// utils
import {
  addToAssetPlaylist,
  getDataObject,
  getYoutubeVideoInfo,
  playMediaInAsset,
  removeFromAssetPlaylist,
} from "@utils";

Playlist.propTypes = {
  assetId: PropTypes.string.isRequired,
};

export function Playlist({ assetId }) {
  const [searchVal, setSearchVal] = React.useState("");
  const [searching, setSearching] = React.useState(false);
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

    return (
      dataObject.mediaLinkPlaylist
        // .slice(0, 20)
        .map((item, index) => {
          const { id } = item;
          if (!item.id || !item.snippet) return;
          return (
            <VideoTrack
              key={id + item.timeAdded}
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

  const youTubeParser = (url) => {
    var regExp =
      /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    var match = url.match(regExp);
    return match && match[7].length == 11 ? match[7] : false;
  };

  const addVideo = async () => {
    setSearching(true);
    const id = youTubeParser(searchVal);
    const videoInfo = await getYoutubeVideoInfo(id);
    await addToAssetPlaylist({
      apiKey,
      assetId,
      urlSlug,
      globalDispatch,
      videoInfo,
    });
    // Get updated data object
    const dataObject = await getDataObject({ assetId, urlSlug, apiKey });
    setDataObject(dataObject);

    setSearchVal("");
    setSearching(false);
  };

  return (
    <Grid item>
      <Paper sx={{ p: 2 }}>
        <Grid alignItems="center" container>
          <Grid item xs={12}>
            <Typography variant="h4">Playlist</Typography>
          </Grid>
          <Grid alignItems="center" container justifyContent="start">
            <Grid item xs={2}>
              <Controlz assetId={assetId} dataObject={dataObject} />
            </Grid>
            <Grid item xs={10}>
              <Search
                buttonText="Add"
                label="Enter YouTube Link to Add to End of Playlist"
                onChange={setSearchVal}
                runSearch={addVideo}
                searching={searching}
                searchVal={searchVal}
              ></Search>
            </Grid>

            {CreateVideoTracks()}
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  );
}
