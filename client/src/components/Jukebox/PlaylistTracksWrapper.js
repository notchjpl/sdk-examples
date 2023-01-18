import React from "react";
import PropTypes from "prop-types";
import { useGlobalDispatch, useGlobalState } from "@context";
import { VideoTrack } from "@components";

// Should add pagination
export const PlaylistTracksWrapper = ({
  assetId,
  dataObject,
  handleRemoveFromPlaylist,
  play,
}) => {
  // context
  const globalDispatch = useGlobalDispatch();
  const globalState = useGlobalState();

  const urlSlug = globalState.urlSlug;
  const apiKey = localStorage.getItem("apiKey");

  if (!dataObject || !dataObject.mediaLinkPlaylist) return <div />;
  // Used to indicate which song is currently playing
  const { lastPlaylistUniqueEntryIdPlayed } = dataObject;
  return (
    dataObject.mediaLinkPlaylist
      // .slice(0, 20)
      .map((item, index) => {
        const { id } = item;
        if (!item.id || !item.snippet) return;

        return (
          <VideoTrack
            key={id + item.timeAdded}
            play={() =>
              play({
                apiKey,
                assetId,
                index,
                globalDispatch,
                urlSlug,
                videoId: id,
                videoInfo: item,
              })
            }
            playing={lastPlaylistUniqueEntryIdPlayed === item.uniqueEntryId}
            removeFromPlaylist={() => handleRemoveFromPlaylist(index)}
            videoInfo={item}
            youtubeId={id}
          />
        );
      })
  );
};

PlaylistTracksWrapper.propTypes = {
  assetId: PropTypes.string.isRequired,
  dataObject: PropTypes.object,
  handleRemoveFromPlaylist: PropTypes.func,
  play: PropTypes.func,
};
