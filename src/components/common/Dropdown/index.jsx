import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../Logo';
import logoMap from '../../../config/logoMap';

const Dropdown = ({ 
  label,
  icon: Icon,
  items = [],
  className = ""
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(-1);
  const dropdownRef = useRef(null);
  const timeoutRef = useRef(null);

  // Handle mouse enter
  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsOpen(true);
  };

  // Handle mouse leave with delay
  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsOpen(false);
      setHoveredIndex(-1);
    }, 150);
  };

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <div 
      className={`relative ${className}`} 
      ref={dropdownRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Dropdown Trigger */}
      <button
        className="flex items-center gap-2 text-secondary hover:text-accent transition-colors duration-200 py-2"
      >
        {Icon && <Icon size={20} />}
        {label && <span className="font-medium">{label}</span>}
      </button>

      {/* Dropdown Menu - Full Width */}
      <div 
        className={`fixed left-0 right-0 bg-accent shadow-2xl transition-all duration-300 ease-in-out z-50 ${
          isOpen 
            ? 'opacity-92 translate-y-0 pointer-events-auto' 
            : 'opacity-0 -translate-y-4 pointer-events-none'
        }`}
        style={{ 
          top: dropdownRef.current?.getBoundingClientRect().bottom || 0,
          maxHeight: '60vh',
          overflow: 'auto'
        }}
      >
        <div className="max-w-4xl mx-auto px-6 py-8">
          <div className="grid grid-cols-2 gap-8">
            
            {/* Left - Items List */}
            <div className="space-y-2">
              {items.map((item, index) => (
                <Link
                  key={index}
                  to={item.link}
                  className="block px-4 py-3 text-secondary hover:bg-accent hover:text-secondary hover:underline transition-all duration-200 rounded-lg text-lg font-medium"
                  onClick={() => setIsOpen(false)}
                  onMouseEnter={() => setHoveredIndex(index)}
                >
                  {item.name}
                </Link>
              ))}
            </div>

            {/* Right - Image */}
            <div className="flex items-center justify-center h-full">
              {items[hoveredIndex]?.image ? (
                <img 
                  src={items[hoveredIndex].image} 
                  alt={items[hoveredIndex].name}
                  className="max-h-128 object-cover transition-opacity duration-300"
                />
              ) : (
              <Logo logo={logoMap.autoways} name="Autoways" className='font-logo' />
              )}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Dropdown;