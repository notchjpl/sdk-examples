import React from "react";

// styles
import useStyles from "./styles";

// components
import { Drawer } from "@mui/material";
import SidebarLink from "./components/SidebarLink/SidebarLink";

// context
import { useLayoutState } from "../../context/LayoutContext";

// utils
import { sidebarRoutes } from "../../utils";

export function Sidebar() {
  const classes = useStyles();

  // context
  const { isSidebarOpened } = useLayoutState();

  return (
    <Drawer
      className={isSidebarOpened ? classes.drawerOpen : classes.drawerClose}
      variant="permanent"
      open={isSidebarOpened}
    >
      {sidebarRoutes.map((route, index) => {
        return <SidebarLink key={index} path={route.path} text={route.text} />;
      })}
    </Drawer>
  );
}

export default Sidebar;
