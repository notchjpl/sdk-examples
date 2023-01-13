import axios from "axios";

export const getDataObject = async ({ assetId, urlSlug, apiKey }) => {
  try {
    const dataObject = await axios.post("/backend/getdataobject", {
      apiKey,
      assetId,
      urlSlug,
    });
    console.log("Retrieved data object", dataObject);
    return dataObject;
  } catch (e) {
    console.log(e);
  }
};
