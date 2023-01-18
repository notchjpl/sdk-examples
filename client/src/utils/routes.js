import {
  EditTextAsset,
  Error,
  Home,
  Jukebox,
  Leaderboard,
  MoveVisitors,
  ReplaceScene,
} from "@pages";

export const getRouteByPath = (path) => {
  return routes.find((route) => route.path === path);
};

export const sidebarRoutes = [
  {
    id: "HOME",
    path: "/",
    component: Home,
    text: "Home",
  },
  {
    id: "JUKEBOX",
    path: "/jukebox",
    component: Jukebox,
    text: "Jukebox",
  },
  {
    id: "MOVE_VISITORS",
    path: "/movevisitors",
    component: MoveVisitors,
    text: "Move Visitors",
  },
  {
    id: "LEADERBOARD",
    path: "/leaderboard",
    component: Leaderboard,
    text: "Leaderboard",
  },
  {
    id: "REPLACE_SCENE",
    path: "/replacescene",
    component: ReplaceScene,
    text: "Replace Scene",
  },
  {
    id: "EDIT_TEXT_ASSET",
    path: "/edittextasset",
    component: EditTextAsset,
    text: "Edit Text Asset",
  },
];

export const routes = [
  ...sidebarRoutes,
  {
    path: "/error",
    component: Error,
    text: "Error",
  },
];

export default routes;
