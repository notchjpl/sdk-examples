import React from "react";
import { Link, useLocation } from "react-router-dom";
import PropTypes from "prop-types";

// styles
import { useTheme } from "@mui/system";

// components
import {
  Divider,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";

export function SidebarLink({ icon, path, text, type }) {
  const theme = useTheme();
  const location = useLocation();
  const isLinkActive = location.pathname === path;

  if (type === "title")
    return (
      <Typography
        sc={{
          marginLeft: theme.spacing(4.5),
          marginTop: theme.spacing(2),
          marginBottom: theme.spacing(2),
        }}
      >
        {text}
      </Typography>
    );

  if (type === "divider")
    return (
      <Divider
        sx={{
          marginTop: theme.spacing(2),
          marginBottom: theme.spacing(4),
          height: 1,
          backgroundColor: "#D8D8D880",
        }}
      />
    );

  if (path.includes("http")) {
    return (
      <ListItem
        button
        disableRipple
        sx={{
          textDecoration: "none",
          "&:hover, &:focus": {
            backgroundColor: theme.palette.background.light,
          },
        }}
      >
        <Link
          href={path}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            textDecoration: "none",
          }}
        >
          <ListItemIcon>{icon}</ListItemIcon>
          <ListItemText primary={text} />
        </Link>
      </ListItem>
    );
  }

  return (
    <ListItem
      button
      component={Link}
      disableRipple
      sx={{
        textDecoration: "none",
        "&:hover, &:focus": {
          backgroundColor: theme.palette.background.light,
        },
        backgroundColor:
          isLinkActive && `${theme.palette.background.light} !important`,
      }}
      to={path}
    >
      {icon && <ListItemIcon>{icon}</ListItemIcon>}
      <ListItemText primary={text} />
    </ListItem>
  );
}

SidebarLink.propTypes = {
  icon: PropTypes.string,
  path: PropTypes.string,
  text: PropTypes.string,
  type: PropTypes.string,
};

export default SidebarLink;
