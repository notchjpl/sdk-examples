import express from "express";
const router = express.Router();
import { youtubeSearch } from "./externalServices/googleAPIs.js";
export default router;

router.post("/youtubesearch", youtubeSearch);
