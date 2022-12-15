import { publicAPI } from "./publicAPI";
export const setAssetMedia = ({
  apiKey,
  urlSlug,
  assetId,
  mediaLink,
  callback,
}) => {
  publicAPI(apiKey)
    // .get(`/world/${urlSlug}/assets/${assetId}`)
    // .then((response) => {
    //   const { data } = response;

    //   publicAPI(apiKey)
    .put(`/world/${urlSlug}/assets/${assetId}/change-media-type`, {
      mediaType: "link",
      mediaLink,
      // audioVolume: data.audioVolume || 4,
      // audioRadius: data.audioRadius || 4,
      isVideo: true,
      syncUserMedia: true,
    })
    .then((response) => {});
  // });
};
