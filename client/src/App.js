import React from "react";
import { Route, Routes, useSearchParams } from "react-router-dom";
import "./App.css";
import { Jukebox, LassoScatter, Leaderboard, ReplaceScene } from "./Examples";
import { Header } from "./Header";
import { World } from "@rtsdk/topia";
import { Alert, Snackbar } from "@mui/material";

function App() {
  const [apiKey, setApiKey] = React.useState("");
  const [urlSlug, setUrlSlug] = React.useState("");
  const [selectedWorld, setSelectedWorld] = React.useState();
  const [message, setMessage] = React.useState("");
  const [messageType, setMessageType] = React.useState("error");
  const [hasMessage, setHasMessage] = React.useState(false);

  const [searchParams, setSearchParams] = useSearchParams();
  let playerId = searchParams.get("playerId"); // Test to see if coming from embedded iframe
  // let key = searchParams.get("apikey");
  // if (key) setApiKey(apiKey);

  const key = apiKey || searchParams.get("apiKey");

  const handleOpenSnackbar = () => {
    setHasMessage(true);
  };

  const handleCloseSnackbar = () => {
    setHasMessage(false);
  };

  const fetchWorld = async () => {
    if (!urlSlug) return;
    const selectedWorld = await new World({ apiKey, urlSlug });
    await selectedWorld
      .fetchDetails()
      .then(() => {
        setSelectedWorld(selectedWorld);
        setMessage("World found!");
        setMessageType("success");
        handleOpenSnackbar();
      })
      .catch((error) => {
        setMessage(error);
        setMessageType("error");
        handleOpenSnackbar();
      });
  };

  return (
    <div className="App-container">
      {!playerId && (
        <Header
          apiKey={apiKey}
          fetchWorld={fetchWorld}
          setApiKey={setApiKey}
          setUrlSlug={setUrlSlug}
          urlSlug={urlSlug}
        />
      )}
      <Routes>
        <Route
          exact
          path="/"
          element={
            <LassoScatter
              selectedWorld={selectedWorld}
              setHasMessage={setHasMessage}
              setMessage={setMessage}
              setMessageType={setMessageType}
            />
          }
        />
        <Route path="/jukebox" element={<Jukebox apiKey={key} />} />
        <Route
          path="/lassoscatter"
          element={
            <LassoScatter
              selectedWorld={selectedWorld}
              setHasMessage={setHasMessage}
              setMessage={setMessage}
              setMessageType={setMessageType}
            />
          }
        />
        <Route path="/leaderboard" element={<Leaderboard apiKey={key} />} />
        <Route
          path="/replace-scene"
          element={
            <ReplaceScene
              apiKey={key}
              selectedWorld={selectedWorld}
              setHasMessage={setHasMessage}
              setMessage={setMessage}
              setMessageType={setMessageType}
            />
          }
        />
      </Routes>
      <Snackbar
        open={hasMessage}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={messageType}
          sx={{ width: "100%" }}
        >
          {/* TODO: Get dynamic messages to work, currently throwing error */}
          {/* {message} */}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default App;
