import { google } from "googleapis";
import path from "path";
import { authenticate } from "@google-cloud/local-auth";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// initialize the Youtube API library
const youtube = google.youtube("v3");

export async function initializeGoogle() {
  const auth = await authenticate({
    // get OAuth 2.0 Client ID credentials from https://console.cloud.google.com/apis/credentials
    keyfilePath: path.join(__dirname, "../oauth2.keys.json"),
    scopes: ["https://www.googleapis.com/auth/youtube"],
  });
  google.options({ auth });
}

// https://github.com/googleapis/google-api-nodejs-client/tree/main/samples/youtube
export async function youtubeSearch(q) {
  const res = await youtube.search.list({
    part: "id,snippet",
    q,
  });
  console.log(res.data);
  return res.data;
}
