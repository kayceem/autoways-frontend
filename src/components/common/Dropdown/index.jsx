import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../Logo';
import logoMap from '../../../config/logoMap';
import { assetUrl } from '../../../utils';

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
            ? 'opacity-96 translate-y-0 pointer-events-auto'
            : 'opacity-0 -translate-y-4 pointer-events-none'
        }`}
        style={{
          top: dropdownRef.current?.getBoundingClientRect().bottom || 0,
          height: '60vh',
          overflow: 'auto'
        }}
      >
        <div className="max-w-4xl mx-auto px-4 lg:px-6 py-4 lg:py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-8">

            {/* Left - Items List */}
            <div className="space-y-1 lg:space-y-2">
                {items.map((item, index) => (
                <Link
                    key={index}
                    to={item.link}
                    className="group block px-3 lg:px-4 py-1 lg:py-2 text-secondary hover:bg-accent hover:text-secondary transition-all duration-200 rounded-lg text-base lg:text-lg font-medium no-underline"
                    onClick={() => setIsOpen(false)}
                    onMouseEnter={() => setHoveredIndex(index)}
                >
                    <div className="flex flex-col">
                    <span>{item.name}</span>
                    <span className="mt-2 h-1 bg-neutral-400 rounded-full w-0 group-hover:w-30 transition-all duration-300 ease-in-out" />
                    </div>
                </Link>
                ))}
            </div>

            {/* Right - Image (Hidden on mobile) */}
            <div className="hidden lg:flex items-center justify-center h-full">
              {items[hoveredIndex]?.image ? (
                <img
                  src={assetUrl(items[hoveredIndex].image)}
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