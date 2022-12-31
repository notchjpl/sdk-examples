import React from "react";
import { Link, useLocation } from "react-router-dom";
import PropTypes from "prop-types";

// styles
import useStyles from "./styles";

// components
import {
  Divider,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";

export default function SidebarLink({ icon, path, text, type }) {
  const classes = useStyles();
  const location = useLocation();
  const isLinkActive = location.pathname === path;

  if (type === "title")
    return <Typography className={classes.sectionTitle}>{text}</Typography>;

  if (type === "divider") return <Divider className={classes.divider} />;

  if (path.includes("http")) {
    return (
      <ListItem button className={classes.link} disableRipple>
        <a className={classes.externalLink} href={path}>
          <ListItemIcon>{icon}</ListItemIcon>
          <ListItemText primary={text} />
        </a>
      </ListItem>
    );
  }

  return (
    <ListItem
      button
      className={isLinkActive ? classes.linkActive : classes.link}
      component={Link}
      disableRipple
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
