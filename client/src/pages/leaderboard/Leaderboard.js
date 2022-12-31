import React from "react";

// components
import { Button, Grid } from "@mui/material";

// context
import {
  setMessage,
  useGlobalDispatch,
  useGlobalState,
} from "../../context/GlobalContext";

export function Leaderboard() {
  // context
  const globalDispatch = useGlobalDispatch();
  const { selectedWorld } = useGlobalState();

  const handleFetchAssets = async () => {
    await selectedWorld
      .fetchDroppedAssets()
      .then()
      .catch((error) =>
        setMessage({
          dispatch: globalDispatch,
          message: error,
          messageType: "warning",
        })
      );
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
      <Grid item xs={8}>
        <Button onClick={handleFetchAssets} variant="contained">
          Click to fetch
        </Button>
      </Grid>
    </Grid>
  );
}
