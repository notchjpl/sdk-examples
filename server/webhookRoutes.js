import express from "express";
const router = express.Router();
import { playNextSongInPlaylist, updateMedia } from "./utils/index.js";
export default router;

router.post("/playlist", (req, res) => {
  const { dataObject, interactiveNonce, interactivePublicKey, urlSlug } =
    req.body;
  const { videoId, index, jukeboxId, action, videoInfo, uniqueEntryId } =
    dataObject;

  if (action === "track-clicked") {
    let updateObject = req;
    updateObject.body = {
      urlSlug,
      assetId: jukeboxId,
      videoId,
      videoInfo,
      uniqueEntryId,
    };
    updateMedia(updateObject);
  }

  if (action === "next-clicked") {
    console.log("Next clicked");
    let updateObject = req;
    updateObject.body = {
      urlSlug,
      assetId: jukeboxId,
    };
    playNextSongInPlaylist(updateObject);
  }
  res.json({ message: "Hello from server!" });
});
