import defaultTheme from "./default";

import { createTheme } from "@mui/material/styles";

const overrides = {
  typography: {
    h1: {
      fontSize: "2rem",
    },
    h2: {
      fontSize: "1.8rem",
    },
    h3: {
      fontSize: "1.6rem",
    },
    h4: {
      fontSize: "1.3rem",
    },
    h5: {
      fontSize: "1.2rem",
    },
    h6: {
      fontSize: "0.8rem",
    },
  },
};

const themes = {
  default: createTheme({ ...defaultTheme, ...overrides }),
};

export default themes;
