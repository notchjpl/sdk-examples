import React from "react";
import { Grid } from "@mui/material";
// context
import { useGlobalDispatch, useGlobalState } from "@context";
import { addToAssetPlaylist, playMediaInAsset, youtubeSearch } from "@utils";
import PropTypes from "prop-types";
import { Search } from "../Search/index";
import { VideoTrack } from ".";

YouTubeSearch.propTypes = {
  assetId: PropTypes.string,
};

export function YouTubeSearch({ assetId }) {
  const [searchVal, setSearchVal] = React.useState("");
  const [searchResults, setSearchResults] = React.useState([]);

  // context
  const globalDispatch = useGlobalDispatch();
  const globalState = useGlobalState();

  const urlSlug = globalState.urlSlug;
  const apiKey = localStorage.getItem("apiKey");

  const runSearch = async () => {
    const result = await youtubeSearch(searchVal);
    setSearchResults(result.items);
  };

  return (
    <Grid container>
      <Search
        onChange={setSearchVal}
        runSearch={runSearch}
        searchVal={searchVal}
      ></Search>
      {searchResults.map((item) => (
        <VideoTrack
          addToPlaylist={() =>
            addToAssetPlaylist({
              apiKey,
              assetId,
              urlSlug,
              globalDispatch,
              videoInfo: item,
            })
          }
          key={item.id.videoId}
          play={() =>
            playMediaInAsset({
              apiKey,
              assetId,
              videoId: item.id.videoId,
              urlSlug,
              globalDispatch,
            })
          }
          videoInfo={item.snippet}
          youtubeId={item.id.videoId}
        />
      ))}
    </Grid>
  );
}
