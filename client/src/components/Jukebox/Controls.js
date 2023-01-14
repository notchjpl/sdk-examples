import React from "react";
import PropTypes from "prop-types";

// components
import { Grid, Tooltip } from "@mui/material";
import {
  Shuffle,
  ShuffleOn,
  SkipNext,
  VolumeDown,
  VolumeUp,
} from "@mui/icons-material";

import { useGlobalDispatch, useGlobalState } from "@context";
import { playlistNext, shufflePlaylist, volumeDown, volumeUp } from "@utils";

Controls.propTypes = {
  assetId: PropTypes.string,
  dataObject: PropTypes.object,
  updateDataObject: PropTypes.func,
};

export function Controls({ assetId, dataObject, updateDataObject }) {
  const globalDispatch = useGlobalDispatch();
  const globalState = useGlobalState();

  const urlSlug = globalState.urlSlug;
  const apiKey = localStorage.getItem("apiKey");

  const sendEveryReq = {
    apiKey,
    assetId,
    globalDispatch,
    urlSlug,
  };

  const next = async () => {
    await playlistNext(sendEveryReq);
    updateDataObject();
  };

  const shuffle = async (toggle) => {
    // Want to update shuffle button state
    await shufflePlaylist({ ...sendEveryReq, toggle });
    updateDataObject();
  };

  const ShuffleComponent = () => {
    if (dataObject?.playlistShuffle)
      return (
        <Tooltip placement="top" title="Stop Shuffle">
          <ShuffleOn
            onClick={() => shuffle(false)}
            sx={{ color: "black", "&:hover": { cursor: "pointer" } }}
          />
        </Tooltip>
      );
    else
      return (
        <Tooltip placement="top" title="Shuffle">
          <Shuffle
            onClick={() => shuffle(true)}
            sx={{ color: "black", "&:hover": { cursor: "pointer" } }}
          />
        </Tooltip>
      );
  };

  return (
    <Grid container justifyContent="start" sx={{ flexWrap: "nowrap" }}>
      <Grid container direction="column" xs={3}>
        <ShuffleComponent />
        <Grid container>
          <Tooltip title="Seek Next">
            <SkipNext
              onClick={next}
              sx={{ color: "black", "&:hover": { cursor: "pointer" } }}
            />
          </Tooltip>
        </Grid>
      </Grid>
      <Grid container direction="column">
        <Tooltip placement="top" title="Increase Volume">
          <VolumeUp
            onClick={() => volumeUp(sendEveryReq)}
            sx={{ color: "black", "&:hover": { cursor: "pointer" } }}
          />
        </Tooltip>
        <Tooltip placement="bottom" title="Decrease Volume">
          <VolumeDown
            onClick={() => volumeDown(sendEveryReq)}
            sx={{ color: "black", "&:hover": { cursor: "pointer" } }}
          />
        </Tooltip>
      </Grid>
    </Grid>
  );
}
