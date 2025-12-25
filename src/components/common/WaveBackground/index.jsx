import React from 'react';

const WaveBackground = ({
  position = 'top',
  opacity = 0.1,
  waveColor = 'currentColor',
  animate = true,
  className = ''
}) => {
  const isTop = position === 'top';
  const isBottom = position === 'bottom';

  return (
    <div
      className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}
      style={{ opacity }}
    >
      {/* Wave Layer 1 */}
      <svg
        className={`absolute w-full ${isTop ? 'top-0' : 'bottom-0'} ${animate ? 'animate-wave-slow' : ''}`}
        style={{
          height: '18%',
          transform: isBottom ? 'rotate(180deg)' : 'none',
        }}
        viewBox="0 0 1440 320"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill={waveColor}
          fillOpacity="0.3"
          d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,122.7C672,117,768,139,864,144C960,149,1056,139,1152,122.7C1248,107,1344,85,1392,74.7L1440,64L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
        />
      </svg>

      {/* Wave Layer 2 */}
      <svg
        className={`absolute w-full ${isTop ? 'top-0' : 'bottom-0'} ${animate ? 'animate-wave-medium' : ''}`}
        style={{
          height: '15%',
          transform: isBottom ? 'rotate(180deg)' : 'none',
        }}
        viewBox="0 0 1440 320"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill={waveColor}
          fillOpacity="0.2"
          d="M0,128L48,138.7C96,149,192,171,288,165.3C384,160,480,128,576,128C672,128,768,160,864,165.3C960,171,1056,149,1152,133.3C1248,117,1344,107,1392,101.3L1440,96L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
        />
      </svg>

      {/* Wave Layer 3 */}
      <svg
        className={`absolute w-full ${isTop ? 'top-0' : 'bottom-0'} ${animate ? 'animate-wave-fast' : ''}`}
        style={{
          height: '10%',
          transform: isBottom ? 'rotate(180deg)' : 'none',
        }}
        viewBox="0 0 1440 320"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill={waveColor}
          fillOpacity="0.1"
          d="M0,160L48,170.7C96,181,192,203,288,197.3C384,192,480,160,576,154.7C672,149,768,171,864,186.7C960,203,1056,213,1152,202.7C1248,192,1344,160,1392,144L1440,128L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
        />
      </svg>
    </div>
  );
};

export default WaveBackground;
