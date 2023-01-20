import { addWebhookWithClick } from "./playlistGenerator.js";
import { createText, updateText } from "./text.js";

export const addTrack = async ({
  id,
  index,
  position,
  req,
  trackData,
  urlSlug,
  isCurrentlyPlaying,
}) => {
  const offset = 220 + index * 50;
  let pos = {
    x: position ? position.x : 0,
    y: position ? position.y + offset : offset,
  };
  const uniqueName = `sdk-examples_playlist_${id}_track_${index}`;

  try {
    const trackAsset = await createText({
      isCurrentlyPlaying,
      pos,
      req,
      text: trackData?.snippet?.title || "-",
      textSize: 12,
      textWidth: 300,
      uniqueName,
      urlSlug,
    });

    // TODO: Need to make so can send developer public key when adding webhook and specify that can add visitor session credentials.
    // TODO: Need to add clickType: webhook
    // TODO: Add clickType: "displayText" to the public API
    // TODO: Dropped text seems to high.  Need to set max height of asset?

    const description = `Play song by clicking here`;
    const title = "Track clicked";
    const dataObject = { action: "track-clicked", index, jukeboxId: id };

    const clickableTitle = `Playing ${trackData?.snippet?.title}...`;

    addWebhookWithClick({
      clickableTitle,
      dataObject,
      description,
      req,
      title,
      droppedAsset: trackAsset,
      req,
      urlSlug,
    });
  } catch (e) {
    console.log(e);
  }
};

export const addCurrentlyPlaying = ({
  id,
  position,
  req,
  trackData,
  urlSlug,
}) => {
  const startingY = position.y + 30;
  const date = new Date(0);
  date.setSeconds(trackData.duration / 1000);
  const timeString = date.toISOString().substring(11, 19);

  const createTextDefault = {
    isCurrentlyPlaying: false,
    urlSlug,
  };

  createText({
    ...createTextDefault,
    pos: { x: position.x, y: startingY },
    req,
    text: "Currently Playing",
    textSize: 40,
    textWidth: 400,
    uniqueName: `sdk-examples_playlist_${id}_playing_header`,
  });

  createText({
    ...createTextDefault,
    pos: { x: position.x, y: startingY + 60 },
    req,
    text: trackData?.snippet?.title,
    textSize: 20,
    textWidth: 600,
    uniqueName: `sdk-examples_playlist_${id}_playing_title`,
  });

  createText({
    ...createTextDefault,
    pos: { x: position.x, y: startingY + 100 },
    req,
    text: `${trackData?.snippet?.channelTitle} | ${timeString}`,
    textSize: 20,
    textWidth: 600,
    uniqueName: `sdk-examples_playlist_${id}_playing_subtitle`,
  });
};

export const updateCurrentlyPlaying = ({ id, req, trackData }) => {
  const date = new Date(0);
  date.setSeconds(trackData.duration / 1000);
  const timeString = date.toISOString().substring(11, 19);
  const updateTextDefault = {
    req,
  };

  updateText({
    ...updateTextDefault,
    text: `${trackData?.snippet?.title}`,
    uniqueName: `sdk-examples_playlist_${id}_playing_title`,
  });

  updateText({
    ...updateTextDefault,
    text: `${trackData?.snippet?.channelTitle} | ${timeString}`,
    uniqueName: `sdk-examples_playlist_${id}_playing_subtitle`,
  });
};
