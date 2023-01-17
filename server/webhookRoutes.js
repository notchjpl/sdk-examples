import express from "express";
const router = express.Router();
import { playNextSongInPlaylist, updateMedia } from "./utils/index.js";
export default router;

router.post("/playlist/:param", (req, res) => {
  const {
    assetId,
    dataObject,
    interactiveNonce,
    interactivePublicKey,
    urlSlug,
  } = req.body;

  if (dataObject && dataObject.action === "track-clicked") {
    if (!dataObject) return;
    let { videoId, index, jukeboxId, videoInfo, uniqueEntryId } = dataObject;
    let updateObject = req;
    updateObject.body = {
      urlSlug,
      assetId,
      videoId,
      videoInfo,
      uniqueEntryId,
    };
    updateMedia(updateObject);
  }

  if (
    (dataObject && dataObject.action === "next-clicked") ||
    req.params.param === "next"
  ) {
    let updateObject = req;
    updateObject.body = {
      urlSlug,
      assetId,
    };
    playNextSongInPlaylist(updateObject);
    // mediaZonePlayEnded webhook
    // mediaPlayTime_media-next-track used as lockId
    // Mutex only works for updating data objects.
    // {lockId
    // releaseLock: false}
    // Second parameter, which is object with {lockId: blah, releaseLock: false}
    // New SDK endpoint for updating data object (instead of just replacing entire thing)
    // If successful, you do the next action.  If you are not successful, exit - because someone else did it.
    // TODO: Change all updateDroppedAssetDataObject to setDroppedAssetDataObject
  }

  res.json({ message: "Hello from server!" });
});
