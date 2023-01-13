import { DroppedAsset } from "@rtsdk/topia";

// Middleware to get the asset and object
export const getAssetAndDataObject = async (req) => {
  const { apiKey, assetId, urlSlug } = req.body;
  const droppedAsset = new DroppedAsset({
    apiKey: apiKey || process.env.API_KEY, // If an API Key is sent from frontend, use that.  Otherwise, use from .env
    id: assetId,
    args: {},
    urlSlug,
  });

  await droppedAsset.fetchDroppedAssetDataObject();
  return droppedAsset;
};
