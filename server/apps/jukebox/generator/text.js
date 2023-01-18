import { Asset, World } from "../../../utils/topiaInit.js";

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
  const asset = Asset.create("rXLgzCs1wxpx96YLZAN5");
  const trackAsset = await asset.drop({
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
}) => {
  const { apiKey, urlSlug } = req.body;
  // TODO: Move to SDK
  const world = World.create(urlSlug, { credentials: req.body });
  const droppedAssets = await world.fetchDroppedAssetsWithUniqueName({
    uniqueName,
  });

  try {
    await droppedAssets[0].updateCustomTextAsset(textOptions, text);
  } catch (e) {
    console.log("Can't update.  No asset found");
  }
};
