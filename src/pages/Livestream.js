import React, { useRef, useEffect, useState } from 'react';

const LiveStream = () => {
  const videoRef = useRef(null);
  const [streaming, setStreaming] = useState(false);

  const startLiveStream = async () => {
    try {
      // Request access to camera and microphone
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });

      // Set video source to the stream
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setStreaming(true);
    } catch (err) {
      console.error("Error accessing media devices:", err);
    }
  };

  const stopLiveStream = () => {
    const stream = videoRef.current?.srcObject;
    const tracks = stream?.getTracks();

    // Stop all tracks (video/audio)
    tracks?.forEach((track) => track.stop());

    setStreaming(false);
  };

  useEffect(() => {
    return () => {
      // Cleanup when component unmounts
      stopLiveStream();
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      <h1 className="text-3xl font-bold mb-4">Live Stream</h1>
      <div className="w-full max-w-md aspect-video bg-black rounded-lg overflow-hidden">
        {/* Video Element */}
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className="w-full h-full object-cover"
        ></video>
      </div>

      {/* Buttons */}
      <div className="mt-4 flex gap-4">
        {!streaming ? (
          <button
            onClick={startLiveStream}
            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-700 transition"
          >
            Start Live
          </button>
        ) : (
          <button
            onClick={stopLiveStream}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-700 transition"
          >
            Stop Live
          </button>
        )}
      </div>
    </div>
  );
};

export default LiveStream;
