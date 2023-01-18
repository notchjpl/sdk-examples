import axios from "axios";

const BASE_URL = process.env.API_URL || "";
let externalAPI = axios.create({
  baseURL: `${BASE_URL}/external`,
  headers: {
    "Content-Type": "application/json",
  },
});

export const youtubeSearch = async (q) => {
  const result = await externalAPI.post("youtubesearch", { q });
  return result.data;
};

export const getYoutubeVideoInfo = async (id) => {
  const result = await externalAPI.post("youtubevideoinfo", { id });
  return result.data;
};
