import React from "react";

// components
import { Grid } from "@mui/material";
import { ScenesTable } from "@components";

// context
import { setMessage, useGlobalDispatch, useGlobalState } from "@context";

export function ReplaceScene() {
  // context
  const globalDispatch = useGlobalDispatch();
  const { selectedWorld } = useGlobalState();

  const handleReplaceScene = async (sceneId) => {
    await selectedWorld
      .replaceScene(sceneId)
      .then(() => {
        setMessage({
          dispatch: globalDispatch,
          message: "Success!",
          messageType: "success",
        });
      })
      .catch((error) =>
        setMessage({
          dispatch: globalDispatch,
          message: error,
          messageType: "error",
        })
      );
  };

  return (
    <>
      <Grid container justifyContent="space-around">
        <Grid item xs>
          <ScenesTable handleReplaceScene={handleReplaceScene} />
        </Grid>
      </Grid>
    </>
  );
}
