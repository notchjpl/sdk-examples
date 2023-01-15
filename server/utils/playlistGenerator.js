import { getAssetAndDataObject } from "../middleware/index.js";
import { addWebhook, dropAsset } from "./apiCalls.js";
import { getPlayedCurrentIndex } from "./playlist.js";

// TODO replace Track to change highlighting when it's playing

export const addPlaylistToWorld = async (req, res) => {
  const jukeboxAsset = await getAssetAndDataObject(req);

  const { dataObject, position } = jukeboxAsset;

  const {
    lastPlaylistUniqueEntryIdPlayed,
    mediaLinkPlaylist,
    playlistShuffle,
  } = dataObject;
  // TODO Add shuffle button.  Blue if shuffle active.  Gray if not.
  // TODO Add next button.
  // TODO Add volume up and volume down button
  let currentIndex = 0;
  // If there was a song played, start with that index.
  if (lastPlaylistUniqueEntryIdPlayed)
    currentIndex = getPlayedCurrentIndex(
      mediaLinkPlaylist,
      lastPlaylistUniqueEntryIdPlayed
    );
  // Show the previous song at the top
  if (currentIndex > 0) currentIndex--;
  for (var i = currentIndex; i < 10; i++) {
    const { apiKey, id, urlSlug } = req;

    addTrack({
      apiKey,
      id,
      index: i,
      position,
      trackData: mediaLinkPlaylist[i],
      urlSlug,
    });
  }
  try {
  } catch (e) {
    // console.log(e);
    if (res) res.status(403).send(e);
  }
};

const addTrack = async ({
  apiKey,
  id,
  index,
  position,
  trackData,
  urlSlug,
}) => {
  const videoId = trackData.id;
  const trackEntry = await dropAsset({
    body: {
      apiKey,
      assetId: "rXLgzCs1wxpx96YLZAN5", // Custom text asset
      // Doing this as quick fix until we add position to SDK class
      position: {
        x: position ? position.x : 0,
        y: position ? position.y + 100 + index * 50 : 0 + 100 + index * 50,
      },
      uniqueName: `playlist_${id}_track_${index}`, // ID here is the jukebox's assetId
      urlSlug,
    },
  });

  const assetId = trackEntry.data.id;
  console.log("Track entry", assetId);

  const trackAsset = await getAssetAndDataObject({
    body: {
      assetId,
      urlSlug,
    },
  });

  trackAsset.updateCustomText(
    {
      textColor: "#000000",
      textFontFamily: "Arial",
      textSize: 12,
      textWeight: "normal",
      textWidth: 200,
    },
    trackData.snippet.title
  );

  const description = "Play next song!";
  const title = "Next button clicked";
  const type = "assetClicked";
  const url =
    "https://9bb3-2603-8000-c001-4f05-e9b8-5fc9-6a6c-b46b.ngrok.io/webhooks/playlist";
  const dataObject = {
    action: "track-clicked",
    index,
    assetId,
    videoId,
  };

  const trackWebhook = await addWebhook({
    body: {
      apiKey,
      assetId,
      dataObject,
      description,
      title,
      type,
      url,
      urlSlug,
    },
  });

  console.log("Webhook added");
};

const removeTrack = async ({ apiKey, id, index, position, urlSlug }) => {
  const trackEntry = await deleteAsset({
    body: {
      apiKey,
      assetId: "rXLgzCs1wxpx96YLZAN5", // Custom text asset
      position: { x: position.x + 20, y: position.y + 200 },
      uniqueName: `playlist_${id}_track_${index}`,
      urlSlug,
    },
  });
};
