import React, { useEffect, useState } from "react";

// components
import {
  AppBar,
  Button,
  Grid,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";

// styles
import useStyles from "./styles";

// context
import {
  fetchUser,
  fetchWorld,
  useGlobalDispatch,
  useGlobalState,
  useUserDispatch,
  useUserState,
} from "@context";

export function Header() {
  const classes = useStyles();
  const [apiKey, setApiKey] = useState(localStorage.getItem("apiKey") || "");
  const [urlSlug, setUrlSlug] = useState("");

  // context
  const globalDispatch = useGlobalDispatch();
  const userDispatch = useUserDispatch();
  const { user } = useUserState();
  const globalState = useGlobalState();

  useEffect(() => {
    if (apiKey && !user) {
      fetchUser(apiKey, userDispatch);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setUrlSlug(globalState.urlSlug || "");
  }, [globalState.urlSlug]);

  // useEffect(() => {
  //   if (apiKey && urlSlug) {
  //     // TODO: This is causing issues where fetching world on every key stroke in text field
  //     fetchWorld({ apiKey, dispatch: globalDispatch, urlSlug });
  //   }
  // }, [apiKey, globalDispatch, urlSlug]);

  const handleUpdateContext = async () => {
    await fetchUser(apiKey, userDispatch);
    if (urlSlug) fetchWorld({ apiKey, dispatch: globalDispatch, urlSlug });
  };

  return (
    <AppBar className={classes.appBar} position="fixed">
      <Toolbar className={classes.toolbar}>
        <Grid
          alignItems="center"
          container
          direction="row"
          justifyContent="space-between"
        >
          <Grid item>
            <Grid alignItems="center" container spacing={4}>
              <Grid item>
                <Typography variant="h6">Realtime SDK Demo</Typography>
              </Grid>
            </Grid>
          </Grid>

          <Grid item>
            <Grid alignItems="center" container spacing={2}>
              <Grid item>
                <TextField
                  className={classes.inputField}
                  id="apiKeyInput"
                  label="API Key"
                  onChange={(event) => setApiKey(event.target.value)}
                  sx={{ width: 320 }}
                  value={apiKey}
                />
              </Grid>
              <Grid item>
                <TextField
                  className={classes.inputField}
                  disabled={!apiKey}
                  id="urlSlugInput"
                  label="URL Slug"
                  onChange={(event) => setUrlSlug(event.target.value)}
                  value={urlSlug}
                />
              </Grid>
              <Grid item>
                <Button
                  onClick={handleUpdateContext}
                  style={{ color: "white", borderColor: "white" }}
                  variant="outlined"
                >
                  Update
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
