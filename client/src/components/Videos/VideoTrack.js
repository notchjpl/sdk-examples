import React from "react";
import ReactPlayer from "react-player/lazy";
import { Button, Grid, Paper } from "@mui/material";

export function VideoTrack(mediaLink, playMedia) {
  return (
    <Paper
      elevation={3}
      key={mediaLink}
      style={{
        width: 220,
        margin: 5,
        height: "80px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        borderBottom: "1px solid rgba(255 , 255, 255, 0.2)",
      }}
      variant="elevation"
    >
      <Grid
        alignItems="center"
        container
        direction="row"
        justifyContent="space-between"
      >
        <Grid item xs={4}>
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
            height={75}
            light
            muted={true}
            onReady={(item) => item.getInternalPlayer().playVideo()}
            playsinline={true}
            url={mediaLink}
            width={100}
          />
        </Grid>
        <Grid item xs={4}>
          <Button onClick={playMedia} variant="contained">
            Play
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
}
