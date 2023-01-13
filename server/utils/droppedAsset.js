import { DroppedAsset } from "@rtsdk/topia";

export const getDroppedAsset = async (req, res) => {
  const { assetId, urlSlug } = req.body;
  const droppedAsset = await getAsset({
    assetId,
    urlSlug,
  });
  res.json(droppedAsset);
};

export const updateMedia = async (req, res) => {
  try {
    const { apiKey, assetId, mediaLink, mediaName, urlSlug } = req.body;
    const droppedAsset = new DroppedAsset({
      apiKey: apiKey || process.env.API_KEY, // If an API Key is sent from frontend, use that.  Otherwise, use from .env
      id: assetId,
      args: {},
      urlSlug,
    });

    await droppedAsset.updateMediaType({
      mediaLink,
      isVideo: true,
      mediaName, // Will only change media name if one is sent from the frontend.
      mediaType: "link",
    });
    res.json({ success: true });
  } catch (error) {
    console.log(error);
    res.status(502).send({ error, success: false });
  }
};

export const addToAssetPlaylist = async (req, res) => {
  try {
    const { apiKey, assetId, videoInfo, urlSlug } = req.body;
    const droppedAsset = new DroppedAsset({
      apiKey: apiKey || process.env.API_KEY, // If an API Key is sent from frontend, use that.  Otherwise, use from .env
      id: assetId,
      args: {},
      urlSlug,
    });

    await droppedAsset.fetchDroppedAssetDataObject();
    let { dataObject } = droppedAsset;

    dataObject.mediaLinkPlaylist = dataObject.mediaLinkPlaylist || [];
    let { snippet, etag, id, kind } = videoInfo;
    delete snippet.thumbnails; // Unnecessary and takes up space

    dataObject.mediaLinkPlaylist.push({
      etag,
      id,
      kind,
      snippet,
    });

    await droppedAsset.updateDroppedAssetDataObject(dataObject);
    res.json({ success: true, dataObject });
  } catch (error) {
    console.log(error);
    res.status(502).send({ error, success: false });
  }
};
