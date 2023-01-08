import axios from "axios";
export const updateMedia = async ({ assetId, mediaLink, urlSlug }) => {
  return await axios.post("/backend/updateMedia", {
    assetId,
    mediaLink,
    urlSlug,
  });
};
