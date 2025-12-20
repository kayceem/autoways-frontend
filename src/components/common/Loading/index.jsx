import './index.css';
import { useState } from 'react';
import logoMap from '../../../config/logoMap';
import { assetUrl } from '../../../utils';

const LoadingSpinner = ({ name = 'default', size = 128, className = '' }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div
      className={`flex flex-col items-center justify-center min-h-screen min-w-screen ${className}`}
    >
      {/* Logo Container */}
      <div className="relative" style={{ width: size, height: size }}>
        {/* Placeholder/Skeleton while image loads */}
        {!imageLoaded && (
          <div
            className="absolute inset-0 bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg animate-pulse"
            style={{ width: size, height: size }}
          />
        )}

        {/* Brand Logo */}
        <img
          src={assetUrl(logoMap[name]) || logoMap['default']}
          alt="Loading"
          className={`object-contain transition-opacity duration-300 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          style={{
            width: size,
            height: size,
            animation: imageLoaded ? 'brand-loading 2.5s ease-in-out infinite, brand-glow 2.5s ease-in-out infinite' : 'none',
          }}
          onLoad={() => setImageLoaded(true)}
        />
      </div>

      {/* Loading Text */}
      <div className="mt-8 text-center">
        <p className="text-lg font-semibold text-gray-700 animate-pulse">
          Loading...
        </p>
      </div>
    </div>
  );
};

export default LoadingSpinner;