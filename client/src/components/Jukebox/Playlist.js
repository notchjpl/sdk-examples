// Should be able to add video to end of playlist by pasting in a youtube link

import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useGlobalDispatch, useGlobalState } from "@context";

// components
import { Grid, Paper, Tooltip, Typography } from "@mui/material";

import { AddBox, Remove } from "@mui/icons-material";
import { Search } from "@components";
import { Controls, PlaylistTracksWrapper } from "./";

// utils
import {
  addPlaylistToWorld,
  addToAssetPlaylist,
  getDataObject,
  getYoutubeVideoInfo,
  removeFromAssetPlaylist,
  removePlaylistFromWorld,
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
  const { isInteractiveIframe, urlSlug } = useGlobalState();

  const apiKey = localStorage.getItem("apiKey");

  useEffect(() => {
    const fetchDataObject = async () => {
      const dataObject = await getDataObject({ assetId, urlSlug, apiKey });
      setDataObject(dataObject);
    };
    fetchDataObject();
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

  const youTubeParser = (url) => {
    var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
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
    await updateDataObject();

    setSearchVal("");
    setSearching(false);
  };

  const updateDataObject = async () => {
    const dataObject = await getDataObject({ assetId, urlSlug, apiKey });
    setDataObject(dataObject);
    return;
  };

  return (
    <Grid item>
      <Paper sx={{ p: 2 }}>
        <Grid alignItems="center" container>
          <Grid item xs={11}>
            <Typography variant="h4">Playlist</Typography>
          </Grid>
          {!isInteractiveIframe && (
            <Grid item xs={1}>
              <Tooltip title="Add Controls to World">
                <AddBox
                  onClick={() =>
                    addPlaylistToWorld({
                      apiKey,
                      assetId,
                      globalDispatch,
                      urlSlug,
                    })
                  }
                  sx={{ "&:hover": { cursor: "pointer" } }}
                />
              </Tooltip>
              <Tooltip title="Remove Playlist Controls from World">
                <Remove
                  onClick={() =>
                    removePlaylistFromWorld({
                      apiKey,
                      assetId,
                      globalDispatch,
                      urlSlug,
                    })
                  }
                  sx={{ "&:hover": { cursor: "pointer" } }}
                />
              </Tooltip>
            </Grid>
          )}
          <Grid alignItems="center" container justifyContent="start">
            <Grid item xs={2}>
              <Controls
                assetId={assetId}
                dataObject={dataObject}
                updateDataObject={updateDataObject}
              />
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

            <PlaylistTracksWrapper
              assetId={assetId}
              dataObject={dataObject}
              handleRemoveFromPlaylist={handleRemoveFromPlaylist}
            />
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  );
}
