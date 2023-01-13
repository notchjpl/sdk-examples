import React from "react";
import { Button, Grid, TextField } from "@mui/material";
import PropTypes from "prop-types";

Search.propTypes = {
  label: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  runSearch: PropTypes.func.isRequired,
  searchVal: PropTypes.string.isRequired,
  searching: PropTypes.bool.isRequired,
};

export function Search({ label, onChange, runSearch, searchVal, searching }) {
  const handleKeyDown = (e) => {
    if (e.keyCode === 13 && !searching) {
      e.target.blur();
      runSearch();
    }
  };

  return (
    <Grid container justifyContent="center" pb={2}>
      <Grid item lg={8} md={5} sm={5}>
        <TextField
          fullWidth
          id="outlined-basic"
          label={label || "Search"}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          value={searchVal}
          variant="outlined"
        />
      </Grid>
      <Grid item lg={1} md={1} sm={2}>
        <Button
          disabled={searching}
          onClick={runSearch}
          sx={{ height: "100%" }}
          variant="contained"
        >
          Search
        </Button>
      </Grid>
    </Grid>
  );
}
