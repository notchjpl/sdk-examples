import { getAssetAndDataObject } from "../../../middleware/index.js";
import {
  dropAsset,
  getDroppedAssetsWithUniqueName,
} from "../../../utils/apiCalls.js";

import { DroppedAsset } from "../../../utils/topiaInit.js";

export const createText = async ({
  apiKey,
  isCurrentlyPlaying,
  pos,
  text,
  textSize,
  textWidth,
  uniqueName,
  urlSlug,
}) => {
  const trackEntry = await dropAsset({
    body: {
      apiKey,
      assetId: "rXLgzCs1wxpx96YLZAN5", // Custom text asset
      position: pos,
      uniqueName, // ID here is the jukebox's assetId
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
      textSize,
      textWeight: "normal",
      textWidth,
    },
    text
  );
  return trackAsset;
};

export const updateText = async ({
  req,
  text,
  textOptions = {},
  uniqueName,
}) => {
  const { apiKey, urlSlug } = req.body;
  // TODO: Move to SDK
  const assets = await getDroppedAssetsWithUniqueName({
    apiKey,
    uniqueName,
    urlSlug,
  });

  const toUpdateAsset = assets?.data?.assets[0];
  if (!toUpdateAsset) return; // No asset to update - controls aren't in world.
  const assetId = toUpdateAsset.id;

  try {
    const droppedAsset = await DroppedAsset.create(assetId, urlSlug, {
      credentials: req.body,
    });
    try {
      await droppedAsset.updateCustomText(textOptions, text);
    } catch (e) {
      console.log("Can't update.  No asset found");
    }
  } catch (e) {
    console.log("Can't get.  No asset found");
  }
};
