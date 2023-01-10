import axios from "axios";

const BASE_URL = process.env.API_URL || "http://localhost:3001";
let backendAPI = axios;

const initBackendAPI = function () {
  backendAPI = null;
  backendAPI = axios;
};

const setupBackendAPI = (interactiveParams) => {
  backendAPI = axios.create({
    baseURL: `${BASE_URL}/backend`,
    headers: {
      "Content-Type": "application/json",
    },
  });
  backendAPI.interceptors.request.use((config) => {
    if (!config?.data) config.data = {};
    config.data["assetId"] = interactiveParams.assetId;
    config.data["playerId"] = interactiveParams.playerId;
    config.data["interactiveNonce"] = interactiveParams.interactiveNonce;
    config.data["interactivePublicKey"] =
      interactiveParams.interactivePublicKey;
    config.data["urlSlug"] = interactiveParams.urlSlug;

    return config;
  });
};

export { backendAPI, initBackendAPI, setupBackendAPI };

export default () => {
  return backendAPI;
};
