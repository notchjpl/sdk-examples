// https://github.com/lalwanivikas/jukebox
// https://github.com/CookPete/react-player

// Controls: audio only or video?
// Volume
// Radius
// Add YouTube search https://developers.google.com/youtube/v3/docs
// https://github.com/mattwright324/youtube-metadata/blob/master/js/youtube-api-v3.js
// Add a server listener for 'next track' and 'previous track'
// Add a server listener for 'pause' and 'play'
// Add a server listener for 'pause'.  Update data object with current track time.

import React from "react";
import ReactPlayer from "react-player/lazy";
import { useSearchParams } from "react-router-dom";
import { Button, Grid, Paper } from "@mui/material";
import { EXAMPLE_VIDEOS } from "./youtubeSamples";
import { selectVideo } from "../utils/jukebox";
import { SelectUniqueAsset } from "../Components";

function randInt(max) {
  return Math.floor(Math.random() * max);
}

export function Jukebox({ apiKey }) {
  const playerRef = React.useRef(null);
  const [urlSlug, setUrlSlug] = React.useState(null);
  const [asset, setAsset] = React.useState({});
  const [searchParams, setSearchParams] = useSearchParams();
  const urlSlugParam = searchParams.get("urlSlug");
  let assetId = searchParams.get("assetId");
  const playerId = searchParams.get("playerId");
  if (urlSlugParam) setUrlSlug(urlSlugParam);
  // if (assetIdParam) setUrlSlug(assetIdParam)
  if (!playerId) {
    // Meaning not coming from iframe
    assetId = asset.id;
  }

  const renderRow = (id) => {
    return (
      <Paper variant="outlined" elevation={3} key={id} style={{ width: 220 }}>
        <Grid
          container
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Grid item xs={4}>
            <ReactPlayer
              muted={true}
              light
              height={75}
              width={100}
              controls={false}
              playsinline={true}
              ref={playerRef}
              onReady={(item) => item.getInternalPlayer().playVideo()}
              config={{
                youtube: {
                  playerVars: {
                    modestbranding: 1,
                    controls: 0,
                  },
                },
              }}
              url={`https://www.youtube.com/watch?v=${id}`}
            />
          </Grid>
          <Grid item xs={4}>
            <Button onClick={() => selectVideo()} variant="contained">
              Play
            </Button>
          </Grid>
        </Grid>
      </Paper>
    );
  };

  const calcVideos = () => {
    const min = randInt(EXAMPLE_VIDEOS.length - 20);
    return EXAMPLE_VIDEOS.slice(min, min + 20).map((id) => renderRow(id));
  };
  return (
    <div>
      {!playerId && (
        <SelectUniqueAsset
          apiKey={apiKey}
          asset={asset}
          setUrlSlug={setUrlSlug}
          handleChangeAsset={setAsset}
          urlSlug={urlSlug}
        />
      )}
      <Grid container direction="column" spacing={2} alignItems="center">
        {calcVideos()}
      </Grid>
    </div>
  );
}
