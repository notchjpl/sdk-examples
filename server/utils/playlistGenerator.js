// TODO: Add 'next page' and 'previous page' buttons to in-world playlist so can browse through the entire playlist

import { getAssetAndDataObject } from "../middleware/index.js";
import {
  addWebhook,
  deleteAsset,
  dropAsset,
  getDroppedAssetsWithUniqueName,
} from "./apiCalls.js";
import { getPlayedCurrentIndex } from "./playlist.js";

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
      position,
      trackData: mediaLinkPlaylist[videoIndex],
      urlSlug,
      isCurrentlyPlaying: i === currentIndex + 1, // Offset as we are putting the previous song as #1
    });

    // addControl({

    // });
  }
  addPlaylistFrame({ apiKey, id: assetId, position, urlSlug });
  addNextButton({ apiKey, id: assetId, position, urlSlug });
  try {
  } catch (e) {
    // console.log(e);
    if (res) res.status(403).send(e);
  }
};

const addPlaylistFrame = async ({ apiKey, id, position, urlSlug }) => {
  const result = await dropAsset({
    body: {
      apiKey,
      assetId: "lldvC2nqOzMXmgqmZJ8f", // Custom text asset
      // Doing this as quick fix until we add position to SDK class
      position: {
        x: position ? position.x : 0,
        y: position ? position.y + 450 : 450,
      },
      uniqueName: `sdk-examples_playlist_${id}_frame`, // ID here is the jukebox's assetId
      urlSlug,
    },
  });

  const assetId = result.data.id;

  const frameAsset = await getAssetAndDataObject({
    body: {
      assetId,
      urlSlug,
    },
  });

  frameAsset.updateScale(1.45);
};

const addNextButton = async ({ apiKey, id, position, urlSlug }) => {
  const result = await dropAsset({
    body: {
      apiKey,
      assetId: "8kiBYqfayeJF5TcoUtpK", // Custom text asset
      // Doing this as quick fix until we add position to SDK class
      position: {
        x: position ? position.x + 400 : 400,
        y: position ? position.y + 450 : 450,
      },
      uniqueName: `sdk-examples_playlist_${id}_control_next`, // ID here is the jukebox's assetId
      urlSlug,
    },
  });

  const assetId = result.data.id;

  const nextAsset = await getAssetAndDataObject({
    body: {
      assetId,
      urlSlug,
    },
  });

  const description = `Next button clicked`;
  const title = "Next clicked";
  const dataObject = { action: "next-clicked", jukeboxId: id };

  const clickableTitle = `Next click`;

  addWebhookWithClick({
    apiKey,
    assetId,
    clickableTitle,
    dataObject,
    description,
    title,
    droppedAsset: nextAsset,
    urlSlug,
  });
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
  const videoId = trackData.id;
  const { uniqueEntryId } = trackData;
  const videoInfo = trackData;
  const offset = 220 + index * 50;
  const trackEntry = await dropAsset({
    body: {
      apiKey,
      assetId: "rXLgzCs1wxpx96YLZAN5", // Custom text asset
      // Doing this as quick fix until we add position to SDK class
      position: {
        x: position ? position.x : 0,
        y: position ? position.y + offset : offset,
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

  await trackAsset.updateCustomText(
    {
      textColor: isCurrentlyPlaying ? "#0000ff" : "#000000", // Color the currently playing track a different color
      textFontFamily: "Arial",
      textSize: 12,
      textWeight: "normal",
      textWidth: 350,
    },
    trackData.snippet.title
  );

  // TODO: Need to make so can send developer public key when adding webhook and specify that can add visitor session credentials.
  // TODO: Need to add clickType: webhook
  // TODO: Add clickType: "displayText" to the public API
  // TODO: Dropped text seems to high.  Need to set max height of asset?

  const description = `Play song by clicking here`;
  const title = "Track clicked";
  const dataObject = {
    action: "track-clicked",
    index,
    uniqueEntryId,
    jukeboxId: id,
    videoId,
    videoInfo,
  };

  const clickableTitle = `Track ${index}`;

  addWebhookWithClick({
    apiKey,
    assetId,
    clickableTitle,
    dataObject,
    description,
    title,
    droppedAsset: trackAsset,
    urlSlug,
  });
};

const addWebhookWithClick = async ({
  apiKey,
  assetId,
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
      assetId,
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
};
