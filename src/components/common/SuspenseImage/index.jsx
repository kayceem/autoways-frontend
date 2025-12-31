import { loadImage, preloadImage, removeFromCache } from './imageCache';
import ShimmerFallback from './ShimmerFallback';
import PulseFallback from './PulseFallback';
import './SuspenseImage.css';

// Component that suspends until image is loaded
const SuspenseImage = ({ src, alt, className = '', style = {}, ...props }) => {
  const loadedSrc = loadImage(src);

  return (
    <img
      src={loadedSrc}
      alt={alt}
      className={`suspense-image-fade-in ${className}`}
      style={style}
      {...props}
    />
  );
};

export { SuspenseImage, ShimmerFallback, PulseFallback, preloadImage, removeFromCache };
export default SuspenseImage;
