import React from "react";
import { makeStyles, useTheme } from "@mui/styles";

// styles
const useStyles = makeStyles((theme) => ({
  dotBase: {
    width: 8,
    height: 8,
    backgroundColor: theme.palette.text.hint,
    borderRadius: "50%",
    transition: theme.transitions.create("background-color"),
  },
  dotSmall: {
    width: 5,
    height: 5,
  },
  dotLarge: {
    width: 11,
    height: 11,
  },
}));

export default function Dot({ size, color }) {
  const classes = useStyles();
  const theme = useTheme();

  return (
    <div
      className={classes.dotLarge}
      style={{
        backgroundColor:
          color && theme.palette[color] && theme.palette[color].main,
      }}
    />
  );
}
