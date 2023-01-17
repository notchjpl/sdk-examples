import { getAssetAndDataObject } from "../../../middleware/index.js";
import { dropAsset } from "../../../utils/apiCalls.js";

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
