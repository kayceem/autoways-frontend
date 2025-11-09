import { Link } from 'react-router-dom';
import { Mail, MapPin } from 'lucide-react';
import Logo from '../Logo';
import Dropdown from '../Dropdown';
import Header from '../Header';
import navBarItems from '../../../config/navBar';
const Navbar = ({ className = "" }) => {
  // Shop dropdown items

  return (
    <div className={className}>
      {/* Header Component */}
      <Header />
      {/* Main Navbar */}
      <nav className="bg-primary text-secondary">
        <div className="max-w-8xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            
            {/* Left - Logo */}
            <div className="flex-shrink-0">
              <Logo name="Autoways Pvt. Ltd." className='font-logo' />
            </div>

            {/* Middle - Navigation Links */}
            <div className="flex items-center gap-8">
              <Dropdown 
                label="Shop" 
                items={navBarItems.shopItems}
              />
              
              <Link 
                to="/about"
                className="text-secondary hover:text-accent transition-colors duration-200 font-medium py-2"
              >
                About Us
              </Link>
              
              <Dropdown 
                label="Partners" 
                items={navBarItems.partnersItems}
              />
            </div>

            {/* Right - Contact and Find a Store */}
            <div className="flex items-center gap-6">
              <Link 
                to="/contact"
                className="flex items-center gap-2 text-secondary hover:text-accent transition-colors duration-200 font-medium"
              >
                <Mail size={20} />
              </Link>
              <Link 
                to="/locations"
                className="flex items-center gap-2 text-secondary hover:text-accent transition-colors duration-200 font-medium"
              >
                <MapPin size={20} />
              </Link>

            </div>

          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;