import backendAPI from "@utils/backendApi";

export const getDataObject = async ({ assetId, urlSlug, apiKey }) => {
  try {
    const result = await backendAPI().post("/getdataobject", {
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
