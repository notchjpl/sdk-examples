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
  const [apiKey, setApiKey] = useState(localStorage.getItem("apiKey"));
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
    setUrlSlug(globalState.urlSlug);
  }, [globalState.urlSlug]);

  const handleUpdateContext = async () => {
    await fetchUser(apiKey, userDispatch);
    if (urlSlug) fetchWorld({ apiKey, dispatch: globalDispatch, urlSlug });
  };

  return (
    <AppBar position="fixed" className={classes.appBar}>
      <Toolbar className={classes.toolbar}>
        <Grid
          container
          alignItems="center"
          direction="row"
          justifyContent="space-between"
        >
          <Grid item>
            <Grid alignItems="center" spacing={4} container>
              <Grid item>
                <Typography variant="h6">Realtime SDK Demo</Typography>
              </Grid>
            </Grid>
          </Grid>

          <Grid item>
            <Grid container alignItems="center" spacing={2}>
              <Grid item>
                <TextField
                  id="apiKeyInput"
                  className={classes.inputInput}
                  label="API Key"
                  onChange={(event) => setApiKey(event.target.value)}
                  value={apiKey}
                  sx={{ width: 320 }}
                />
              </Grid>
              <Grid item>
                <TextField
                  id="urlSlugInput"
                  className={classes.inputInput}
                  disabled={!apiKey}
                  label="URL Slug"
                  onChange={(event) => setUrlSlug(event.target.value)}
                  value={urlSlug}
                />
              </Grid>
              <Grid item>
                <Button
                  variant="outlined"
                  onClick={handleUpdateContext}
                  style={{ color: "white", borderColor: "white" }}
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
