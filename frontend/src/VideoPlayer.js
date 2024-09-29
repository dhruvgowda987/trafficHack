import React, { useEffect, useRef } from 'react';
import Hls from 'hls.js';

const VideoPlayer = () => {
  const videoRef = useRef(null);
  const streamUrl = "http://localhost:5000/stream"; // Your Flask endpoint

  useEffect(() => {
    const video = videoRef.current;
    let hls;

    if (Hls.isSupported()) {
      hls = new Hls();
      hls.loadSource(streamUrl);
      hls.attachMedia(video);
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        video.play().catch(error => console.error("Error playing video:", error)); // Handle play error
      });
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = streamUrl;
      video.addEventListener('loadedmetadata', () => {
        video.play().catch(error => console.error("Error playing video:", error)); // Handle play error
      });
    }

    return () => {
      if (hls) {
        hls.destroy();
      }
      if (video) {
        video.pause(); // Pause the video
        video.src = ''; // Clear the source to avoid errors
      }
    };
  }, [streamUrl]);

  return (
    <video ref={videoRef} controls width="600" style={{ maxWidth: '100%' }}>
      Your browser does not support the video tag.
    </video>
  );
};

export default VideoPlayer;
