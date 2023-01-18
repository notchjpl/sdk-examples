import express from "express";
const router = express.Router();
import { getDataObject, updateLeaderboard } from "../utils/index.js";

import {
  addPlaylistToWorld,
  addToAssetPlaylist,
  playNextSongInPlaylist,
  removeFromAssetPlaylist,
  removePlaylistFromWorld,
  shufflePlaylist,
  updateMedia,
  volumeDown,
  volumeUp,
} from "../apps/jukebox/index.js";
export default router;

router.post("/leaderboardupdate", updateLeaderboard);
router.get("/", (req, res) => {
  res.json({ message: "Hello from server!" });
});

router.post("/updatemedia", updateMedia);
router.post("/addtoassetplaylist", addToAssetPlaylist);
router.post("/removefromassetplaylist", removeFromAssetPlaylist);
router.post("/getdataobject", getDataObject);

router.post("/playlistnext", playNextSongInPlaylist);
router.post("/shufflePlaylist", shufflePlaylist);

router.post("/addplaylistcontrols", addPlaylistToWorld);
router.post("/removeplaylistcontrols", removePlaylistFromWorld);

router.post("/volumedown", volumeDown);
router.post("/volumeUp", volumeUp);
