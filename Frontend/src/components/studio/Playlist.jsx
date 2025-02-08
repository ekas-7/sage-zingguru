import React from "react";

function Playlist({ playlist, playVideo }) {
  return (
    <div className="p-4 bg-white rounded-lg shadow-md w-full h-1/2 overflow-hidden">
      <h2 className="text-lg font-bold mb-4 bg-black text-white p-2 rounded-lg">
        Playlist
      </h2>

      <div className="h-[80%] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 space-y-4 pb-2">
        {playlist && playlist.length > 0 ? (
          playlist.map((item, index) => {
            const videoId = new URL(item.url).searchParams.get("v"); // Extract video ID
            const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`;

            return (
              <div
                key={index}
                className="flex items-center p-2 bg-gray-100 rounded-lg shadow-md hover:bg-gray-200 transition"
              >
                {/* Video Thumbnail */}
                <img
                  src={thumbnailUrl}
                  alt="Thumbnail"
                  className="w-16 h-10 rounded-md mr-3"
                />

                {/* Video Title (Shortened) */}
                <div className="flex-1 overflow-hidden">
                  <span className="text-sm font-medium block truncate">
                    {videoId}
                  </span>
                </div>

                {/* Play Button */}
                <button
                  className="bg-blue-500 text-white px-3 py-1 text-xs rounded hover:bg-blue-600"
                  onClick={() => playVideo(item.url)}
                >
                  Play
                </button>
              </div>
            );
          })
        ) : (
          <p className="text-gray-500 text-sm">No videos added yet.</p>
        )}
      </div>
    </div>
  );
}

export default Playlist;
