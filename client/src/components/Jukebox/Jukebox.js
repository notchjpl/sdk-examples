import React, { useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import PropTypes from "prop-types";

// components
import ReactPlayer from "react-player";
import { Grid, Typography } from "@mui/material";
import { Controls, MenuItem } from "./";

// context
import { setMessage, useGlobalDispatch, useGlobalState } from "@context";

// styles
import useStyles from "./styles";

// utils
import { backendAPI } from "@utils";
import { EXAMPLE_VIDEOS_SHORT } from "../../utils/createYouTubeSamples";

export function Jukebox({ showVideoPlayer }) {
  const classes = useStyles();
  const videoPlayerRef = useRef(null);
  const controlRef = useRef(null);

  // context
  const globalDispatch = useGlobalDispatch();
  const globalState = useGlobalState();

  const [searchParams] = useSearchParams();
  let assetId = searchParams.get("assetId") || globalState.assetId;
  const urlSlug = searchParams.get("urlSlug") || globalState.urlSlug;
  const apiKey = localStorage.getItem("apiKey");

  // TODO: remove examples
  const [selectedVideoId, setSelectedVideoId] = useState();
  const [mediaLink, setMediaLink] = useState();
  const [videoState, setVideoState] = useState({
    buffer: true,
    played: 0,
    playing: true,
  });

  //Destructuring the properties from the videoState
  const { playing, played } = videoState;

  //   const currentTime = videoPlayerRef.current
  //     ? videoPlayerRef.current.getCurrentTime()
  //     : "00:00";
  //   const duration = videoPlayerRef.current
  //     ? videoPlayerRef.current.getDuration()
  //     : "00:00";

  const playPauseHandler = () => {
    //plays and pause the video (toggling)
    setVideoState({ ...videoState, playing: !videoState.playing });
  };

  const replayHandler = () => {
    //Rewinds the video player reducing 5
    videoPlayerRef.current.seekTo(0);
  };

  //   const seekHandler = (e, value) => {
  //     setVideoState({ ...videoState, played: parseFloat(value / 100) });
  //     videoPlayerRef.current.seekTo(parseFloat(value / 100));
  //   };

  //   const seekMouseUpHandler = (e, value) => {
  //     console.log(value);

  //     setVideoState({ ...videoState, seeking: false });
  //     videoPlayerRef.current.seekTo(value / 100);
  //   };

  //   const onSeekMouseDownHandler = (e) => {
  //     setVideoState({ ...videoState, seeking: true });
  //   };

  const mouseMoveHandler = () => {
    controlRef.current.style.visibility = "visible";
  };

  const mouseOutHandler = () => {
    controlRef.current.style.visibility = "hidden";
  };

  const handleSelectVideo = async (id) => {
    const mediaLink = `https://www.youtube.com/watch?v=${id}`;
    setSelectedVideoId(id);
    setMediaLink(mediaLink);
    setVideoState({ ...videoState, playing: true });

    await backendAPI
      .post("/updatemedia", {
        apiKey,
        assetId,
        mediaLink,
        urlSlug,
      })
      .then(() => {
        setMessage({
          dispatch: globalDispatch,
          message: "Success!",
          messageType: "success",
        });
      })
      .catch((error) => {
        setMessage({
          dispatch: globalDispatch,
          message: error,
          messageType: "error",
        });
      });
  };

  return (
    <Grid className={classes.container} container>
      {showVideoPlayer && selectedVideoId ? (
        <Grid
          className={classes.playerContainer}
          item
          onMouseOut={mouseOutHandler}
          onMouseOver={mouseMoveHandler}
          xs={12}
        >
          <Controls
            controlRef={controlRef}
            //   currentTime={currentTime}
            //   duration={duration}
            // onMouseSeekDown={onSeekMouseDownHandler}
            onPlayPause={playPauseHandler}
            onReplay={replayHandler}
            // onSeek={seekHandler}
            // onSeekMouseUp={seekMouseUpHandler}
            played={played}
            playing={playing}
            selectedVideoId={selectedVideoId}
          />
          <ReactPlayer
            config={{
              youtube: {
                playerVars: {
                  modestbranding: 1,
                  controls: 0,
                },
              },
            }}
            controls={false}
            height="100%"
            playing={playing}
            ref={videoPlayerRef}
            url={mediaLink}
            width="100%"
          />
        </Grid>
      ) : (
        <Grid
          className={classes.playerContainer}
          container
          justifyContent="center"
          p={4}
        >
          <Grid item>
            <Typography color="white" variant="h3">
              Click play on any video below!
            </Typography>
          </Grid>
        </Grid>
      )}
      <Grid item xs={12}>
        {EXAMPLE_VIDEOS_SHORT.map((id) => (
          <MenuItem
            key={id}
            onSelectVideo={handleSelectVideo}
            playing={selectedVideoId === id}
            youtubeId={id}
          />
        ))}
      </Grid>
    </Grid>
  );
}

Jukebox.propTypes = {
  showVideoPlayer: PropTypes.bool,
};

export default Jukebox;
