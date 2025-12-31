const PulseFallback = ({ className = '' }) => {
  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      {/* Pulsing dark gray background */}
      <div className="absolute inset-0 bg-[#1f1f1f] animate-pulse" />
    </div>
  );
};

export default PulseFallback;
