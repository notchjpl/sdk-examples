import { getAssetAndDataObject } from "../../utils/index.js";
import { updatePlaylist, updateShuffleButton } from "./index.js";

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
    updatePlaylist({
      dataObject,
      isAdding: false, // Updating instead of adding
      position: droppedAsset.position,
      req: { ...req, body: { ...req.body, assetId: droppedAsset.id } },
      dontUpdateCurrentlyPlaying: true,
    });

    res.json({ success: true, assetId, dataObject });
  } catch (error) {
    console.log("Error removing asset from playlist", error);
    res.status(502).send({ error, success: false });
  }
};

export const shufflePlaylist = async (req, res) => {
  try {
    const { toggle, urlSlug } = req.body;
    const droppedAsset = await getAssetAndDataObject(req);
    if (!droppedAsset) return;
    let { dataObject, id, position } = droppedAsset;
    dataObject.playlistShuffle = toggle;
    await droppedAsset.updateDroppedAssetDataObject(dataObject);
    updateShuffleButton({
      id,
      isPushed: toggle,
      position: { ...position, y: position.y + 150 },
      req,
      urlSlug,
    });
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
      audioSliderVolume: Math.max(droppedAsset.audioSliderVolume - 10, 0),
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
      audioSliderVolume: Math.min(droppedAsset.audioSliderVolume + 10, 100),
    });
    res.send("Success");
  } catch (e) {
    console.log("Error increasing volume", e);
  }
};

export const nextPage = async (req, res) => {
  turnPage(req, res, "next");
};

export const previousPage = async (req, res) => {
  turnPage(req, res, "previous");
};

const turnPage = async (req, res, direction) => {
  try {
    const { assetId } = req.body;
    const droppedAsset = await getAssetAndDataObject(req);
    let { dataObject } = droppedAsset;

    const { mediaLinkPlaylist } = dataObject;
    dataObject.playlistPageShown = dataObject.playlistPageShown || 0;

    if (direction === "next") {
      // Check if should cycle back to first page
      if (
        mediaLinkPlaylist?.length &&
        // If 15 tracks, will be 0.5, which if page is 0, will be true and turn page.
        mediaLinkPlaylist.length / 10 - 1 > dataObject.playlistPageShown
      )
        dataObject.playlistPageShown++;
      else {
        dataObject.playlistPageShown = 0;
      }
    } else if (direction === "previous") {
      if (!mediaLinkPlaylist?.length) return; // No playlist, don't do anything
      if (mediaLinkPlaylist?.length && dataObject.playlistPageShown === 0)
        // Round down to nearest integer
        dataObject.playlistPageShown = Math.floor(mediaLinkPlaylist.length / 10);
      else {
        // If not on the 0 page, decrease page
        dataObject.playlistPageShown--;
      }
    }

    await droppedAsset.updateDroppedAssetDataObject(dataObject);
    updatePlaylist({
      dataObject,
      isAdding: false,
      position: droppedAsset.position,
      req: { ...req, body: { ...req.body, assetId: droppedAsset.id } },
      dontUpdateCurrentlyPlaying: true,
    });
    if (res) res.json({ success: true, assetId, dataObject });
  } catch (error) {
    console.log("Error going to next page", error);
    if (res) res.status(502).send({ error, success: false });
  }
};
