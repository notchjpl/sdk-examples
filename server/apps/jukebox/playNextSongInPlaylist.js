import { getAssetAndDataObject } from "../../utils/index.js";
import { updateMedia } from "./index.js";
import { getPlayedCurrentIndex } from "./playlist.js";

export const playNextSongInPlaylist = async (req, res) => {
  try {
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
        if (!mediaLinkPlaylist.length || mediaLinkPlaylist.length === 1) {
          newReq.body.index = 0;
          newReq.body.index = randIndex(0, mediaLinkPlaylist.length - 1, index);
        }
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
    } else {
      console.log(
        "Cannot play next song in playlist with data object",
        dataObject
      );
    }
  } catch (e) {
    console.log("Error playing next song in playlist", e);
  }
};

function randIndex(min, max, currentIndex) {
  const newIndex = Math.floor(Math.random() * (max - min + 1) + min);
  // Don't want to play same song again
  if (newIndex === currentIndex) return randIndex(min, max, currentIndex);
  return newIndex;
}
