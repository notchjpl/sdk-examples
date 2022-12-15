import React from "react";
import { Route, Routes, useSearchParams } from "react-router-dom";
import "./App.css";
import { Jukebox, LassoScatter, Leaderboard } from "./Examples";
import { Header } from "./Header";

function App() {
  const [apiKey, setApiKey] = React.useState("");

  const [searchParams, setSearchParams] = useSearchParams();
  let playerId = searchParams.get("playerId"); // Test to see if coming from embedded iframe
  let key = searchParams.get("apikey");
  if (key) setApiKey(apiKey);

  return (
    <div className="App-container">
      {!playerId && <Header apiKey={apiKey} setApiKey={setApiKey} />}
      <Routes>
        <Route exact path="/" element={<LassoScatter apiKey={apiKey} />} />
        <Route path="/jukebox" element={<Jukebox apiKey={apiKey} />} />
        <Route
          path="/lassoscatter"
          element={<LassoScatter apiKey={apiKey} />}
        />
        <Route path="/leaderboard" element={<Leaderboard apiKey={apiKey} />} />
      </Routes>
    </div>
  );
}

export default App;
