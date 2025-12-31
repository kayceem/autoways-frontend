import './index.css';
import { useState } from 'react';
import useLogoMap from '../../../config/logoMap';
import { assetUrl } from '../../../utils';
import { Loader } from 'lucide-react';

const LoadingSpinner = ({ name = '', size = 128, className = '' }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const isDefaultLogo = !name;
  const { logoMap } = useLogoMap();
  
  return (
    <div
      className={`flex items-center justify-center h-[80vh] w-full ${className}`}
    >
      {/* Logo Container */}
      <div className="flex items-center justify-center" style={{ width: size, height: size }}>
        {/* Placeholder/Skeleton while image loads - only for brand logos */}
        <img
          src={ isDefaultLogo ? logoMap['default'] : assetUrl(logoMap[name])}
          alt="Loading"
          className={`object-contain transition-opacity duration-300 ${
            isDefaultLogo || imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          style={{
            width: name ? size : 64,
            height: name ? size : 64,
            animation: isDefaultLogo || imageLoaded ? 'brand-loading 2.5s ease-in-out infinite, brand-glow 2.5s ease-in-out infinite' : 'none',
          }}
          loading={'eager'}
          onLoad={() => setImageLoaded(true)}
        />
      </div>

    </div>
  );
};

export default LoadingSpinner;