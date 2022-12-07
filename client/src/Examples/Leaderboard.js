import React from "react";
import { publicAPI } from "../utils/publicAPI";
import { Button, Grid, TextField } from "@mui/material";

export function Leaderboard({ apiKey }) {
  const [urlSlug, setUrlSlug] = React.useState(null);

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
    <Grid
      container
      spacing={2}
      justifyContent="space-between"
      alignItems="center"
      direction="column"
      style={{ minHeight: "40vh" }}
    >
      <Grid container direction="row" justifyContent="center" spacing={3}>
        <Grid item>
          <TextField
            id="urlSlugInput"
            label="Add URL Slug"
            variant="standard"
            onChange={(event) => setUrlSlug(event.target.value)}
          />
        </Grid>
      </Grid>

      <Grid item xs={8}>
        <Button onClick={fetchAssets} variant="contained">
          Click to fetch
        </Button>
      </Grid>
    </Grid>
  );
}
