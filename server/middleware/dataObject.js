import { DroppedAsset } from "../utils/index.js";

// Middleware to get the asset and object
export const getAssetAndDataObject = async (req) => {
  const { assetId, urlSlug } = req.body;

  const droppedAsset = DroppedAsset.create(assetId, urlSlug, {
    credentials: req.body,
  });

  await droppedAsset.fetchDroppedAssetDataObject();
  return droppedAsset;
};
