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
import { playlistNext, volumeDown, volumeUp } from "@utils";

Controlz.propTypes = {
  assetId: PropTypes.object,
  dataObject: PropTypes.object,
};

export function Controlz({ assetId, dataObject }) {
  const globalDispatch = useGlobalDispatch();
  const globalState = useGlobalState();

  const urlSlug = globalState.urlSlug;
  const apiKey = localStorage.getItem("apiKey");

  const shufflePlaylist = (toggle) => {
    console.log(toggle);
  };

  const ShuffleComponent = () => {
    if (dataObject.playlistShuffle)
      return (
        <Tooltip placement="top" title="Stop Shuffle">
          <ShuffleOn
            onClick={() => shufflePlaylist(false)}
            sx={{ color: "black", "&:hover": { cursor: "pointer" } }}
          />
        </Tooltip>
      );
    else
      return (
        <Tooltip placement="top" title="Shuffle">
          <Shuffle
            onClick={() => shufflePlaylist(true)}
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
              onClick={() =>
                playlistNext({ apiKey, assetId, globalDispatch, urlSlug })
              }
              sx={{ color: "black", "&:hover": { cursor: "pointer" } }}
            />
          </Tooltip>
        </Grid>
      </Grid>
      <Grid container direction="column">
        <Tooltip placement="top" title="Increase Volume">
          <VolumeUp
            onClick={() =>
              volumeUp({ apiKey, assetId, globalDispatch, urlSlug })
            }
            sx={{ color: "black", "&:hover": { cursor: "pointer" } }}
          />
        </Tooltip>
        <Tooltip placement="bottom" title="Decrease Volume">
          <VolumeDown
            onClick={() =>
              volumeDown({ apiKey, assetId, globalDispatch, urlSlug })
            }
            sx={{ color: "black", "&:hover": { cursor: "pointer" } }}
          />
        </Tooltip>
      </Grid>
    </Grid>
  );
}
