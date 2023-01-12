import axios from "axios";
// context
import { setMessage } from "@context";

export const playMediaInAsset = async ({
  apiKey,
  assetId,
  videoId,
  urlSlug,
  globalDispatch,
}) => {
  console.log("assetId to send", assetId);
  // If API Key is included in an input, send to backend and overwrite the server's default API Key.
  const mediaLink = `https://www.youtube.com/watch?v=${videoId}`;
  await axios
    .post("/backend/updatemedia", {
      apiKey,
      assetId,
      mediaLink,
      urlSlug,
    })
    .then(() => {
      setMessage({
        dispatch: globalDispatch,
        message: "Success!",
        messageType: "success",
      });
    })
    .catch((error) => {
      setMessage({
        dispatch: globalDispatch,
        message: error,
        messageType: "error",
      });
    });
};
