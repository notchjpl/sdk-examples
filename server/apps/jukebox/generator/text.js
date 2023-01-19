import { InteractiveAsset, World } from "../../../utils/index.js";

export const createText = async ({
  isCurrentlyPlaying,
  pos,
  req,
  text,
  textSize,
  textWidth,
  uniqueName,
  urlSlug,
}) => {
  const trackAsset = await InteractiveAsset({
    id: "rXLgzCs1wxpx96YLZAN5",
    req,
    position: pos,
    uniqueName,
    urlSlug,
  });

  await trackAsset.updateCustomTextAsset(
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
  newDataObject,
}) => {
  const { urlSlug } = req.body;
  // TODO: Move to SDK

  try {
    const world = World.create(urlSlug, { credentials: req.body });
    const droppedAssets = await world.fetchDroppedAssetsWithUniqueName({
      uniqueName,
    });
    await droppedAssets[0].updateCustomTextAsset(textOptions, text);
    droppedAssets.updateDroppedAssetDataObject(newDataObject);
  } catch (e) {
    console.log("Can't update.  No asset found", e?.response?.status || e);
  }
};
