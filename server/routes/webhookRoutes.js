import express from "express";
const router = express.Router();
import { playNextSongInPlaylist, updateMedia } from "../apps/jukebox/index.js";
import { getAssetAndDataObject } from "../utils/index.js";
export default router;

router.post("/playlist/:param?", async (req, res) => {
  const { assetId, dataObject } = req.body;

  if (dataObject && dataObject.action === "track-clicked") {
    const textAsset = await getAssetAndDataObject(req);
    const textData = textAsset.dataObject;
    const { videoInfo, uniqueEntryId, videoId } = textData;
    if (!dataObject) return;
    let { jukeboxId, index } = dataObject;

    // Get data object from the text asset instead of pulling videoId and videoInfo from the webhook
    let updateObject = req;
    updateObject.body = {
      ...req.body,
      assetId: jukeboxId,
      index,
      videoId,
      videoInfo,
      uniqueEntryId,
    };
    updateMedia(updateObject);
  } else if (dataObject && dataObject.action === "next-clicked") {
    let { jukeboxId } = dataObject;
    let updateObject = req;
    updateObject.body = { ...req.body, assetId: jukeboxId };
    playNextSongInPlaylist(updateObject);
  } else if (req.params.param === "next") {
    let updateObject = req;
    updateObject.body = { ...req.body, assetId };
    playNextSongInPlaylist(updateObject);
  }

  res.json({ message: "Hello from server!" });
});
