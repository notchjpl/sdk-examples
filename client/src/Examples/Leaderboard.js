import React from "react";
import { publicAPI } from "../utils/publicAPI";
import { Button, Grid, TextField } from "@mui/material";

export function Leaderboard() {
  const [urlSlug, setUrlSlug] = React.useState(null);
  const [apiKey, setApiKey] = React.useState(null);

  React.useEffect(() => {
    //   publicAPI(apiKey)
    //   .get(`/assets/my-assets?email=${this.email}`)
    //   .then((res) => res.json())
    //   .then((data) => {
    //     console.log(data)
    //     setData("HI!");
    // })
  }, []);

  const fetchAssets = () => {
    publicAPI(apiKey)
      .get(`/world/${urlSlug}/assets`)
      // .then((res) => res.json())
      .then((data) => {
        console.log(data);
        // setData("HI!");
      });
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={8}>
        <TextField
          id="urlSlugInput"
          label="Add URL Slug"
          variant="standard"
          onChange={(event) => setUrlSlug(event.target.value)}
        />
      </Grid>
      <Grid item xs={8}>
        <TextField
          id="apiKeyInput"
          label="Add API Key"
          variant="standard"
          onChange={(event) => setApiKey(event.target.value)}
        />
      </Grid>
      <Grid item xs={8}>
        <Button onClick={fetchAssets} variant="contained">
          Click to fetch
        </Button>
      </Grid>
    </Grid>
  );
}
