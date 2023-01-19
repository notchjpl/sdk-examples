// TODO: Add 'next page' and 'previous page' buttons to in-world playlist so can browse through the entire playlist

import { getAssetAndDataObject, World } from "../../../utils/index.js";
import { addPlaylistFrame, addNextButton } from "./buttons.js";
import { updatePlaylist } from "./updatePlaylist.js";

// TODO: Change so if in development use one base and if in production, use server path
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
    req,
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
  clickableTitle,
  dataObject,
  description,
  title,
  droppedAsset,
  urlSlug,
}) => {
  try {
    await droppedAsset.updateClickType({
      clickType: "displayText",
      headline: clickableTitle,
      description: "Playing",
    });
  } catch (e) {
    console.log(e);
  }

  // Webhook
  const type = "assetClicked";
  const url = `${base}/webhooks/playlist`;

  await droppedAsset.addWebhook({
    isUniqueOnly: false,
    dataObject,
    description,
    title,
    type,
    url,
    urlSlug,
  });
};

export const removePlaylistFromWorld = async (req, res) => {
  const { apiKey, assetId, urlSlug } = req.body;
  const world = World.create(urlSlug, { credentials: req.body });
  try {
    const droppedAssets = await world.fetchDroppedAssetsWithUniqueName({
      isPartial: true,
      uniqueName: `sdk-examples_playlist_${assetId}`,
    });
    droppedAssets.forEach((droppedAsset) => {
      droppedAsset.deleteDroppedAsset();
    });
  } catch (e) {
    console.log("No unique names", e?.response?.status || e);
  }
  if (res) res.send("Success");
};
