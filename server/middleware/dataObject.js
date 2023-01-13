import { DroppedAsset } from "../utils/index.js";

// Middleware to get the asset and object
export const getAssetAndDataObject = async (req) => {
  const {
    assetId,
    urlSlug,
    interactiveNonce,
    playerId,
    interactivePublicKey,
  } = req.body;

  let credentials = {};
  if (interactivePublicKey) {
    credentials = {
      assetId,
      interactiveNonce,
      playerId,
    };
  }

  const droppedAsset = DroppedAsset.create(assetId, urlSlug, {
    creds: credentials,
  });

  await droppedAsset.fetchDroppedAssetDataObject();
  return droppedAsset;
};
