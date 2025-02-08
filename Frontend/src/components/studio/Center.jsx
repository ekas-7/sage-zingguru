import React, { useState } from "react";
import ReactPlayer from "react-player/youtube";
import Playlist from "./Playlist";

function Center({ playlist }) {
  const [currentVideo, setCurrentVideo] = useState(
    ""
  );

  const playVideo = (url) => {
    setCurrentVideo(url);
  };

  return (
    <div className="h-full flex flex-col items-center p-4 bg-white rounded-lg shadow-lg w-full">
      {/* Playlist Component */}
      {currentVideo && 
        <div className="mt-6 w-full flex justify-center">
          <div className="w-full max-w-2xl aspect-video rounded-lg overflow-hidden shadow-md">
            <ReactPlayer url={currentVideo} width="100%" height="100%" controls />
          </div>
        </div>
      }
      
      <Playlist playlist={playlist} playVideo={playVideo} />

      {/* Video Player Section */}
      
    </div>
  );
}

export default Center;
