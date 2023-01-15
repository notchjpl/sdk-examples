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
    console.log("Response", e.data.errors);
    return e.data;
  }
};
