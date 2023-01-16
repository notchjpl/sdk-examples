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
  const webhook = await publicAPI(apiKey).post(`/world/${urlSlug}/webhooks`, {
    assetId,
    dataObject,
    description,
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

    const droppedAsset = await publicAPI(apiKey).post(
      `/world/${urlSlug}/assets`,
      {
        assetId,
        position,
        uniqueName,
      }
    );
    if (res) res.json(droppedAsset);
    return droppedAsset;
  } catch (e) {
    console.log("Response", e.data);
    return e.data;
  }
};

export const getDroppedAssetsWithUniqueName = async ({
  apiKey,
  uniqueName,
  urlSlug,
}) => {
  try {
    const droppedAssets = await publicAPI(apiKey).post(
      `/world/${urlSlug}/assets-with-unique-name/${uniqueName}`
    );
    if (res) res.json(droppedAssets);
    return droppedAssets;
  } catch (e) {
    console.log("Response", e.data);
    return e.data;
  }
};

export const deleteAsset = async ({ apiKey, assetId, urlSlug }) => {
  try {
    await publicAPI(apiKey).delete(`/world/${urlSlug}/assets/${assetId}`);
  } catch (e) {
    console.log("Response", e.data);
  }
};
