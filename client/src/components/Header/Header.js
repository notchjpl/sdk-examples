import React, { useEffect, useState } from "react";

// styles
import { styled, useTheme } from "@mui/system";

// components
import {
  AppBar,
  Button,
  Grid,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";

// context
import {
  fetchUser,
  fetchWorld,
  useGlobalDispatch,
  useGlobalState,
  useUserDispatch,
  useUserState,
} from "@context";

const StyledTextField = styled(TextField)(({ theme }) => {
  return {
    width: "100%",
    "& .MuiFormLabel-root": {
      color: "white",
      top: -6,
    },
    "& .MuiInputLabel-shrink": {
      backgroundColor: `${theme.palette.secondary.main} !important`,
      top: 0,
      paddingLeft: theme.spacing(1),
      paddingRight: theme.spacing(1),
    },
    "& input": {
      backgroundColor: `${theme.palette.secondary.main} !important`,
      border: "1px solid rgba(200,200,200,0.8)",
      borderRadius: 4,
      color: "white",
      padding: 8,
    },
  };
});

export function Header() {
  const { urlSlug: contextUrlSlug } = useGlobalState();
  const { user } = useUserState();

  const [apiKey, setApiKey] = useState(localStorage.getItem("apiKey") || "");
  const [urlSlug, setUrlSlug] = useState(contextUrlSlug);
  const theme = useTheme();

  // context
  const globalDispatch = useGlobalDispatch();
  const userDispatch = useUserDispatch();

  useEffect(() => {
    if (apiKey && !user) {
      fetchUser(apiKey, userDispatch);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleUpdateContext = async () => {
    await fetchUser(apiKey, userDispatch);
    if (urlSlug) fetchWorld({ apiKey, dispatch: globalDispatch, urlSlug });
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        zIndex: 2000,
        backgroundColor: `${theme.palette.secondary.main} !important`,
      }}
    >
      <Toolbar sx={{ padding: theme.spacing(1) }}>
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
                <StyledTextField
                  id="apiKeyInput"
                  label="API Key"
                  onChange={(event) => {
                    event.preventDefault();
                    setApiKey(event.target.value);
                  }}
                  sx={{ width: 320 }}
                  theme={theme}
                  value={apiKey}
                />
              </Grid>
              <Grid item>
                <StyledTextField
                  disabled={!apiKey}
                  id="urlSlugInput"
                  label="URL Slug"
                  onChange={(event) => {
                    console.log(event.target.value, urlSlug);
                    event.preventDefault();
                    setUrlSlug(event.target.value);
                  }}
                  theme={theme}
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
