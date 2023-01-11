import axios from "axios";

const BASE_URL = process.env.API_URL || "http://localhost:3001";
let externalAPI = axios.create({
  baseURL: `${BASE_URL}/external`,
  headers: {
    "Content-Type": "application/json",
  },
});

export const youtubeSearch = async (params) => {
  const result = await externalAPI.get("youtube", params);
  return result;
};
