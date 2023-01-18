import { addWebhookWithClick } from "./playlistGenerator.js";
import { Asset } from "../../../utils/topiaInit.js";

export const addPlaylistFrame = async ({ id, position, urlSlug }) => {
  const asset = Asset.create("lldvC2nqOzMXmgqmZJ8f");
  const frameAsset = await asset.drop({
    position: {
      x: position ? position.x : 0,
      y: position ? position.y + 450 : 450,
    },
    uniqueName: `sdk-examples_playlist_${id}_frame`,
    urlSlug,
  });
  // await frameAsset.fetchDroppedAssetById();
  // await frameAsset.fetchDroppedAssetDataObject();

  frameAsset.updateScale(1.45);
};

export const addNextButton = async ({ apiKey, id, position, urlSlug }) => {
  const asset = Asset.create("8kiBYqfayeJF5TcoUtpK");
  const nextAsset = await asset.drop({
    position: {
      x: position ? position.x + 400 : 400,
      y: position ? position.y + 450 : 450,
    },
    uniqueName: `sdk-examples_playlist_${id}_control_next`,
    urlSlug,
  });

  const description = `Next button clicked`;
  const title = "Next clicked";
  const dataObject = { action: "next-clicked", jukeboxId: id };

  const clickableTitle = `Next click`;

  addWebhookWithClick({
    clickableTitle,
    dataObject,
    description,
    title,
    droppedAsset: nextAsset,
    urlSlug,
  });
};
