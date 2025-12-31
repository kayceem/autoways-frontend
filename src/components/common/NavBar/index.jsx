import { Link } from "react-router-dom";
import { Mail, MapPin, Menu, X, ChevronLeft, Image } from "lucide-react";
import Logo from "../Logo";
import Dropdown from "../Dropdown";
import useNavBarItems from "../../../config/navBar";
import { useState, useEffect, useRef } from "react";
import useLogoMap from "../../../config/logoMap";
import { assetUrl } from "../../../utils";

const Navbar = ({ className = "" }) => {
    // State to manage the navbar's visibility
    const [isVisible, setIsVisible] = useState(true);
    const navBarItems = useNavBarItems();
    const { logoMap } = useLogoMap(); 
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [activeSubMenu, setActiveSubMenu] = useState(null); // 'dealerships' or 'sister-companies'
    const lastScrollY = useRef(0);
    const mobileMenuRef = useRef(null);
    const menuButtonRef = useRef(null);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            if (currentScrollY === 0) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }

            lastScrollY.current = currentScrollY;
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Prevent body scroll when mobile menu is open
    useEffect(() => {
        if (isMobileMenuOpen) {
            // Save current scroll position
            const scrollY = window.scrollY;
            document.body.style.position = 'fixed';
            document.body.style.top = `-${scrollY}px`;
            document.body.style.width = '100%';
            document.body.style.overflow = 'hidden';
            
            return () => {
                // Restore scroll position
                document.body.style.position = '';
                document.body.style.top = '';
                document.body.style.width = '';
                document.body.style.overflow = '';
                window.scrollTo(0, scrollY);
            };
        }
    }, [isMobileMenuOpen]);

    // Close mobile menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                isMobileMenuOpen &&
                mobileMenuRef.current &&
                !mobileMenuRef.current.contains(event.target) &&
                menuButtonRef.current &&
                !menuButtonRef.current.contains(event.target)
            ) {
                setIsMobileMenuOpen(false);
                setActiveSubMenu(null);
            }
        };

        if (isMobileMenuOpen) {
            document.addEventListener('mousedown', handleClickOutside);
            document.addEventListener('touchstart', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('touchstart', handleClickOutside);
        };
    }, [isMobileMenuOpen]);

    // Close menu and reset submenu when link is clicked
    const handleLinkClick = () => {
        setIsMobileMenuOpen(false);
        setActiveSubMenu(null);
    };

    return (
        <div
            className={`
        ${className} 
        sticky top-0 z-50 
      `}
        >
            {/* <Header isVisible={isVisible} /> */}
            {/* Main Navbar */}
            <nav className="bg-primary text-secondary">
                <div className="max-w-8xl mx-auto px-4 lg:px-6 py-3 lg:py-4">
                    <div className="flex items-center justify-between">
                        {/* Left - Logo */}
                        <div className="flex-shrink-0">
                            <Logo
                                // logo={!isVisible ? logoMap.autowaysTextLogo : ""}
                                autowaysLogo={logoMap.autowaysTextLogo}
                                className="font-logo"
                                size={128}
                            />
                        </div>

                        {/* Middle - Navigation Links (Desktop) */}
                        <div className="hidden lg:flex items-center gap-6 xl:gap-8">
                            <Link
                                to="/about"
                                className="nav-link-underline text-secondary hover:text-accent transition-colors duration-200 font-medium py-2"
                            >
                                About Us
                            </Link>
                            <Link
                                to="/shop/bull"
                                className="nav-link-underline text-secondary hover:text-accent transition-colors duration-200 font-medium py-2"
                            >
                                Bull
                            </Link>
                            <Dropdown
                                label="Dealerships"
                                items={navBarItems.shopItems}
                                loading="eager"
                            />

                            <Link
                                to="/spare-parts"
                                className="nav-link-underline text-secondary hover:text-accent transition-colors duration-200 font-medium py-2"
                            >
                                Spares & Parts
                            </Link>
                            <Link
                                to="/news"
                                className="nav-link-underline text-secondary hover:text-accent transition-colors duration-200 font-medium py-2"
                            >
                                News & Media
                            </Link>
                            <Link
                                to="/testimonials"
                                className="nav-link-underline text-secondary hover:text-accent transition-colors duration-200 font-medium py-2"
                            >
                                Testimonials
                            </Link>
                            <Link
                                to="/csr"
                                className="nav-link-underline text-secondary hover:text-accent transition-colors duration-200 font-medium py-2"
                            >
                                CSR
                            </Link>
                            <Dropdown
                                label="Sister Companies"
                                items={navBarItems.partnersItems}
                            />
                        </div>

                        {/* Right - Contact and Find a Store (Desktop) */}
                        <div className="hidden lg:flex items-center gap-4 lg:gap-6">
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
                            <Link
                                to="/gallery"
                                className="flex items-center gap-2 text-secondary hover:text-accent transition-colors duration-200 font-medium"
                            >
                                <Image size={20} />
                            </Link>
                        </div>

                        {/* Mobile Menu Button */}
                        <button
                            ref={menuButtonRef}
                            onClick={() => {
                                setIsMobileMenuOpen(!isMobileMenuOpen);
                                if (isMobileMenuOpen) {
                                    setActiveSubMenu(null);
                                }
                            }}
                            className="lg:hidden text-secondary hover:text-accent transition-colors duration-200 p-2"
                            aria-label="Toggle menu"
                        >
                             <Menu size={24} />
                        </button>
                    </div>
                </div>

                {/* Mobile Side Panel */}
                <div
                    className={`fixed inset-0 z-50 lg:hidden transition-opacity duration-300 ${
                        isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
                    }`}
                    onClick={(e) => {
                        if (e.target === e.currentTarget) {
                            setIsMobileMenuOpen(false);
                            setActiveSubMenu(null);
                        }
                    }}
                >
                    {/* Backdrop */}
                    <div className="absolute inset-0 bg-black/50" />
                    
                    {/* Side Panel */}
                    <div
                        ref={mobileMenuRef}
                        className={`absolute right-0 top-0 bottom-0 w-80 max-w-[85vw] bg-primary shadow-2xl transform transition-transform duration-300 ease-in-out ${
                            isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
                        }`}
                    >
                        <div className="flex flex-col h-full">
                            {/* Header */}
                            <div className="flex items-center justify-between px-4 py-4 border-secondary/20">
                                <button
                                onClick={() => {
                                    if (!activeSubMenu) {
                                    setIsMobileMenuOpen(false);
                                    }
                                    setActiveSubMenu(null);
                                }}
                                    className="p-2 text-secondary hover:text-accent transition-colors"
                                    aria-label="Close menu"
                                >
                                    { activeSubMenu ? <ChevronLeft size={24} /> :  <Menu size={24} />}
                                </button>
                            </div>

                            {/* Menu Content */}
                            <div className="flex-1 relative overflow-hidden">
                                {/* Main Menu */}
                                <div 
                                    className={`absolute inset-0 overflow-y-auto px-4 py-4 space-y-1 transition-all duration-300 ease-in-out ${
                                        !activeSubMenu 
                                            ? 'opacity-100 translate-x-0' 
                                            : 'opacity-0 -translate-x-full pointer-events-none'
                                    }`}
                                >
                                        <Link
                                            to="/about"
                                            className="block px-4 py-3 text-secondary hover:bg-accent/20 hover:text-accent transition-colors duration-200 font-medium rounded-lg"
                                            onClick={handleLinkClick}
                                        >
                                            About Us
                                        </Link>

                                        <Link
                                            to="/shop/bull"
                                            className="block px-4 py-3 text-secondary hover:bg-accent/20 hover:text-accent transition-colors duration-200 font-medium rounded-lg"
                                            onClick={handleLinkClick}
                                        >
                                            Bull
                                        </Link>

                                        <button
                                            onClick={() => setActiveSubMenu('dealerships')}
                                            className="w-full text-left block px-4 py-3 text-secondary hover:bg-accent/20 hover:text-accent transition-colors duration-200 font-medium rounded-lg"
                                        >
                                            Dealerships
                                        </button>

                                        <Link
                                            to="/spare-parts"
                                            className="block px-4 py-3 text-secondary hover:bg-accent/20 hover:text-accent transition-colors duration-200 font-medium rounded-lg"
                                            onClick={handleLinkClick}
                                        >
                                            Spares & Parts
                                        </Link>

                                        <Link
                                            to="/news"
                                            className="block px-4 py-3 text-secondary hover:bg-accent/20 hover:text-accent transition-colors duration-200 font-medium rounded-lg"
                                            onClick={handleLinkClick}
                                        >
                                            News & Media
                                        </Link>

                                        <Link
                                            to="/testimonials"
                                            className="block px-4 py-3 text-secondary hover:bg-accent/20 hover:text-accent transition-colors duration-200 font-medium rounded-lg"
                                            onClick={handleLinkClick}
                                        >
                                            Testimonials
                                        </Link>

                                        <Link
                                            to="/csr"
                                            className="block px-4 py-3 text-secondary hover:bg-accent/20 hover:text-accent transition-colors duration-200 font-medium rounded-lg"
                                            onClick={handleLinkClick}
                                        >
                                            CSR
                                        </Link>

                                        <button
                                            onClick={() => setActiveSubMenu('sister-companies')}
                                            className="w-full text-left block px-4 py-3 text-secondary hover:bg-accent/20 hover:text-accent transition-colors duration-200 font-medium rounded-lg"
                                        >
                                            Sister Companies
                                        </button>

                                        {/* Contact Links */}
                                        <div className="pt-4 mt-4 space-y-1">
                                            <Link
                                                to="/contact"
                                                className="flex items-center gap-3 px-4 py-3 text-secondary hover:bg-accent/20 hover:text-accent transition-colors duration-200 font-medium rounded-lg"
                                                onClick={handleLinkClick}
                                            >
                                                <Mail size={20} />
                                                <span>Contact</span>
                                            </Link>
                                            <Link
                                                to="/locations"
                                                className="flex items-center gap-3 px-4 py-3 text-secondary hover:bg-accent/20 hover:text-accent transition-colors duration-200 font-medium rounded-lg"
                                                onClick={handleLinkClick}
                                            >
                                                <MapPin size={20} />
                                                <span>Locations</span>
                                            </Link>
                                            <Link
                                                to="/gallery"
                                                className="flex items-center gap-3 px-4 py-3 text-secondary hover:bg-accent/20 hover:text-accent transition-colors duration-200 font-medium rounded-lg"
                                                onClick={handleLinkClick}
                                            >
                                                <Image size={20} />
                                                <span>Gallery</span>
                                            </Link>
                                        </div>
                                </div>

                                {/* Sub Menu (Dealerships or Sister Companies) */}
                                <div 
                                    className={`absolute inset-0 overflow-y-auto px-4 py-4 transition-all duration-300 ease-in-out ${
                                        activeSubMenu 
                                            ? 'opacity-100 translate-x-0' 
                                            : 'opacity-0 translate-x-full pointer-events-none'
                                    }`}
                                >
                                        {/* Sub Menu Items */}
                                        <div className="space-y-1">
                                            {(activeSubMenu === 'dealerships' ? navBarItems.shopItems : navBarItems.partnersItems).map((item, index) => (
                                                <Link
                                                    key={index}
                                                    to={item.link}
                                                    className="flex items-center gap-3 px-4 py-3 text-secondary hover:bg-accent/20 hover:text-accent transition-colors duration-200 font-medium rounded-lg group"
                                                    onClick={handleLinkClick}
                                                >
                                                    {item.image && (
                                                        <img
                                                            src={assetUrl(item.image)}
                                                            alt={`${item.name} logo`}
                                                            className="w-8 h-8 object-contain"
                                                            loading="lazy"
                                                        />
                                                    )}
                                                    <span>{item.name}</span>
                                                </Link>
                                            ))}
                                        </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default Navbar;
