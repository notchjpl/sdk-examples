import { getAssetAndDataObject } from "../../../middleware/index.js";
import { addWebhookWithClick } from "./playlistGenerator.js";
import { dropAsset } from "../../../utils/apiCalls.js";

export const addPlaylistFrame = async ({ apiKey, id, position, urlSlug }) => {
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

export const addNextButton = async ({ apiKey, id, position, urlSlug }) => {
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
    clickableTitle,
    dataObject,
    description,
    title,
    droppedAsset: nextAsset,
    urlSlug,
  });
};
