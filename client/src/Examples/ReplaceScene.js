import React from "react";
import { Grid, Typography } from "@mui/material";
import { ScenesTable } from "../Components";

export function ReplaceScene({
  apiKey,
  setHasMessage,
  setMessage,
  setMessageType,
  selectedWorld,
}) {
  const handleReplaceScene = async (sceneId) => {
    await selectedWorld
      .replaceScene(sceneId)
      .then(() => {
        setHasMessage(true);
        setMessage("Success!");
        setMessageType("success");
      })
      .catch((error) => {
        setHasMessage(true);
        setMessage(error);
        setMessageType("error");
      });
  };

  if (!selectedWorld) {
    return (
      <Grid container p={10} justifyContent="space-around">
        <Grid item>
          <Typography variant="h5" color="black">
            Enter an API Key and Url Slug above to continue
          </Typography>
        </Grid>
      </Grid>
    );
  }

  return (
    <>
      <Grid container spacing={2} p={4} justifyContent="space-around">
        <Grid item xs>
          <ScenesTable
            apiKey={apiKey}
            handleReplaceScene={handleReplaceScene}
          />
        </Grid>
      </Grid>
    </>
  );
}
