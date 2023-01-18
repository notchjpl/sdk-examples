// Using this until we have available in SDK.
import { publicAPI } from "./index.js";

export const addWebhook = async (req, res) => {
  const {
    apiKey,
    assetId,
    dataObject,
    description,
    title,
    type,
    url,
    urlSlug,
  } = req.body;
  let key = apiKey || process.env.API_KEY;
  const webhook = await publicAPI(key).post(`/world/${urlSlug}/webhooks`, {
    active: true,
    assetId,
    dataObject,
    description,
    enteredBy: "",
    isUniqueOnly: false,
    title,
    type,
    url,
    urlSlug,
  });
  if (res) res.json(webhook);
  return webhook;
};

export const dropAsset = async (req, res) => {
  try {
    const { apiKey, assetId, position, uniqueName, urlSlug } = req.body;

    let key = apiKey || process.env.API_KEY;
    const droppedAsset = await publicAPI(key).post(`/world/${urlSlug}/assets`, {
      assetId,
      position,
      uniqueName,
    });
    if (res) res.json(droppedAsset);
    return droppedAsset;
  } catch (e) {
    console.log("Response", e.data);
    return e.data;
  }
};

export const getDroppedAssetsWithUniqueName = async ({
  apiKey,
  partial,
  uniqueName,
  urlSlug,
}) => {
  try {
    const isPartial = !!partial;
    let key = apiKey || process.env.API_KEY;
    const droppedAssets = await publicAPI(key).get(
      `/world/${urlSlug}/assets-with-unique-name/${uniqueName}?partial=${isPartial}`
    );
    return droppedAssets;
  } catch (e) {
    console.log(e);
    return { success: false };
    // console.log("Get Assets with Unique Name Error", e);
    // return e;
  }
};

export const deleteAsset = async ({ apiKey, assetId, urlSlug }) => {
  try {
    let key = apiKey || process.env.API_KEY;
    await publicAPI(key).delete(`/world/${urlSlug}/assets/${assetId}`);
  } catch (e) {
    console.log("Delete Asset Error", e);
  }
};
