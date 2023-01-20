// TODO: Add 'next page' and 'previous page' buttons to in-world playlist so can browse through the entire playlist

import { getAssetAndDataObject, World } from "../../../utils/index.js";
import { addPlaylistFrame, addNextButton } from "./buttons.js";
import { updatePlaylist } from "./updatePlaylist.js";

// TODO replace Track to change highlighting when it's playing

export const addPlaylistToWorld = async (req, res) => {
  try {
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
      req,
      urlSlug,
    });

    if (res) res.send("Success");
  } catch (e) {
    // console.log(e);
    if (res) res.status(403).send(e);
  }
};

export const addWebhookWithClick = async ({
  clickableTitle,
  dataObject,
  description,
  droppedAsset,
  req,
  title,
  urlSlug,
}) => {
  try {
    if (droppedAsset && droppedAsset.updateClickType) {
      await droppedAsset.updateClickType({
        clickType: "displayText",
        clickableDisplayTextHeadline: clickableTitle,
        clickableDisplayTextDescription: "-",
      });

      // Webhook
      const type = "assetClicked";
      const base =
        process.env.NODE_ENV === "production"
          ? "https://" + req.get("host")
          : "https://833b-2603-8000-c001-4f05-882c-4e07-848c-f2f1.ngrok.io";
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
    } else throw "No asset found";
  } catch (e) {
    console.log("Error", e);
  }
};

export const removePlaylistFromWorld = async (req, res) => {
  const { apiKey, assetId, urlSlug } = req.body;
  const world = World.create(urlSlug, { credentials: req.body });
  try {
    const droppedAssets = await world.fetchDroppedAssetsWithUniqueName({
      isPartial: true,
      uniqueName: `sdk-examples_playlist_${assetId}`,
    });
    if (droppedAssets && droppedAssets.length)
      droppedAssets.forEach((droppedAsset) => {
        droppedAsset.deleteDroppedAsset();
      });
  } catch (e) {
    console.log("No unique names", e?.response?.status || e);
  }
  if (res) res.send("Success");
};
