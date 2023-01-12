import React from "react";
import { Button, Grid, TextField } from "@mui/material";
import PropTypes from "prop-types";

Search.propTypes = {
  label: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  runSearch: PropTypes.func.isRequired,
  searchVal: PropTypes.string.isRequired,
};

export function Search({ label, onChange, runSearch, searchVal }) {
  const handleKeyDown = (e) => {
    if (e.keyCode === 13) {
      e.target.blur();
      runSearch();
    }
  };

  return (
    <Grid container>
      <TextField
        id="outlined-basic"
        label={label || "Search"}
        onBlur={runSearch}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        value={searchVal}
        variant="outlined"
      />
      <Button onClick={runSearch} variant="contained">
        Search
      </Button>
    </Grid>
  );
}
