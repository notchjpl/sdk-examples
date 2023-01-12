import React from "react";
import PropTypes from "prop-types";

// components
import { Grid, Typography } from "@mui/material";
import { Equalizer, PlayArrow } from "@mui/icons-material";

// styles
import useStyles from "./styles";

export function MenuItem({ onPlayVideo, onSelectVideo, playing, youtubeId }) {
  const classes = useStyles();

  return (
    <Grid
      alignItems="center"
      className={classes.menuItem}
      container
      direction="row"
      justifyContent="space-between"
      onClick={() => onSelectVideo(youtubeId)}
    >
      <Grid item>
        <Grid alignItems="center" container direction="row" p={2}>
          <Grid className={classes.thumbnail} item>
            <img
              alt="thumbnail"
              src={`https://img.youtube.com/vi/${youtubeId}/sddefault.jpg`}
              // src="https://www.shutterstock.com/image-vector/colorful-illustration-test-word-260nw-1438324490.jpg"
            />
          </Grid>
          <Grid item pl={2} pr={2}>
            <Grid
              alignItems="stretch"
              container
              direction="column"
              justifyContent="space-between"
            >
              <Typography className={classes.title} variant="h6">
                test title
              </Typography>
              <Typography className={classes.artist}>test artist</Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid alignSelf="right" item p={2}>
        {playing ? (
          <Equalizer className={classes.active} />
        ) : (
          <PlayArrow onClick={onPlayVideo} sx={{ color: "white" }} />
        )}
      </Grid>
    </Grid>
  );
}

MenuItem.propTypes = {
  onPlayVideo: PropTypes.func,
  onSelectVideo: PropTypes.func,
  playing: PropTypes.bool,
  youtubeId: PropTypes.string,
};

export default MenuItem;
