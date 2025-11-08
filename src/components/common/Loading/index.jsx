import React from 'react';
import logoMap from '../../../config/logoMap';
import './index.css';

const LoadingSpinner = ({ name = 'default', size = 64, className = '' }) => {

  return (
    <div
      className={`flex items-center justify-center ${className}`}
      style={{ width: size, height: size }}
    >
      <img
        src={logoMap[name]}
        alt={`${name} loading`}
        className="object-contain animate-[spin-horizontal_1.2s_linear_infinite]"
        style={{ width: size, height: size }}
      />
    </div>
  );
};

export default LoadingSpinner;