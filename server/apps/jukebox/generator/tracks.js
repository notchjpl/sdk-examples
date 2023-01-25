import { addWebhookWithClick } from "./playlistGenerator.js";
import { createText, updateText } from "./text.js";

const mainColor = "#f84d21";

export const addTrack = async ({
  id,
  index,
  position,
  req,
  trackData,
  urlSlug,
  isCurrentlyPlaying,
}) => {
  const yOffset = 325 + index * 50;
  let pos = {
    x: position ? position.x : 0,
    y: position ? position.y + yOffset : yOffset,
  };
  const uniqueName = `sdk-examples_playlist_${id}_track_${index}`;

  try {
    const trackAsset = await createText({
      isCurrentlyPlaying,
      pos,
      req,
      text: trackData?.snippet?.title || "-",
      textColor: isCurrentlyPlaying ? mainColor : "#000000",
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
    // Keeping the webhook data clean and adding / updating the asset's data object when song changes rather than updating the webhook's data object.
    const dataObject = { action: "track-clicked", index, jukeboxId: id };

    const clickableTitle = `Playing track ${index + 1}`;

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
    console.log("Error adding / updating track", e);
  }
};

export const addCurrentlyPlaying = ({
  id,
  position,
  req,
  trackData,
  urlSlug,
}) => {
  const startingY = position.y + 120;
  let timeString = "";
  if (!trackData)
    return console.log("Not adding currently playing, no track data");
  if (trackData.duration) {
    const date = new Date(0);
    date.setSeconds(trackData.duration / 1000);
    timeString = date.toISOString().substring(11, 19);
  }

  const createTextDefault = {
    isCurrentlyPlaying: false,
    urlSlug,
  };

  // createText({
  //   ...createTextDefault,
  //   pos: { x: position.x, y: startingY },
  //   req,
  //   text: "Currently Playing",
  //   textSize: 40,
  //   textWidth: 400,
  //   uniqueName: `sdk-examples_playlist_${id}_playing_header`,
  // });

  let titleText = trackData?.snippet?.title;
  if (titleText.length > 75) titleText = titleText.slice(0, 75) + "...";

  createText({
    ...createTextDefault,
    pos: { x: position.x, y: startingY },
    req,
    text: titleText,
    textColor: mainColor,
    textSize: 16,
    textWidth: 315,
    uniqueName: `sdk-examples_playlist_${id}_playing_title`,
  });

  createText({
    ...createTextDefault,
    pos: { x: position.x, y: startingY + 30 },
    req,
    text: `${trackData?.snippet?.channelTitle} | ${timeString}`,
    textColor: mainColor,
    textSize: 16,
    textWidth: 315,
    uniqueName: `sdk-examples_playlist_${id}_playing_subtitle`,
  });
};

export const updateCurrentlyPlaying = ({ id, req, trackData }) => {
  const date = new Date(0);
  if (!trackData)
    return console.log("Not updating currently playing, no track data.");
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
