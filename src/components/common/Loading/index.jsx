import './index.css';
import logoMap from '../../../config/logoMap';
import { assetUrl } from '../../../utils';

const LoadingSpinner = ({ name = 'default', size = 128, className = '' }) => {

  return (
    <div
    className={`flex items-center justify-center min-h-screen min-w-screen ${className}`}
      style={{ width: size, height: size }}
    >
      <img
        src={logoMap[name]}
        alt={`${name} loading`}
        className="object-contain h-full animate-[spin-horizontal_1.8s_linear_infinite]"
        style={{ width: size, height: size }}
      />
    </div>
  );
};

export default LoadingSpinner;