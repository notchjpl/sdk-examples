import axios from "axios";
export const updateMedia = async (update) => {
  return await axios.post("/backend/updatemedia", update);
};
