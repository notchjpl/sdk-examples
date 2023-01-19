import { addWebhookWithClick } from "./playlistGenerator.js";
import { InteractiveAsset } from "../../../utils/index.js";
import req from "express/lib/request.js";

export const addPlaylistFrame = async ({ id, position, req, urlSlug }) => {
  const frameAsset = await InteractiveAsset({
    id: "lldvC2nqOzMXmgqmZJ8f",
    req,
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

export const addNextButton = async ({ id, position, req, urlSlug }) => {
  const nextAsset = await InteractiveAsset({
    id: "8kiBYqfayeJF5TcoUtpK",
    req,
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

  const clickableTitle = `Next clicked`;

  addWebhookWithClick({
    clickableTitle,
    dataObject,
    description,
    req,
    title,
    droppedAsset: nextAsset,
    urlSlug,
  });
};
