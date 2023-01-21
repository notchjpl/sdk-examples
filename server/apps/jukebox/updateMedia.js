import { getAssetAndDataObject } from "../../utils/index.js";
// import { updateCurrentlyPlaying } from "../../apps/jukebox/generator/tracks.js";
import { updatePlaylist } from "./generator/updatePlaylist.js";

export const updateMedia = async (req, res) => {
  try {
    // Change current song showing in world if there are in-world controls
    // index is used for saving position in playlist
    const { index, videoId, videoInfo } = req.body;

    // Remove all timeouts related to this asset.  Going to be problematic if using clustering.
    // TODO: Improve by adding Redis?  Or add webhook firing on media state change in core application, then catch webhook to change song and don't use timeouts.

    const mediaLink = `https://www.youtube.com/watch?v=${videoId}`;
    let droppedAsset = req.body.jukeboxAsset;

    if (!droppedAsset) {
      droppedAsset = await getAssetAndDataObject(req);
    }
    let { dataObject } = droppedAsset;

    // TODO: Remove (or just update) playlist text assets when song changes if the assets exist in world.

    // TODO: Rather than passing in videoInfo, should pull the info from dataObject.
    // Should send uniqueEntryId rather than videoId and videoInfo.  Then do a lookup.

    await droppedAsset.updateMediaType({
      mediaLink,
      isVideo: true,
      mediaName: videoInfo?.snippet?.title, // Will only change media name if one is sent from the frontend.
      mediaType: "link",
      audioSliderVolume: droppedAsset.audioSliderVolume || 10, // Between 0 and 100
      audioRadius: droppedAsset.audioRadius || 2, // Far
      syncUserMedia: true, // Make it so everyone has the video synced instead of it playing from the beginning when they approach.
    });

    dataObject.lastPlayTimestamp = new Date().valueOf();
    if (index || index === 0) dataObject.lastPlaylistIndex = index;
    if (index || index === 0)
      dataObject.lastPlaylistUniqueEntryIdPlayed =
        dataObject?.mediaLinkPlaylist[index]?.uniqueEntryId;

    await droppedAsset.updateDroppedAssetDataObject(dataObject);
    if (res) res.json({ success: true, dataObject });
    // Moved to generator/updatePlaylist
    // updateCurrentlyPlaying({ id: droppedAsset.id, req, trackData: videoInfo });
    updatePlaylist({
      dataObject,
      isAdding: false, // Updating instead of adding
      position: droppedAsset.position,
      req: { ...req, body: { ...req.body, assetId: droppedAsset.id } },
      videoInfo,
    });
  } catch (error) {
    console.log("Error updating media", error);
    if (res) res.status(502).send({ error, success: false });
  }
};
