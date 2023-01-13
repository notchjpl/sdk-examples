import express from "express";
const router = express.Router();
import {
  addToAssetPlaylist,
  getDataObject,
  playNextSongInPlaylist,
  // playlistPrevious,
  removeFromAssetPlaylist,
  updateLeaderboard,
  updateMedia,
  // volumeDown,
  // volumeUp,
} from "./utils/index.js";
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
// router.post("/playlistprevious", playlistPrevious);
// router.post("/volumedown", volumeDown);
// router.post("/volumeUp", volumeUp);
