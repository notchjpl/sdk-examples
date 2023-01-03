import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";

import { ThemeProvider } from "@mui/styles";
import { CssBaseline } from "@mui/material";
import theme from "./themes";

// components
import { App } from "@components/App";

// context
import { GlobalProvider, UserProvider } from "./context";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <GlobalProvider>
    <UserProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <App />
        </Router>
      </ThemeProvider>
    </UserProvider>
  </GlobalProvider>
);
