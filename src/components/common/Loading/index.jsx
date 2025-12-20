import './index.css';
import { useState } from 'react';
import logoMap from '../../../config/logoMap';
import { assetUrl } from '../../../utils';
import { Loader } from 'lucide-react';

const LoadingSpinner = ({ name = '', size = 64, className = '' }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div
      className={`flex flex-col items-center justify-center min-h-screen min-w-screen ${className}`}
    >
      {/* Logo Container */}
      <div className="relative" style={{ width: size, height: size }}>
        {/* Placeholder/Skeleton while image loads */}
        {!imageLoaded && (
            <Loader className="animate-[spin_1.8s_linear_infinite] text-accent" size={size} />
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
          loading={'eager'}
          onLoad={() => setImageLoaded(true)}
        />
      </div>

    </div>
  );
};

export default LoadingSpinner;