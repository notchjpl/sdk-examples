import { getAssetAndDataObject } from "../middleware/index.js";
import {
  addWebhook,
  deleteAsset,
  dropAsset,
  getDroppedAssetsWithUniqueName,
} from "./apiCalls.js";
import { getPlayedCurrentIndex } from "./playlist.js";

// TODO replace Track to change highlighting when it's playing

export const addPlaylistToWorld = async (req, res) => {
  const jukeboxAsset = await getAssetAndDataObject(req);

  const { dataObject, position } = jukeboxAsset;

  const {
    lastPlaylistUniqueEntryIdPlayed,
    mediaLinkPlaylist,
    playlistShuffle,
  } = dataObject;
  // TODO Add shuffle button.  Blue if shuffle active.  Gray if not.
  // TODO Add next button.
  // TODO Add volume up and volume down button
  let currentIndex = 0;
  // If there was a song played, start with that index.
  if (lastPlaylistUniqueEntryIdPlayed)
    currentIndex = getPlayedCurrentIndex(
      mediaLinkPlaylist,
      lastPlaylistUniqueEntryIdPlayed
    );
  // Show the previous song at the top
  if (currentIndex > 0) currentIndex--;

  for (var i = currentIndex; i < currentIndex + 10; i++) {
    let videoIndex = i;
    // Loop around to beginning of playlist if current index is near the end
    if (i > mediaLinkPlaylist.length - 1) {
      videoIndex = i - mediaLinkPlaylist.length;
    }
    const { apiKey, assetId, urlSlug } = req.body;

    addTrack({
      apiKey,
      id: assetId,
      index: i - currentIndex, // Put the track currently playing in the top spot
      position,
      trackData: mediaLinkPlaylist[videoIndex],
      urlSlug,
      isCurrentlyPlaying: currentIndex === i + 1, // Offset as we are putting the previous song as #1
    });
  }
  try {
  } catch (e) {
    // console.log(e);
    if (res) res.status(403).send(e);
  }
};

const addTrack = async ({
  apiKey,
  id,
  index,
  position,
  trackData,
  urlSlug,
  isCurrentlyPlaying,
}) => {
  console.log("Track data", index, trackData);
  const videoId = trackData.id;
  const trackEntry = await dropAsset({
    body: {
      apiKey,
      assetId: "rXLgzCs1wxpx96YLZAN5", // Custom text asset
      // Doing this as quick fix until we add position to SDK class
      position: {
        x: position ? position.x : 0,
        y: position ? position.y + 100 + index * 50 : 0 + 100 + index * 50,
      },
      uniqueName: `sdk-examples_playlist_${id}_track_${index}`, // ID here is the jukebox's assetId
      urlSlug,
    },
  });

  if (!trackEntry || !trackEntry.data)
    return console.log("Track not successfully added", trackEntry);

  const assetId = trackEntry.data.id;

  const trackAsset = await getAssetAndDataObject({
    body: {
      assetId,
      urlSlug,
    },
  });

  trackAsset.updateCustomText(
    {
      textColor: isCurrentlyPlaying ? "#0000ff" : "#000000", // Color the currently playing track a different color
      textFontFamily: "Arial",
      textSize: 12,
      textWeight: "normal",
      textWidth: 400,
    },
    trackData.snippet.title
  );

  const description = "Play next song!";
  const title = "Next button clicked";
  const type = "assetClicked";
  const url =
    "https://9bb3-2603-8000-c001-4f05-e9b8-5fc9-6a6c-b46b.ngrok.io/webhooks/playlist";
  const dataObject = {
    action: "track-clicked",
    index,
    assetId,
    videoId,
  };

  const trackWebhook = await addWebhook({
    body: {
      apiKey,
      assetId,
      dataObject,
      description,
      title,
      type,
      url,
      urlSlug,
    },
  });

  console.log("Webhook added");
};

export const removePlaylistFromWorld = async (req, res) => {
  const { apiKey, assetId, urlSlug } = req.body;
  const droppedAssets = getDroppedAssetsWithUniqueName({
    apiKey,
    uniqueName: `sdk-examples_playlist_${assetId}`,
    urlSlug,
  });
  console.log(droppedAssets.data);
  droppedAssets.data.forEach((item) => {
    deleteAsset({
      apiKey,
      assetId: item.id,
      urlSlug,
    });
  });
};
