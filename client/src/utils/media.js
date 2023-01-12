import axios from "axios";
// context
import { setMessage } from "@context";

export const playMediaInAsset = async ({
  apiKey,
  assetId,
  mediaLink,
  urlSlug,
  globalDispatch,
}) => {
  console.log("assetId to send", assetId);
  // If API Key is included in an input, send to backend and overwrite the server's default API Key.
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
