import express from "express";
const router = express.Router();
import {
  // youtubeSearch,
  youtubeHighDefSearch,
} from "./externalServices/googleAPIs.js";
export default router;

router.post("/youtubesearch", youtubeHighDefSearch);
// router.get("/youtubesearch", youtubeSearch);
