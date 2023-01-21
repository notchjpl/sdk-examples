import { addWebhookWithClick } from "./playlistGenerator.js";
import { InteractiveAsset } from "../../../utils/index.js";
import { createText } from "./text.js";

export const addPlaylistFrame = async ({ id, position, req, urlSlug }) => {
  try {
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
  } catch (e) {
    console.log("Error adding playlist frame", e);
  }
};

export const addNextButton = async ({ id, position, req, urlSlug }) => {
  try {
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
  } catch (e) {
    console.log("Error adding next button", e);
  }
};

export const addPreviousPageButton = async ({ id, position, req, urlSlug }) => {
  addPageButton({
    pos: {
      x: position ? position.x - 100 : -100,
      y: position ? position.y + 850 : 850,
    },
    req,
    text: "Previous Page",
    uniqueName: `sdk-examples_playlist_${id}_control_previous_page`,
    urlSlug,
    dataObject: { action: "previous-page-clicked", jukeboxId: id },
  });
};

export const addNextPageButton = async ({ id, position, req, urlSlug }) => {
  addPageButton({
    pos: {
      x: position ? position.x + 100 : 100,
      y: position ? position.y + 850 : 850,
    },
    req,
    text: "Next Page",
    uniqueName: `sdk-examples_playlist_${id}_control_next_page`,
    urlSlug,
    dataObject: { action: "next-page-clicked", jukeboxId: id },
  });
};

const addPageButton = async ({
  pos,
  req,
  text,
  uniqueName,
  urlSlug,
  dataObject,
}) => {
  // Will replace this once have previous and next buttons.
  const droppedAsset = await createText({
    pos,
    req,
    text,
    textSize: 20,
    textWidth: 150,
    uniqueName,
    urlSlug,
  });

  const description = `${text} button clicked`;
  const title = `${text} clicked`;
  const clickableTitle = `${text} clicked`;

  addWebhookWithClick({
    clickableTitle,
    dataObject,
    description,
    req,
    title,
    droppedAsset,
    urlSlug,
  });
};
