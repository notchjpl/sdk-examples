import React from "react";
import "./App.css";
import { Leaderboard } from "./Examples";
import { Header } from "./Header";

function App() {
  const [apiKey, setApiKey] = React.useState("");
  const [example, changeExample] = React.useState("leaderboard");

  const pageSelector = () => {
    switch (example) {
      case "leaderboard":
        return <Leaderboard />;
      default:
        return <Leaderboard />;
    }
  };

  return (
    <div className="App-container">
      <Header
        apiKey={apiKey}
        setApiKey={setApiKey}
        changeExample={changeExample}
        title={example.toUpperCase()}
      />
      {pageSelector()}
    </div>
  );
}

export default App;
