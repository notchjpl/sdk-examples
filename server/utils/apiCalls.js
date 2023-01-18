// Using this until we have available in SDK.
import { publicAPI } from "./index.js";

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
