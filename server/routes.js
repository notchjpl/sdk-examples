const express = require("express");
const router = express.Router();
const { updateLeaderboard } = require("./leaderboard");

router.post("/leaderboardupdate", updateLeaderboard);
router.get("/", (req, res) => {
  res.json({ message: "Hello from server!" });
});

module.exports = router;
