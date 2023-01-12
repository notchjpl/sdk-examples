import React from "react";
import PropTypes from "prop-types";

// components
import { Grid } from "@mui/material";
import {
  Pause,
  PlayArrow,
  Replay,
  SkipNext,
  SkipPrevious,
  VolumeUp,
} from "@mui/icons-material";

// styles
import useStyles from "./styles";

export function Controls({
  // artistName,
  controlRef,
  // currentTime,
  // duration,
  onPlayPause,
  onReplay,
  playing,
  // title,
}) {
  const classes = useStyles();

  // TODO: work in progress. need to establish what controls and information we want to display
  // return (
  //   <Grid
  //     alignItems="flex-end"
  //     className={classes.controls}
  //     container
  //     direction="column"
  //     justifyContent="space-between"
  //     ref={controlRef}
  //   >
  //     <Grid item>
  //       <Typography color="white" variant="h4">
  //         {title}
  //       </Typography>
  //     </Grid>
  //     <Grid container justifyContent="space-between" p={2}>
  //       <Grid item>
  //         <Replay onClick={onReplay} sx={{ color: "white" }} />
  //       </Grid>
  //       <Grid item>
  //         <Typography color="white">{artistName}</Typography>
  //       </Grid>
  //       <Grid item>
  //         <VolumeUp sx={{ color: "white" }} />
  //       </Grid>
  //     </Grid>
  //     {/* <Grid className={classes.progress} item>
  //       <div
  //         className={classes.played}
  //         style={{ width: currentTime / duration }}
  //       >
  //         <div className={classes.circle}></div>
  //       </div>
  //     </Grid> */}
  //     <Grid container justifyContent="space-between" p={2}>
  //       <Grid item>
  //         <SkipPrevious sx={{ color: "white" }} />
  //       </Grid>
  //       <Grid item>
  //         {playing ? (
  //           <Pause onClick={onPlayPause} sx={{ color: "white" }} />
  //         ) : (
  //           <PlayArrow onClick={onPlayPause} sx={{ color: "white" }} />
  //         )}
  //       </Grid>
  //       <Grid item>
  //         <SkipNext sx={{ color: "white" }} />
  //       </Grid>
  //     </Grid>
  //   </Grid>
  // );

  return (
    <Grid
      alignItems="center"
      className={classes.controls}
      container
      direction="row"
      justifyContent="space-between"
      p={4}
      ref={controlRef}
    >
      <Grid item>
        <Replay onClick={onReplay} sx={{ color: "white" }} />
      </Grid>
      <Grid item>
        <Grid
          alignItems="center"
          container
          justifyContent="space-between"
          p={2}
        >
          <Grid item>
            <SkipPrevious sx={{ color: "white" }} />
          </Grid>
          <Grid item p={2}>
            {playing ? (
              <Pause
                fontSize="large"
                onClick={onPlayPause}
                sx={{ color: "white" }}
              />
            ) : (
              <PlayArrow
                fontSize="large"
                onClick={onPlayPause}
                sx={{ color: "white" }}
              />
            )}
          </Grid>
          <Grid item>
            <SkipNext sx={{ color: "white" }} />
          </Grid>
        </Grid>
      </Grid>
      <Grid item>
        <VolumeUp sx={{ color: "white" }} />
      </Grid>
    </Grid>
  );
}

Controls.propTypes = {
  // artistName: PropTypes.string,
  controlRef: PropTypes.object,
  // currentTime: PropTypes.string,
  // duration: PropTypes.string,
  onPlayPause: PropTypes.func,
  onReplay: PropTypes.func,
  playing: PropTypes.bool,
  // title: PropTypes.string,
};

export default Controls;
