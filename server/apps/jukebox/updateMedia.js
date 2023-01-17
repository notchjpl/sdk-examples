import { getAssetAndDataObject } from "../../middleware/index.js";

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
    });

    dataObject.lastPlayTimestamp = new Date().valueOf();
    if (index || index === 0) dataObject.lastPlaylistIndex = index;
    if (index || index === 0)
      dataObject.lastPlaylistUniqueEntryIdPlayed =
        dataObject?.mediaLinkPlaylist[index]?.uniqueEntryId;

    await droppedAsset.updateDroppedAssetDataObject(dataObject);
    if (res) res.json({ success: true });
  } catch (error) {
    console.log(error);
    if (res) res.status(502).send({ error, success: false });
  }
};
