import { addWebhookWithClick } from "./playlistGenerator.js";
import { InteractiveAsset } from "../../../utils/index.js";
import { createText } from "./text.js";

const buttonsRadius = 165;

export const addPlaylistFrame = async ({ id, position, req, urlSlug }) => {
  try {
    const frameAsset = await InteractiveAsset({
      id: "5OLYa5QDTos6qupPp26X",
      req,
      position: {
        x: position ? position.x : 0,
        y: position ? position.y + 570 : 570,
      },
      uniqueName: `sdk-examples_playlist_${id}_frame`,
      urlSlug,
    });

    // await frameAsset.fetchDroppedAssetById();
    // await frameAsset.fetchDroppedAssetDataObject();

    frameAsset.updateScale(1.35);
  } catch (e) {
    console.log("Error adding playlist frame", e);
  }
};

export const addCurrentlyPlayingFrame = async ({
  id,
  position,
  req,
  urlSlug,
}) => {
  try {
    const frameAsset = await InteractiveAsset({
      id: "5h21eNGdHvemRopqrvHe",
      req,
      position: {
        x: position ? position.x : 0,
        y: position ? position.y + 42 : 42,
      },
      uniqueName: `sdk-examples_playlist_${id}_currentlyPlaying_frame`,
      urlSlug,
    });
  } catch (e) {
    console.log("Error adding playlist frame", e);
  }
};

export const addNextButton = async ({ id, position, req, urlSlug }) => {
  try {
    const nextAsset = await InteractiveAsset({
      id: "Dav4RWr8DEqJcleqry1e",
      req,
      position: {
        // x: position ? position.x + buttonsRadius : buttonsRadius, // Used when have additional buttons
        x: position ? position.x : 0,
        y: position ? position.y + 176 : 176,
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
    assetId: "Nmy0Omr1sYArNFBvMGev",
    pos: {
      x: position ? position.x - 176 : -176,
      y: position ? position.y + 860 : 860,
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
    assetId: "VpqHiGiUQlzc3SVpC0CQ",
    pos: {
      x: position ? position.x + 178 : 178,
      y: position ? position.y + 860 : 860,
    },
    req,
    text: "Next Page",
    uniqueName: `sdk-examples_playlist_${id}_control_next_page`,
    urlSlug,
    dataObject: { action: "next-page-clicked", jukeboxId: id },
  });
};

const addPageButton = async ({
  assetId,
  pos,
  req,
  text,
  uniqueName,
  urlSlug,
  dataObject,
}) => {
  const droppedAsset = await InteractiveAsset({
    id: assetId,
    req,
    position: pos,
    uniqueName,
    urlSlug,
  });

  try {
    await droppedAsset.updateScale(1.4);
  } catch (e) {
    return console.log(e);
  }
  // // Will replace this once have previous and next buttons.
  // const droppedAsset = await createText({
  //   pos,
  //   req,
  //   text,
  //   textSize: 20,
  //   textWidth: 150,
  //   uniqueName,
  //   urlSlug,
  // });

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
