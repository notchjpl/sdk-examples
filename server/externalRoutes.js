import express from "express";
const router = express.Router();
import {
  fetchYouTubeVideoInfo,
  youtubeSearch,
} from "./externalServices/googleAPIs.js";
export default router;

router.post("/youtubesearch", youtubeSearch);
router.post("/youtubevideoinfo", fetchYouTubeVideoInfo);
