import { getAssetAndDataObject } from "../middleware/index.js";

export const getDroppedAsset = async (req, res) => {
  const { assetId, urlSlug } = req.body;
  const droppedAsset = await getAsset({
    assetId,
    urlSlug,
  });
  res.json(droppedAsset);
};

export const getDataObject = async (req, res) => {
  const droppedAsset = await getAssetAndDataObject(req);
  if (droppedAsset) {
    return res.json({
      success: true,
      assetId: req.body.assetId,
      dataObject: droppedAsset.dataObject,
    });
  } else {
    return res
      .status(502)
      .send({ error: "No dropped asset with that assetId", success: false });
  }
};

export const updateTextAsset = async (req, res) => {
  const { asset, assetText } = req.body;
  await asset.updateCustomText({}, assetText);
  return res.json({
    success: true,
  });
};
