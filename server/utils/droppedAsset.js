import { DroppedAsset } from "@rtsdk/topia";

const getAsset = async ({ assetId, urlSlug }) => {
  // return new Promise((resolve, rej) => {
  //   try {
  //     resolve();
  const asset = await new DroppedAsset({
    apiKey: process.env.API_KEY,
    id: assetId,
    urlSlug,
  });
  return asset;
  //   } catch (e) {
  //     return rej();
  //   }
  // });
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
  const { apiKey, assetId, urlSlug } = req.body;
  // const droppedAsset = await getAsset({
  //   assetId,
  //   urlSlug,
  // });
  const droppedAsset = new DroppedAsset({
    apiKey: apiKey || process.env.API_KEY, // If an API Key is sent from frontend, use that.  Otherwise, use from .env
    id: assetId,
    urlSlug,
  });

  await droppedAsset
    .updateMediaType({ mediaLink })
    .then(() => {
      res.json({ success: true });
    })
    .catch((error) => res.json({ success: false, error }));
};
