// https://github.com/lalwanivikas/jukebox
// https://github.com/CookPete/react-player

// Controls: audio only or video?
// Volume
// Shuffle
// Add a server listener for 'pause' and 'play'
// Add a server listener for 'pause'.  Update data object with current track time.
// https://sdk-examples.metaversecloud.com/jukebox?urlSlug=jukebox-demo-s9zdortms&playerId=1&assetId=-NJN9E9YVXSgR5yxaKG3&apiKey=4885c9eb-88ec-4792-a13f-fdb74fbf56a9

// Make playlist draggable https://codesandbox.io/s/draggable-material-ui-oj3wz?

// Add a 'teleport to asset' button that portal teleports you to the selected asset
// Enable youtube playlists to work
// Should be able to specify with a query parameter whether you want visitors to be able to add and remove from playlist or just select songs.

// IN WORLD
// Should have action buttons
// List 10 songs from the playlist and user can click one to play it.  Or click 'next' to show the next 10 songs from the playlist.
// Similar to leaderboard updating

import React from "react";
import { useGlobalState } from "@context";
import { useSearchParams } from "react-router-dom";

// components
import { Grid, ToggleButton, ToggleButtonGroup } from "@mui/material";
import { Playlist, UniqueAssetTable, YouTubeSearch } from "@components";

export function Jukebox() {
  const [asset, setAsset] = React.useState({});
  const [toggle, setToggle] = React.useState("playlist");
  const [searchParams] = useSearchParams();

  const globalState = useGlobalState();
  let assetId = searchParams.get("assetId") || globalState.assetId;

  const displayContent = () => {
    if (toggle === "search")
      return (
        <Grid item>
          <YouTubeSearch assetId={assetId || asset.id} />
        </Grid>
      );
    else
      return (
        <Grid item>
          <Playlist assetId={assetId || asset.id} />
        </Grid>
      );
  };

  return (
    <Grid
      container
      direction="column"
      justifyContent="space-around"
      p={1}
      spacing={2}
    >
      <Grid item>
        <UniqueAssetTable handleChangeAsset={setAsset} />
      </Grid>

      {(assetId || asset.id) && (
        <Grid container direction="column" p={2} spacing={2}>
          <Grid alignSelf="center" item xs={12}>
            <ToggleButtonGroup
              aria-label="Playlist vs Search"
              color="primary"
              exclusive
              onChange={(e) => setToggle(e.target.value)}
              value={toggle}
            >
              <ToggleButton value="playlist">Playlist</ToggleButton>
              <ToggleButton value="search">YouTube Search</ToggleButton>
            </ToggleButtonGroup>
          </Grid>
          {displayContent()}
        </Grid>
      )}
    </Grid>
  );
}
