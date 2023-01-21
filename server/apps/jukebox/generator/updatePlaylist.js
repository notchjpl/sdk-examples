import {
  addCurrentlyPlaying,
  addTrack,
  updateCurrentlyPlaying,
} from "./tracks.js";

import { updateText } from "./text.js";
import { getPlayedCurrentIndex } from "../playlist.js";

export const updatePlaylist = ({
  addPosOffset, // Only included when adding, not updating
  dataObject,
  dontUpdateCurrentlyPlaying,
  position, // Only included when adding, not updating
  req,
  isAdding,
  videoInfo, // Only included if updating
}) => {
  const {
    lastPlaylistUniqueEntryIdPlayed,
    mediaLinkPlaylist,
    playlistPageShown,
    playlistShuffle,
  } = dataObject;
  let currentPlayedIndex = 0;

  try {
    // If there was a song played, start with that index.
    if (lastPlaylistUniqueEntryIdPlayed)
      currentPlayedIndex = getPlayedCurrentIndex(
        mediaLinkPlaylist,
        lastPlaylistUniqueEntryIdPlayed
      );
    // Show the previous song at the top if not doing page-based playlist
    // if (currentIndex > 0) currentIndex--;

    const { assetId, urlSlug } = req.body;

    if (!dontUpdateCurrentlyPlaying) {
      // Adds currently playing
      if (isAdding)
        addCurrentlyPlaying({
          id: assetId,
          position: { ...position, y: position.y + addPosOffset / 2 },
          req,
          // trackData: mediaLinkPlaylist[currentIndex + 1], // Only use if not doing page-based playlist
          trackData: mediaLinkPlaylist[currentPlayedIndex],
          urlSlug,
        });
      else updateCurrentlyPlaying({ id: assetId, req, trackData: videoInfo });
    }

    // Add tracks
    const startIndex = playlistPageShown || 0;
    const start = startIndex * 10;
    for (var i = start; i < start + 10; i++) {
      let videoIndex = i;
      const index = i - start; // Grab the right asset in the playlist

      // // Loop around to beginning of playlist if current index is near the end
      if (i > mediaLinkPlaylist.length - 1) {
        return;

        videoIndex = i - mediaLinkPlaylist.length;
        if (!mediaLinkPlaylist[videoIndex]) return;
      }

      // End of playlist
      // if (i < mediaLinkPlaylist.length) {
      if (isAdding)
        addTrack({
          id: assetId,
          index, // Put the track currently playing in the top spot
          // index: i - currentIndex, // Put the track currently playing in the top spot.  Only use if not doing page-based
          position: { ...position, y: position.y + addPosOffset },
          req,
          trackData: mediaLinkPlaylist[videoIndex],
          urlSlug,
          isCurrentlyPlaying: videoIndex === currentPlayedIndex, // Offset as we are putting the previous song as #1.  Only use if not doing page-based
          // isCurrentlyPlaying: i === currentIndex + 1, // Offset as we are putting the previous song as #1.  Only use if not doing page-based
        });
      else
        updateText({
          newDataObject: {
            // Need to clean this up and not pass it all in.  Only need uniqueEntryId, then do a lookup
            videoInfo: mediaLinkPlaylist[videoIndex],
            videoId: mediaLinkPlaylist[videoIndex].id,
            uniqueEntryId: mediaLinkPlaylist[videoIndex].uniqueEntryId,
          },
          // TODO: Make so don't have to pass all these properties in.  Passing only textColor causes failed API call
          textOptions: {
            textColor:
              videoIndex === currentPlayedIndex ? "#0000ff" : "#000000",
            textFontFamily: "Arial",
            textSize: 12,
            textWeight: "normal",
            textWidth: 300,
          },
          req,
          text: mediaLinkPlaylist[videoIndex]?.snippet?.title,
          uniqueName: `sdk-examples_playlist_${assetId}_track_${index}`,
        });

      // }
    }
  } catch (e) {
    console.log("Error updating playlist", e);
  }
};
