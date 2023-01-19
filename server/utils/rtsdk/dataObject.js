import { DroppedAsset } from "./index.js";

// Middleware to get the asset and object
export const getAssetAndDataObject = async (req) => {
  const { assetId, urlSlug } = req.body;

  // Can do .create instead of .get if you don't need all the data inside the dropped asset
  const droppedAsset = await DroppedAsset.get(assetId, urlSlug, {
    credentials: req.body,
  });

  // droppedAsset.get();

  await droppedAsset.fetchDroppedAssetDataObject();
  return droppedAsset;
};
