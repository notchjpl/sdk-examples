// Using this until we have available in SDK.
import { publicAPI } from "./index.js";

export const deleteAsset = async ({ apiKey, assetId, urlSlug }) => {
  try {
    let key = apiKey || process.env.API_KEY;
    await publicAPI(key).delete(`/world/${urlSlug}/assets/${assetId}`);
  } catch (e) {
    console.log("Delete Asset Error", e);
  }
};
// '/world/chris/assets-with-unique-name/sdk-examples_playlist_P9n6LXMZGqMXOsOufCYv?partial=true'
// '/world/chris/assets-with-unique-name/sdk-examples_playlist_P9n6LXMZGqMXOsOufCYv?partial=true&reversed=false'
