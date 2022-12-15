import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import { LassoScatter, Leaderboard } from "./Examples";
import { Header } from "./Header";

function App() {
  const [apiKey, setApiKey] = React.useState("");

  // const pageSelector = () => {
  //   switch (example) {
  //     case "LassoScatter":
  //       return <LassoScatter apiKey={apiKey} />;
  //     case "leaderboard":
  //       return <Leaderboard />;
  //     default:
  //       return <Leaderboard />;
  //   }
  // };

  return (
    <Router>
      <div className="App-container">
        <Header apiKey={apiKey} setApiKey={setApiKey} />
        <Routes>
          <Route exact path="/" element={<LassoScatter apiKey={apiKey} />} />
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
