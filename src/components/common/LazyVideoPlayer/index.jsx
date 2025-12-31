import { useState, useRef } from 'react';
import { Play } from 'lucide-react';
import { assetUrl } from '../../../utils';

// Lazy video player - only loads video when play is clicked
const LazyVideoPlayer = ({ src, thumbnail, className = 'h-48' }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef(null);

  const handlePlay = () => {
    setIsPlaying(true);
    // Auto-play after video loads
    setTimeout(() => {
      if (videoRef.current) {
        videoRef.current.play();
      }
    }, 100);
  };

  if (!isPlaying) {
    return (
      <div
        className={`relative w-full ${className} bg-dark rounded-lg overflow-hidden cursor-pointer group`}
        onClick={handlePlay}
      >
        {/* Thumbnail or placeholder */}
        {thumbnail ? (
          <img
            src={assetUrl(thumbnail)}
            alt="Video thumbnail"
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-dark to-primary flex items-center justify-center">
            <span className="text-secondary/50 text-sm">Video</span>
          </div>
        )}
        {/* Play button overlay */}
        <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/50 transition-colors">
          <div className="w-16 h-16 rounded-full bg-accent flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
            <Play className="w-8 h-8 text-dark ml-1" fill="currentColor" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <video
      ref={videoRef}
      src={assetUrl(src)}
      controls
      className={`w-full ${className} object-cover bg-dark rounded-lg`}
      preload="auto"
    >
      Your browser does not support the video tag.
    </video>
  );
};

export default LazyVideoPlayer;
