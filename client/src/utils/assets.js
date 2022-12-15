import { publicAPI } from "./publicAPI";
export const setAssetMedia = ({
  apiKey,
  urlSlug,
  assetId,
  mediaLink,
  callback,
}) => {
  publicAPI(apiKey)
    // .get(`/world/${urlSlug}/visitors`)
    // .then((response) => {
    //   const { data } = response;

    // publicAPI(apiKey)
    .put(`/world/${urlSlug}/assets/${assetId}/change-media-type`, {
      mediaType: "link",
      mediaLink,
      isVideo: true,
      syncUserMedia: true,
    })
    .then((response) => {});
  // });
};
