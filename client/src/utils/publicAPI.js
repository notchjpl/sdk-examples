import axios from "axios";

export const publicAPI = (apiKey) => {
  return axios.create({
    baseURL: "https://api.topia.io/api",
    headers: {
      Authorization: apiKey,
      "Content-Type": "application/json",
    },
  });
};

export const fetchAssets = (apiKey, urlSlug, callback) => {
  publicAPI(apiKey)
    .get(`/world/${urlSlug}/assets`)
    .then((response) => {
      const { data } = response;
      let assetsToDisplay = {};
      data.forEach((element) => {
        if (element.uniqueName) assetsToDisplay[element.id] = element;
      });
      callback(assetsToDisplay);
    });
};
