import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";

import { ThemeProvider } from "@mui/styles";
import { CssBaseline } from "@mui/material";
import Themes from "./themes";

// components
import { App } from "./components/App";

// context
import { GlobalProvider } from "./context/GlobalContext";
import { LayoutProvider } from "./context/LayoutContext";
import { UserProvider } from "./context/UserContext";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <GlobalProvider>
    <LayoutProvider>
      <UserProvider>
        <ThemeProvider theme={Themes.default}>
          <CssBaseline />
          <Router>
            <App />
          </Router>
        </ThemeProvider>
      </UserProvider>
    </LayoutProvider>
  </GlobalProvider>
);
