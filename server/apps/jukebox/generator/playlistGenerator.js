// TODO: Add 'next page' and 'previous page' buttons to in-world playlist so can browse through the entire playlist

import { getAssetAndDataObject, World } from "../../../utils/index.js";
import {
  addCurrentlyPlayingFrame,
  addPlaylistFrame,
  addPreviousPageButton,
  addNextButton,
  addNextPageButton,
  updateShuffleButton,
} from "./buttons.js";
import { updatePlaylist } from "./updatePlaylist.js";

// TODO replace Track to change highlighting when it's playing

export const addPlaylistToWorld = async (req, res) => {
  try {
    const jukeboxAsset = await getAssetAndDataObject(req);
    const { apiKey, assetId, urlSlug } = req.body;

    const { dataObject, position } = jukeboxAsset;

    const addPosOffset = 150; // Where to start adding the in-world assets below jukebox

    addCurrentlyPlayingFrame({
      id: assetId,
      position: { ...position, y: position.y + addPosOffset },
      req,
      urlSlug,
    });

    addPlaylistFrame({
      id: assetId,
      position: { ...position, y: position.y + addPosOffset },
      req,
      urlSlug,
    });

    // Make sure Frame is added first for layering.
    // TODO: Add to API way to push Frame to back like can do in UI.
    setTimeout(() => {
      updatePlaylist({
        addPosOffset,
        dataObject,
        isAdding: true,
        position,
        req,
        // req: { ...req, body: { ...req.body, assetId: jukeboxAsset.id } },
      });
      addNextButton({
        id: assetId,
        position: { ...position, y: position.y + addPosOffset },
        req,
        urlSlug,
      });

      updateShuffleButton({
        id: assetId,
        isAdding: true,
        isPushed: dataObject.playlistShuffle,
        position: { ...position, y: position.y + addPosOffset },
        req,
        urlSlug,
      });

      addPreviousPageButton({
        id: assetId,
        position: { ...position, y: position.y + addPosOffset },
        req,
        urlSlug,
      });

      addNextPageButton({
        id: assetId,
        position: { ...position, y: position.y + addPosOffset },
        req,
        urlSlug,
      });
    }, 500);

    if (res) res.send("Success");
  } catch (e) {
    console.log("Error adding playlist to world", e);
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
          : // If you are developing on localhost, use ngrok to create a tunnel and input it here
            "https://1724-2603-8000-c001-4f05-4865-f9b9-d3bb-4435.ngrok.io";
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
    console.log("Error adding webhook", e);
  }
};

export const removePlaylistFromWorld = async (req, res) => {
  const { apiKey, assetId, urlSlug } = req.body;
  try {
    const world = World.create(urlSlug, { credentials: req.body });
    const droppedAssets = await world.fetchDroppedAssetsWithUniqueName({
      isPartial: true,
      uniqueName: `sdk-examples_playlist_${assetId}`,
    });
    if (droppedAssets && droppedAssets.length)
      droppedAssets.forEach((droppedAsset) => {
        try {
          droppedAsset.deleteDroppedAsset();
        } catch (e) {
          console.log("Error on delete dropped asset", e);
        }
      });
  } catch (e) {
    console.log("Error removing playlist", e?.response?.status || e);
  }
  if (res) res.send("Success");
};
