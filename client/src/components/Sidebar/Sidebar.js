import React from "react";

// components
import { Drawer } from "@mui/material";
import { SidebarLink } from "./SidebarLink";

// utils
import { sidebarRoutes } from "@utils";

export function Sidebar() {
  return (
    <Drawer
      open
      sx={{
        width: 240,
        height: "100vh",
        zIndex: 1000,
        "& .MuiDrawer-paper": { paddingTop: 9, width: 240 },
      }}
      variant="permanent"
    >
      {sidebarRoutes.map((route, index) => {
        return <SidebarLink key={index} path={route.path} text={route.text} />;
      })}
    </Drawer>
  );
}

export default Sidebar;
