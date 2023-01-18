// TODO: Add 'next page' and 'previous page' buttons to in-world playlist so can browse through the entire playlist

import { getAssetAndDataObject } from "../../../middleware/index.js";
import {
  addWebhook,
  deleteAsset,
  dropAsset,
  getDroppedAssetsWithUniqueName,
} from "../../../utils/apiCalls.js";
import { getPlayedCurrentIndex } from "../playlist.js";
import { addCurrentlyPlaying, addTrack } from "./tracks.js";
import { addPlaylistFrame, addNextButton } from "./buttons.js";

const base = "https://833b-2603-8000-c001-4f05-882c-4e07-848c-f2f1.ngrok.io";

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
  let currentPlayingHeight = 150;
  // If there was a song played, start with that index.
  if (lastPlaylistUniqueEntryIdPlayed)
    currentIndex = getPlayedCurrentIndex(
      mediaLinkPlaylist,
      lastPlaylistUniqueEntryIdPlayed
    );
  // Show the previous song at the top
  if (currentIndex > 0) currentIndex--;

  const { apiKey, assetId, urlSlug } = req.body;
  for (var i = currentIndex; i < currentIndex + 10; i++) {
    let videoIndex = i;
    // Loop around to beginning of playlist if current index is near the end
    if (i > mediaLinkPlaylist.length - 1) {
      videoIndex = i - mediaLinkPlaylist.length;
    }

    addTrack({
      apiKey,
      id: assetId,
      index: i - currentIndex, // Put the track currently playing in the top spot
      position: { ...position, y: position.y + currentPlayingHeight },
      trackData: mediaLinkPlaylist[videoIndex],
      urlSlug,
      isCurrentlyPlaying: i === currentIndex + 1, // Offset as we are putting the previous song as #1
    });
  }
  addPlaylistFrame({
    apiKey,
    id: assetId,
    position: { ...position, y: position.y + currentPlayingHeight },
    urlSlug,
  });
  addNextButton({
    apiKey,
    id: assetId,
    position: { ...position, y: position.y + currentPlayingHeight },
    urlSlug,
  });
  addCurrentlyPlaying({
    apiKey,
    id: assetId,
    position: { ...position, y: position.y + currentPlayingHeight / 2 },
    trackData: mediaLinkPlaylist[currentIndex + 1],
    urlSlug,
  });
  if (res) res.send("Success");
  try {
  } catch (e) {
    // console.log(e);
    if (res) res.status(403).send(e);
  }
};

export const addWebhookWithClick = async ({
  apiKey,
  clickableTitle,
  dataObject,
  description,
  title,
  droppedAsset,
  urlSlug,
}) => {
  await droppedAsset.updateClickType({
    clickType: "link",
    clickableLink: `https://topia.io`,
    clickableLinkTitle: clickableTitle,
  });

  // Webhook
  const type = "assetClicked";
  const url = `${base}/webhooks/playlist`;

  await addWebhook({
    body: {
      apiKey,
      assetId: droppedAsset.id,
      dataObject,
      description,
      title,
      type,
      url,
      urlSlug,
    },
  });
};

export const removePlaylistFromWorld = async (req, res) => {
  const { apiKey, assetId, urlSlug } = req.body;
  const droppedAssets = await getDroppedAssetsWithUniqueName({
    apiKey,
    partial: true, // Pulls all dropped assets with unique name that starts with 'uniqueName' below
    uniqueName: `sdk-examples_playlist_${assetId}`,
    urlSlug,
  });
  if (!droppedAssets || !droppedAssets.data || !droppedAssets.data.assets)
    return res.status(403).send("No playlist in world to remove");
  droppedAssets.data.assets.forEach((item) => {
    deleteAsset({
      apiKey,
      assetId: item.id,
      urlSlug,
    });
  });
  if (res) res.send("Success");
};
