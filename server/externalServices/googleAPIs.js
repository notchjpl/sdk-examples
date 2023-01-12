import { google } from "googleapis";
import path from "path";
import { authenticate } from "@google-cloud/local-auth";
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
export async function youtubeHighDefSearch(req, res) {
  try {
    const { q } = req.body;
    console.log(q);
    const maxResults = 25;
    const params = `?part=snippet&type=video&videoDefinition=high&order=viewCount&videoEmbeddable=true`;
    const query = `&maxResults=${maxResults}&q=${q}&key=${process.env.GOOGLE_API_KEY}`;
    const result = await axios.get(
      `https://youtube.googleapis.com/youtube/v3/search${params}${query}`
    );
    return res.json(result.data);
  } catch (e) {
    return res.status(401).send(e);
  }
  // await initializeGoogle();
  // const res = await youtube.search.list({
  //   part: "id,snippet",
  //   q,
  // });
  // console.log(res.data);
  // return res.data;
}
