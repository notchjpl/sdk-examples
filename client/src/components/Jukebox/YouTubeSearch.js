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
  const [searching, setSearching] = React.useState(false);
  const [searchResults, setSearchResults] = React.useState([]);

  // context
  const globalDispatch = useGlobalDispatch();
  const globalState = useGlobalState();

  const urlSlug = globalState.urlSlug;
  const apiKey = localStorage.getItem("apiKey");

  const runSearch = async () => {
    setSearching(true);
    const result = await youtubeSearch(searchVal);
    console.log(result);
    setSearchResults(result);
    setTimeout(() => setSearching(false), 1000); // Prevent over-using search due to YouTube quota.
  };

  return (
    <Grid container>
      <Search
        onChange={setSearchVal}
        runSearch={runSearch}
        searching={searching}
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
          key={item.id}
          play={() =>
            playMediaInAsset({
              apiKey,
              assetId,
              urlSlug,
              videoId: item.id,
              videoInfo: item,
              globalDispatch,
            })
          }
          videoInfo={item}
          youtubeId={item.id}
        />
      ))}
    </Grid>
  );
}
