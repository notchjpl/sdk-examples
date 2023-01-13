import { getAssetAndDataObject } from "../middleware/index.js";
import {
  getYoutubeVideoDetails,
  YTDurationToMilliseconds,
} from "../externalServices/googleAPIs.js";

export const updateMedia = async (req, res) => {
  try {
    // index is used for saving position in playlist
    const { index, mediaName, videoId } = req.body;
    console.log("Index", index);
    const mediaLink = `https://www.youtube.com/watch?v=${videoId}`;
    const droppedAsset = await getAssetAndDataObject(req);
    let { dataObject } = droppedAsset;

    await droppedAsset.updateMediaType({
      mediaLink,
      isVideo: true,
      mediaName, // Will only change media name if one is sent from the frontend.
      mediaType: "link",
    });

    dataObject.lastPlayTimestamp = new Date().valueOf();
    if (index || index === 0) dataObject.lastPlaylistIndex = index;
    if (index || index === 0)
      dataObject.lastPlaylistUniqueEntryIdPlayed =
        dataObject.mediaLinkPlaylist[index].uniqueEntryId;

    await droppedAsset.updateDroppedAssetDataObject(dataObject);
    if (res) res.json({ success: true });
    waitForSongToEndAndDoSomething(req);
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
    let { snippet, etag, id, kind } = videoInfo;
    delete snippet.thumbnails; // Unnecessary and takes up space
    const timestamp = new Date().valueOf();

    dataObject.mediaLinkPlaylist.push({
      etag,
      id,
      kind,
      snippet,
      timeAdded: timestamp,
      uniqueEntryId: `${id.videoId}_${timestamp}`,
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

const waitForSongToEndAndDoSomething = async (req) => {
  const videoDetails = await getYoutubeVideoDetails(req.body.videoId);
  const { items } = videoDetails;
  const { contentDetails } = items[0];
  const durationMilliseconds = YTDurationToMilliseconds(
    contentDetails.duration
  );
  console.log("Duration in milliseconds", durationMilliseconds);
  setTimeout(() => playNextSongInPlaylist(req), durationMilliseconds);
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
      console.log(lastPlaylistUniqueEntryIdPlayed);
      console.log(mediaLinkPlaylist);
      // Saved this when last song was played so we could look it up in case playlist has been rearranged during video playing.
      const index = mediaLinkPlaylist.findIndex(
        (i) => i.uniqueEntryId === lastPlaylistUniqueEntryIdPlayed
      );

      console.log("Old index", index);
      // At the end of the playlist... loop back to the beginning.  Optionally, could just stop.
      if (index === mediaLinkPlaylist.length - 1) newReq.body.index = 0;
      else newReq.body.index = index + 1; // Not at end of playlist
    } else {
      // Shuffle mode on
      // Don't play same song just played
    }
    console.log("New index", newReq.body.index);
    newReq.body.videoId = mediaLinkPlaylist[newReq.body.index].id.videoId;
    updateMedia(newReq);
  }
};
