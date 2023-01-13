import React from "react";
import PropTypes from "prop-types";

// components
import { Grid, Tooltip, Typography } from "@mui/material";
import { Add, Equalizer, PlayArrow, Remove } from "@mui/icons-material";

// styles
import useStyles from "./styles";

VideoTrack.propTypes = {
  addToPlaylist: PropTypes.func,
  play: PropTypes.func.isRequired,
  removeFromPlaylist: PropTypes.func,
  videoInfo: PropTypes.object,
  youtubeId: PropTypes.string.isRequired,
};

export function VideoTrack({
  addToPlaylist,
  play,
  removeFromPlaylist,
  videoInfo,
  youtubeId,
}) {
  const classes = useStyles();
  const playing = false; // TODO Add equalizer to whatever is currently playing

  let { title, channelTitle } = videoInfo || {};
  title = title || "Title";
  const subheader = channelTitle || "Artist";
  return (
    <Grid
      alignItems="center"
      className={classes.menuItem}
      container
      direction="row"
      justifyContent="space-between"
    >
      <Grid item lg={8} xs={12}>
        <Grid alignItems="center" container direction="row" p={1} pl={2} pt={2}>
          <Grid className={classes.thumbnail} item>
            <a
              href={`https://www.youtube.com/watch?v=${youtubeId}`}
              rel="noreferrer"
              target="_blank"
            >
              <img
                alt="thumbnail"
                src={`https://i.ytimg.com/vi/${youtubeId}/default.jpg`}
              />
            </a>
          </Grid>
          <Grid item md={8} pl={2} pr={2} xs={11}>
            <Grid
              alignItems="stretch"
              container
              direction="column"
              justifyContent="space-between"
            >
              <Typography className={classes.title} noWrap variant="h6">
                {title}
              </Typography>
              <Typography className={classes.artist}>{subheader}</Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid alignSelf="right" item p={1} pl={2} pr={2}>
        {playing ? (
          <Equalizer className={classes.active} />
        ) : (
          <Grid
            container
            justifyContent="space-between"
            sx={{ flexDirection: { xs: "row", lg: "column" } }}
          >
            <Grid item>
              <Tooltip placement="top" title="Play Now">
                <PlayArrow
                  onClick={play}
                  sx={{ color: "white", "&:hover": { cursor: "pointer" } }}
                />
              </Tooltip>
            </Grid>

            {addToPlaylist && (
              <Grid item>
                <Tooltip placement="bottom" title="Add to end of playlist">
                  <Add
                    onClick={addToPlaylist}
                    sx={{ color: "white", "&:hover": { cursor: "pointer" } }}
                  />
                </Tooltip>
              </Grid>
            )}
            {removeFromPlaylist && (
              <Grid item>
                <Tooltip placement="bottom" title="Remove from playlist">
                  <Remove
                    onClick={removeFromPlaylist}
                    sx={{ color: "white", "&:hover": { cursor: "pointer" } }}
                  />
                </Tooltip>
              </Grid>
            )}
          </Grid>
        )}
      </Grid>
    </Grid>
  );
}
