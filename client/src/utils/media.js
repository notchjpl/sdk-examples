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

export const removeFromAssetPlaylist = async ({
  apiKey,
  assetId,
  globalDispatch,
  index,
  urlSlug,
}) => {
  try {
    const response = await axios.post("/backend/removefromassetplaylist", {
      apiKey,
      assetId,
      index,
      urlSlug,
    });

    console.log(response);
    if (!response.data.success)
      throw `Error removing asset from playlist. ${response.data.error}`;

    setMessage({
      dispatch: globalDispatch,
      message: "Success!",
      messageType: "success",
    });
    return response.data.dataObject;
  } catch (error) {
    setMessage({
      dispatch: globalDispatch,
      message: error,
      messageType: "error",
    });
  }
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
