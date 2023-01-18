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
  try {
    const droppedAsset = await getAssetAndDataObject(req);
    if (droppedAsset) {
      return res.json({
        success: true,
        assetId: req.body.assetId,
        dataObject: droppedAsset.dataObject,
      });
    } else {
      console.log("No dropped asset");
      return res
        .status(502)
        .send({ error: "No dropped asset with that assetId", success: false });
    }
  } catch (e) {
    console.log(e);
  }
};
