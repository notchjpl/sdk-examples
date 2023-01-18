// TODO: Add 'next page' and 'previous page' buttons to in-world playlist so can browse through the entire playlist

import { getAssetAndDataObject } from "../../../middleware/index.js";
import {
  addWebhook,
  deleteAsset,
  getDroppedAssetsWithUniqueName,
} from "../../../utils/apiCalls.js";
import { getPlayedCurrentIndex } from "../playlist.js";
import { addTrack } from "./tracks.js";
import { addPlaylistFrame, addNextButton } from "./buttons.js";
import { updatePlaylist } from "./updatePlaylist.js";

const base = "https://833b-2603-8000-c001-4f05-882c-4e07-848c-f2f1.ngrok.io";

// TODO replace Track to change highlighting when it's playing

export const addPlaylistToWorld = async (req, res) => {
  const jukeboxAsset = await getAssetAndDataObject(req);
  const { apiKey, assetId, urlSlug } = req.body;

  const { dataObject, position } = jukeboxAsset;

  const addPosOffset = 150; // Where to start adding the in-world assets below jukebox
  updatePlaylist({
    addPosOffset,
    dataObject,
    isAdding: true,
    position,
    req,
    // req: { ...req, body: { ...req.body, assetId: jukeboxAsset.id } },
  });

  addPlaylistFrame({
    apiKey,
    id: assetId,
    position: { ...position, y: position.y + addPosOffset },
    urlSlug,
  });
  addNextButton({
    apiKey,
    id: assetId,
    position: { ...position, y: position.y + addPosOffset },
    urlSlug,
  });

  if (res) res.send("Success");
  try {
  } catch (e) {
    // console.log(e);
    if (res) res.status(403).send(e);
  }
};

export const addWebhookWithClick = async ({
  apiKey,
  clickableTitle,
  dataObject,
  description,
  title,
  droppedAsset,
  urlSlug,
}) => {
  await droppedAsset.updateClickType({
    clickType: "link",
    clickableLink: `https://topia.io`,
    clickableLinkTitle: clickableTitle,
  });

  // Webhook
  const type = "assetClicked";
  const url = `${base}/webhooks/playlist`;

  await addWebhook({
    body: {
      apiKey,
      assetId: droppedAsset.id,
      dataObject,
      description,
      title,
      type,
      url,
      urlSlug,
    },
  });
};

export const removePlaylistFromWorld = async (req, res) => {
  const { apiKey, assetId, urlSlug } = req.body;
  const droppedAssets = await getDroppedAssetsWithUniqueName({
    apiKey,
    partial: true, // Pulls all dropped assets with unique name that starts with 'uniqueName' below
    uniqueName: `sdk-examples_playlist_${assetId}`,
    urlSlug,
  });
  if (!droppedAssets || !droppedAssets.data || !droppedAssets.data.assets)
    return res.status(403).send("No playlist in world to remove");
  droppedAssets.data.assets.forEach((item) => {
    deleteAsset({
      apiKey,
      assetId: item.id,
      urlSlug,
    });
  });
  if (res) res.send("Success");
};
