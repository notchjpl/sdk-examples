import express from "express";
const router = express.Router();
import { updateMedia, updateLeaderboard } from "./utils/index.js";
export default router;

router.post("/leaderboardupdate", updateLeaderboard);
router.get("/", (req, res) => {
  res.json({ message: "Hello from server!" });
});

router.post("/updatemedia", updateMedia);
