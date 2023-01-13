import { getAssetAndDataObject } from "../middleware/index.js";

export const updateMedia = async (req, res) => {
  try {
    // index is used for saving position in playlist
    const { index, videoId, videoInfo } = req.body;
    const mediaLink = `https://www.youtube.com/watch?v=${videoId}`;
    const droppedAsset = await getAssetAndDataObject(req);
    let { dataObject } = droppedAsset;

    await droppedAsset.updateMediaType({
      mediaLink,
      isVideo: true,
      mediaName: videoInfo.snippet.title, // Will only change media name if one is sent from the frontend.
      mediaType: "link",
    });

    dataObject.lastPlayTimestamp = new Date().valueOf();
    if (index || index === 0) dataObject.lastPlaylistIndex = index;
    if (index || index === 0)
      dataObject.lastPlaylistUniqueEntryIdPlayed =
        dataObject.mediaLinkPlaylist[index].uniqueEntryId;

    await droppedAsset.updateDroppedAssetDataObject(dataObject);
    if (res) res.json({ success: true });

    setTimeout(() => playNextSongInPlaylist(req), videoInfo.duration);
  } catch (error) {
    console.log(error);
    res.status(502).send({ error, success: false });
  }
};

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
    res.json({ success: true, assetId, dataObject });
  } catch (error) {
    console.log(error);
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
    console.log(error);
    res.status(502).send({ error, success: false });
  }
};

const playNextSongInPlaylist = async (req) => {
  const droppedAsset = await getAssetAndDataObject(req);
  const { dataObject } = droppedAsset;
  const {
    lastPlaylistUniqueEntryIdPlayed,
    lastPlayTimestamp,
    lastStopTimestamp,
    mediaLinkPlaylist,
    shufflePlaylist,
  } = dataObject;

  if (
    lastPlaylistUniqueEntryIdPlayed && // Last song played from the playlist
    (!lastStopTimestamp || lastPlayTimestamp > lastStopTimestamp) && // Check whether someone has intentionally stopped the videos
    mediaLinkPlaylist.length // Make sure there is a playlist
  ) {
    let newReq = req;
    if (!shufflePlaylist) {
      // Saved this when last song was played so we could look it up in case playlist has been rearranged during video playing.
      const index = mediaLinkPlaylist.findIndex(
        (i) => i.uniqueEntryId === lastPlaylistUniqueEntryIdPlayed
      );
      // At the end of the playlist... loop back to the beginning.  Optionally, could just stop.
      if (index === mediaLinkPlaylist.length - 1) newReq.body.index = 0;
      else newReq.body.index = index + 1; // Not at end of playlist
    } else {
      // TODO: Add shuffle mode
      // Shuffle mode on
      // Don't play same song just played
    }

    newReq.body.videoId = mediaLinkPlaylist[newReq.body.index].id.videoId;
    updateMedia(newReq);
  }
};
