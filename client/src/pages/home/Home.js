import React from "react";

// components
import { Grid, Typography } from "@mui/material";
import { WorldsTable } from "@components";

// context
import { fetchWorld, setMessage, useGlobalDispatch } from "@context";

export function Home() {
  const apiKey = localStorage.getItem("apiKey");

  // context
  const globalDispatch = useGlobalDispatch();

  const handleSelectWorld = async (urlSlug) => {
    await fetchWorld({ apiKey, dispatch: globalDispatch, urlSlug })
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

  if (!apiKey) {
    return (
      <Grid container justifyContent="space-around">
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
      <Grid container justifyContent="space-around">
        <Grid item xs>
          <WorldsTable handleSelectWorld={handleSelectWorld} />
        </Grid>
      </Grid>
    </>
  );
}
