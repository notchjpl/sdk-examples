import React from "react";

// styles
import useStyles from "./styles";

// components
import { Drawer } from "@mui/material";
import SidebarLink from "./components/SidebarLink/SidebarLink";

// utils
import { sidebarRoutes } from "@utils";

export function Sidebar() {
  const classes = useStyles();

  return (
    <Drawer className={classes.drawerOpen} open variant="permanent">
      {sidebarRoutes.map((route, index) => {
        return <SidebarLink key={index} path={route.path} text={route.text} />;
      })}
    </Drawer>
  );
}

export default Sidebar;
