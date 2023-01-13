import express from "express";
const router = express.Router();
import {
  addToAssetPlaylist,
  getDataObject,
  updateLeaderboard,
  updateMedia,
} from "./utils/index.js";
export default router;

router.post("/leaderboardupdate", updateLeaderboard);
router.get("/", (req, res) => {
  res.json({ message: "Hello from server!" });
});

router.post("/updatemedia", updateMedia);
router.post("/addtoassetplaylist", addToAssetPlaylist);
router.post("/getdataobject", getDataObject);
