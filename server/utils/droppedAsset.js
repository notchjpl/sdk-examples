// const axios = require("axios");
import { DroppedAsset } from "@rtsdk/topia";

const getAsset = async ({ assetId, urlSlug }) => {
  return await new DroppedAsset({
    apiKey: process.env.API_KEY,
    id: assetId,
    urlSlug,
  });
};

export const getDroppedAsset = async (req, res) => {
  const { assetId, urlSlug } = req.body;
  const droppedAsset = await getAsset({
    assetId,
    urlSlug,
  });
  res.json(droppedAsset);
};

export const updateMedia = async (req, res) => {
  const droppedAsset = await getAsset({
    assetId,
    urlSlug,
  });
  await droppedAsset
    .updateMediaType({ mediaLink })
    .then(() => {
      res.json({ success: true });
    })
    .catch((error) => res.json({ success: false, error }));
};

// module.exports = { getDroppedAsset, updateMedia };
