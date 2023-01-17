import { getAssetAndDataObject } from "../middleware/index.js";
let timeoutTracker = {};

export const updateMedia = async (req, res) => {
  try {
    // Change current song showing in world if there are in-world controls
    // index is used for saving position in playlist
    const { assetId, index, videoId, videoInfo } = req.body;

    // Remove all timeouts related to this asset.  Going to be problematic if using clustering.
    // TODO: Improve by adding Redis?  Or add webhook firing on media state change in core application, then catch webhook to change song and don't use timeouts.
    if (timeoutTracker[assetId]) clearTimeout(timeoutTracker[assetId]);

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

    // Removed timeouts and replaced with new Media Play Finish webhook handler.
    // timeoutTracker[assetId] = setTimeout(
    // () => playNextSongInPlaylist(req),
    //   videoInfo.duration - 1000 // TODO make this more accurate
    // );
  } catch (error) {
    console.log(error);
    if (res) res.status(502).send({ error, success: false });
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

export const playNextSongInPlaylist = async (req, res) => {
  const jukeboxAsset = await getAssetAndDataObject(req);
  const { dataObject } = jukeboxAsset;
  const {
    lastPlaylistUniqueEntryIdPlayed,
    lastPlayTimestamp,
    lastStopTimestamp,
    mediaLinkPlaylist,
    playlistShuffle,
  } = dataObject;

  if (
    lastPlaylistUniqueEntryIdPlayed && // Last song played from the playlist
    (!lastStopTimestamp || lastPlayTimestamp > lastStopTimestamp) && // Check whether someone has intentionally stopped the videos
    mediaLinkPlaylist &&
    mediaLinkPlaylist.length // Make sure there is a playlist
  ) {
    let newReq = req;
    // Saved this when last song was played so we could look it up in case playlist has been rearranged during video playing.
    const index = getPlayedCurrentIndex(
      mediaLinkPlaylist,
      lastPlaylistUniqueEntryIdPlayed
    );

    if (!playlistShuffle) {
      // At the end of the playlist... loop back to the beginning.  Optionally, could just stop.
      if (index === mediaLinkPlaylist.length - 1) newReq.body.index = 0;
      else newReq.body.index = index + 1; // Not at end of playlist
    } else {
      // If shuffle is engaged
      // If there is only a single item, don't want to get stuck in recusive loop
      if (!mediaLinkPlaylist.length || mediaLinkPlaylist.length === 1)
        newReq.body.index = 0;
      newReq.body.index = randIndex(0, mediaLinkPlaylist.length - 1, index);
    }

    try {
      await jukeboxAsset.updateDroppedAssetDataObject(
        {
          ...dataObject,
          previousPlayed: mediaLinkPlaylist[newReq.body.index].uniqueEntryId,
        },
        // Mutex to prevent multiple updates.  Works on update object.  Only the first ping will work.
        // If it fails, don't do anything else.  If it succeeds, it means this was the first webhook received and you should do the rest of the work.
        {
          lock: {
            lockId: `${jukeboxAsset.id}_${jukeboxAsset.mediaPlayTime}`,
            releaseLock: false, // If false, will only ever work once.  Make sure lockId is something unique that you'll never ping again.
          },
        }
      );

      newReq.body.videoId = mediaLinkPlaylist[newReq.body.index].id;
      newReq.body.videoInfo = mediaLinkPlaylist[newReq.body.index];
      newReq.body.jukeboxAsset = jukeboxAsset;
      return updateMedia(newReq, res);
    } catch (e) {
      console.log("Update is properly locked due to mutex");
      return;
    }
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
    if (res) res.status(502).send({ error, success: false });
  }
};

function randIndex(min, max, currentIndex) {
  const newIndex = Math.floor(Math.random() * (max - min + 1) + min);
  // Don't want to play same song again
  if (newIndex === currentIndex) return randIndex(min, max, currentIndex);
  return newIndex;
}

export const getPlayedCurrentIndex = (playlist, lastPlayedUniqueId) =>
  playlist.findIndex((i) => i.uniqueEntryId === lastPlayedUniqueId);
