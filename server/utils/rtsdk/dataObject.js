import { DroppedAsset } from "./index.js";

// Middleware to get the asset and object
export const getAssetAndDataObject = async (req) => {
  const { assetId, urlSlug } = req.body;

  try {
    // Can do .create instead of .get if you don't need all the data inside the dropped asset
    const droppedAsset = await DroppedAsset.get(assetId, urlSlug, {
      credentials: req.body,
    });

    // droppedAsset.get();

    await droppedAsset.fetchDroppedAssetDataObject();
    return droppedAsset;
  } catch (e) {
    console.log("Error getting asset and data object", e);
  }
};
