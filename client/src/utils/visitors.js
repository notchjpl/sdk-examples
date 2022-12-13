import { publicAPI } from "./publicAPI";
export const lassoAllVisitors = ({ apiKey, asset, urlSlug, callback }) => {
  publicAPI(apiKey)
    .get(`/world/${urlSlug}/visitors`)
    .then((response) => {
      const { data } = response;

      Object.values(data).forEach((visitor) => {
        console.log(visitor);
        publicAPI(apiKey)
          .put(`/world/${urlSlug}/visitors/${visitor.playerId}/move`, {
            moveTo: {
              x: asset.position.x,
              y: asset.position.y,
            },
            teleport: false,
          })
          .then((response) => {});
      });
    });
};
