import axios from "axios";
// context
import { setMessage } from "@context";

export const addToAssetPlaylist = async ({
  apiKey,
  assetId,
  globalDispatch,
  urlSlug,
  videoInfo,
}) => {
  // If API Key is included in an input, send to backend and overwrite the server's default API Key.
  await axios
    .post("/backend/addtoassetplaylist", {
      apiKey,
      assetId,
      urlSlug,
      videoInfo,
    })
    .then((res) => {
      console.log(res);
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

export const playMediaInAsset = async ({
  apiKey,
  assetId,
  videoId,
  urlSlug,
  globalDispatch,
}) => {
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
