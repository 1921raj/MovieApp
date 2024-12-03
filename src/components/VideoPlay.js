import React from 'react';
import { IoClose } from 'react-icons/io5'; // Ensure you're importing the correct icon
import useFetchDetails from '../hooks/useFetchDetails';

const VideoPlay = ({ data, close, media_type }) => {
  // Fetch video data
  const { data: videoData } = useFetchDetails(`/${media_type}/${data}/videos`);

  console.log("VideoPlay", videoData);

  return (
    <section className="fixed bg-neutral-700 top-0 right-0 bottom-0 left-0 z-40 bg-opacity-50 flex items-center justify-center">
      <div className="bg-black w-[95%] h-[60vh] sm:w-[85%] sm:h-[70vh] md:w-full md:h-[80vh] max-w-screen-lg aspect-video rounded overflow-hidden relative">
        {/* Close button */}
        <button onClick={close} className="absolute right-3 top-3 text-white text-3xl cursor-pointer z-50">
          <IoClose />
        </button>

        {/* Video content rendering */}
        {videoData?.results?.length > 0 ? (
          <div className="w-full h-full flex flex-col items-center justify-center">
            {videoData.results.slice(0, 1).map((video) => (
              <iframe
                key={video.id}
                src={`https://www.youtube.com/embed/${video.key}`}
                title={video.name}
                className="w-full h-full"
                allowFullScreen
              ></iframe>
            ))}
          </div>
        ) : (
          <div className="flex items-center justify-center h-full text-white text-xl">
            <p>No videos available</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default VideoPlay;
