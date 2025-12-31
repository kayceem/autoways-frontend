import './ShimmerFallback.css';

const ShimmerFallback = ({ className = '' }) => {
  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      {/* Base - neutral dark gray */}
      <div className="absolute inset-0 bg-[#1f1f1f]" />
      {/* Shimmer sweep animation */}
      <div className="shimmer-sweep" />
    </div>
  );
};

export default ShimmerFallback;
