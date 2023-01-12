import axios from "axios";

const BASE_URL = process.env.API_URL || "http://localhost:3001";
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
