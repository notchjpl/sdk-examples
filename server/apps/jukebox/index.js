import {
  addPlaylistToWorld,
  removePlaylistFromWorld,
} from "./generator/playlistGenerator.js";
import {
  addToAssetPlaylist,
  removeFromAssetPlaylist,
  shufflePlaylist,
} from "./playlist.js";

import { updateMedia } from "./updateMedia.js";
import { playNextSongInPlaylist } from "./playNextSongInPlaylist.js";

export {
  addPlaylistToWorld,
  addToAssetPlaylist,
  playNextSongInPlaylist,
  removeFromAssetPlaylist,
  removePlaylistFromWorld,
  shufflePlaylist,
  updateMedia,
};
