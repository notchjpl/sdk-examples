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
    return res.json(result.data);
  } catch (e) {
    console.log(e.response);
    return res.status(403).send(e);
  }
}

// Can pass in a single ID or an array of IDs.
// Array is limited to 50 items per batch.
export async function getYoutubeVideoDetails(videoId, videoIDArray) {
  try {
    const params = `?part=contentDetails&statistics`;
    const toGet = videoIDArray ? videoIDArray.join() : videoId;
    const query = `&id=${toGet}&key=${process.env.GOOGLE_API_KEY}`;
    const result = await axios.get(
      `https://youtube.googleapis.com/youtube/v3/videos${params}${query}`
    );
    return result.data;
  } catch (e) {
    return res.status(403).send(e);
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
