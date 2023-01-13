import axios from "axios";

export const getDataObject = async ({ assetId, urlSlug, apiKey }) => {
  try {
    const result = await axios.post("/backend/getdataobject", {
      apiKey,
      assetId,
      urlSlug,
    });
    if (result.data.success) {
      return result.data.dataObject;
    } else return console.log("ERROR getting data object");
  } catch (e) {
    console.log(e);
  }
};
