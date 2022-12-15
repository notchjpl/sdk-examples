import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import { Jukebox, LassoScatter, Leaderboard } from "./Examples";
import { Header } from "./Header";

function App() {
  const [apiKey, setApiKey] = React.useState("");

  return (
    <Router>
      <div className="App-container">
        <Header apiKey={apiKey} setApiKey={setApiKey} />
        <Routes>
          <Route exact path="/" element={<LassoScatter apiKey={apiKey} />} />
          <Route path="/jukebox" element={<Jukebox apiKey={apiKey} />} />
          <Route
            path="/lassoscatter"
            element={<LassoScatter apiKey={apiKey} />}
          />
          <Route
            path="/leaderboard"
            element={<Leaderboard apiKey={apiKey} />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
