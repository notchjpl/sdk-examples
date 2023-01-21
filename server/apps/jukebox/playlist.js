import { getAssetAndDataObject } from "../../utils/index.js";
import { updatePlaylist } from "./index.js";

export const addToAssetPlaylist = async (req, res) => {
  // TODO: Look up additional information on YouTube like contentDetails for duration and statistics for play counts.
  try {
    const { assetId, videoInfo } = req.body;
    const droppedAsset = await getAssetAndDataObject(req);
    let { dataObject } = droppedAsset;
    dataObject.mediaLinkPlaylist = dataObject.mediaLinkPlaylist || [];

    const timestamp = new Date().valueOf();

    dataObject.mediaLinkPlaylist.push({
      ...videoInfo,
      timeAdded: timestamp,
      uniqueEntryId: `${videoInfo.id}_${timestamp}`,
    });

    await droppedAsset.updateDroppedAssetDataObject(dataObject);
    updatePlaylist({
      dataObject,
      isAdding: false, // Updating instead of adding
      position: droppedAsset.position,
      req: { ...req, body: { ...req.body, assetId: droppedAsset.id } },
      videoInfo,
      dontUpdateCurrentlyPlaying: true,
    });
    res.json({ success: true, assetId, dataObject });
  } catch (error) {
    console.log("Error adding asset to playlist", error);
    res.status(502).send({ error, success: false });
  }
};

export const removeFromAssetPlaylist = async (req, res) => {
  try {
    const { assetId, index } = req.body;
    const droppedAsset = await getAssetAndDataObject(req);
    let { dataObject } = droppedAsset;

    dataObject.mediaLinkPlaylist.splice(index, 1);
    await droppedAsset.updateDroppedAssetDataObject(dataObject);

    res.json({ success: true, assetId, dataObject });
  } catch (error) {
    console.log("Error removing asset from playlist", error);
    res.status(502).send({ error, success: false });
  }
};

export const shufflePlaylist = async (req, res) => {
  try {
    const { toggle } = req.body;
    const droppedAsset = await getAssetAndDataObject(req);
    let { dataObject } = droppedAsset;
    dataObject.playlistShuffle = toggle;
    await droppedAsset.updateDroppedAssetDataObject(dataObject);
    if (res) res.json({ success: true, dataObject });
  } catch (e) {
    console.log("Error shuffling playlist", e);
    if (res) res.status(502).send({ error, success: false });
  }
};

export const getPlayedCurrentIndex = (playlist, lastPlayedUniqueId) =>
  playlist.findIndex((i) => i.uniqueEntryId === lastPlayedUniqueId);

// TODO: This doesn't currently work.  Need to add API endpoint
export const volumeDown = async (req, res) => {
  try {
    const droppedAsset = await getAssetAndDataObject(req);
    droppedAsset.updateMediaType({
      audioVolume: Math.max(droppedAsset.audioVolume - 10, 0),
    });

    res.send("Success");
  } catch (e) {
    console.log("Error decreasing volume", e);
  }
};

// This doesn't currently work.  Need to add API endpoint
export const volumeUp = async (req, res) => {
  try {
    const droppedAsset = await getAssetAndDataObject(req);
    droppedAsset.updateMediaType({
      audioVolume: Math.min(droppedAsset.audioVolume + 10, 100),
    });
    res.send("Success");
  } catch (e) {
    console.log("Error increasing volume", e);
  }
};
