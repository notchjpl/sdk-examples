import { google } from "googleapis";
import path from "path";
// import { authenticate } from "@google-cloud/local-auth";
import { fileURLToPath } from "url";
import axios from "axios";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// initialize the Youtube API library
const youtube = google.youtube("v3");

// Can be used to leverage a user's account
// export async function initializeGoogle() {
//   const auth = await authenticate({
//     // get OAuth 2.0 Client ID credentials from https://console.cloud.google.com/apis/credentials
//     keyfilePath: path.join(__dirname, "../oauth2.keys.json"),
//     scopes: ["https://www.googleapis.com/auth/youtube"],
//   });
//   google.options({ auth });
// }

// // https://github.com/googleapis/google-api-nodejs-client/tree/main/samples/youtube
// export async function youtubeSearch(q) {
//   await initializeGoogle();
//   const res = await youtube.search.list({
//     part: "id,snippet",
//     q,
//   });
//   console.log(res.data);
//   return res.data;
// }

const cleanYoutubeVideo = (item) => {
  let cleaned = item;
  cleaned.duration = YTDurationToMilliseconds(item.contentDetails.duration);
  cleaned.viewCount = item.statistics.viewCount;
  // Get rid of unnecessary information to reduce payloads
  delete cleaned.contentDetails;
  delete cleaned.statistics;
  delete cleaned.snippet.thumbnails;
  delete cleaned.snippet.description; // Some of these are extremely long and will take up too much space
  delete cleaned.snippet.localized;
  delete cleaned.snippet.defaultAudioLanguage;
  delete cleaned.snippet.categoryId;
  delete cleaned.snippet.tags; // Could be useful for a more complex playlist search, but not necessary for our purposes.
  return cleaned;
};

// Uses platform API key instead of Oauth credential (must be retrieved from https://console.cloud.google.com/apis/credentials)
export async function youtubeSearch(req, res) {
  try {
    const { q } = req.body;
    const maxResults = 25;
    // Can add &order=viewCount
    const params = `?part=snippet&type=video&videoEmbeddable=true`;
    const query = `&maxResults=${maxResults}&q=${q}&key=${process.env.GOOGLE_API_KEY}`;
    const result = await axios.get(
      `https://youtube.googleapis.com/youtube/v3/search${params}${query}`
    );

    const itemsMap = result.data.items.map((item) => {
      return item.id.videoId;
    });
    // YouTube makes you do a detail lookup.  We need video duration for playlist to work properly, which can only look up separately.
    // Batching YouTube API calls reduces quota usage.
    const videoDetailsData = await getYoutubeVideoDetails(null, itemsMap);

    let toReturn = videoDetailsData.items.map((item) =>
      cleanYoutubeVideo(item)
    );

    return res.json(toReturn);
  } catch (e) {
    console.log("Error", e.response);
    return res.status(403).send(e);
  }
}

export async function fetchYouTubeVideoInfo(req, res) {
  const result = await getYoutubeVideoDetails(req.body.id);
  const videoInfo = cleanYoutubeVideo(result.items[0]);
  res.json(videoInfo);
}

// Can pass in a single ID or an array of IDs.
// Array is limited to 50 items per batch.
export async function getYoutubeVideoDetails(videoId, videoIDArray) {
  try {
    const params = `?part=contentDetails&part=statistics&part=snippet`;
    const toGet = videoIDArray ? videoIDArray.join() : videoId;
    const query = `&id=${toGet}&key=${process.env.GOOGLE_API_KEY}`;
    const result = await axios.get(
      `https://youtube.googleapis.com/youtube/v3/videos${params}${query}`
    );

    return result.data;
  } catch (e) {
    return console.log("Details Error", e);
  }
}

export function YTDurationToMilliseconds(duration) {
  var match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);

  match = match.slice(1).map(function (x) {
    if (x != null) {
      return x.replace(/\D/, "");
    }
  });

  var hours = parseInt(match[0]) || 0;
  var minutes = parseInt(match[1]) || 0;
  var seconds = parseInt(match[2]) || 0;

  return (hours * 3600 + minutes * 60 + seconds) * 1000;
}
