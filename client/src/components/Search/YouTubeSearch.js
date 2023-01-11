import React from "react";
import { Grid } from "@mui/material";
import { youtubeSearch } from "@utils";
// import PropTypes from "prop-types";
import { Search } from "./index";

// YouTubeSearch.propTypes = {};

export function YouTubeSearch() {
  const [searchVal, setSearchVal] = React.useState("");

  const runSearch = () => {
    const result = youtubeSearch(searchVal);
    console.log(result);
    return result;
  };

  return (
    <Grid container>
      <Search
        onChange={setSearchVal}
        runSearch={runSearch}
        searchVal={searchVal}
      ></Search>
    </Grid>
  );
}
