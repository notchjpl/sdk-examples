import React from "react";
import PropTypes from "prop-types";

// components
import { Grid, Typography } from "@mui/material";
import { Equalizer, PlayArrow } from "@mui/icons-material";

// styles
import useStyles from "./styles";

VideoTrack.propTypes = {
  play: PropTypes.func,
  videoInfo: PropTypes.object,
  youtubeId: PropTypes.string,
};

export function VideoTrack({ youtubeId, play, videoInfo }) {
  const classes = useStyles();
  const playing = false; // TODO Add equalizer to whatever is currently playing

  console.log(videoInfo);
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
      <Grid item xs={8}>
        <Grid alignItems="center" container direction="row" p={2}>
          <Grid className={classes.thumbnail} item>
            <img
              alt="thumbnail"
              src={`https://i.ytimg.com/vi/${youtubeId}/default.jpg`}
            />
          </Grid>
          <Grid item pl={2} pr={2} xs={8}>
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
      <Grid alignSelf="right" item p={2}>
        {playing ? (
          <Equalizer className={classes.active} />
        ) : (
          <PlayArrow onClick={play} sx={{ color: "white" }} />
        )}
      </Grid>
    </Grid>
  );
}
