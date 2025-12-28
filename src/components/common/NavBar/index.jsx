import { Link } from "react-router-dom";
import { Mail, MapPin, Menu, X } from "lucide-react";
import Logo from "../Logo";
import Dropdown from "../Dropdown";
import useNavBarItems from "../../../config/navBar";
import { useState, useEffect, useRef } from "react";
import useLogoMap from "../../../config/logoMap";

const Navbar = ({ className = "" }) => {
    // State to manage the navbar's visibility
    const [isVisible, setIsVisible] = useState(true);
    const navBarItems = useNavBarItems();
    const { logoMap } = useLogoMap(); 
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
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
                            />

                            <Link
                                to="/spares-parts"
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
                        </div>

                        {/* Mobile Menu Button */}
                        <button
                            ref={menuButtonRef}
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="lg:hidden text-secondary hover:text-accent transition-colors duration-200 p-2"
                            aria-label="Toggle menu"
                        >
                            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {isMobileMenuOpen && (
                    <div ref={mobileMenuRef} className="lg:hidden bg-primary border-secondary/20">
                        <div className="px-4 py-4 space-y-3">
                            <Link
                                to="/shop/bull"
                                className="nav-link-underline block text-secondary hover:text-accent transition-colors duration-200 font-medium py-2"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                Bull
                            </Link>

                            <div className="py-2">
                                <Dropdown
                                    label="Dealerships"
                                    items={navBarItems.shopItems}
                                />
                            </div>

                            <div className="py-2">
                                <Link
                                    to="/spares-parts"
                                    className="nav-link-underline block text-secondary hover:text-accent transition-colors duration-200 font-medium py-2"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    >
                                    Spares & Parts
                                </Link>
                            </div>

                            <div className="py-2">
                                <Link
                                    to="/news"
                                    className="nav-link-underline block text-secondary hover:text-accent transition-colors duration-200 font-medium py-2"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    News & Media
                                </Link>
                            </div>

                            <div className="py-2">
                                <Link
                                    to="/testimonials"
                                    className="nav-link-underline block text-secondary hover:text-accent transition-colors duration-200 font-medium py-2"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    Testimonials
                                </Link>
                            </div>

                            <div className="py-2">
                                <Link
                                    to="/csr"
                                    className="nav-link-underline block text-secondary hover:text-accent transition-colors duration-200 font-medium py-2"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    CSR
                                </Link>
                            </div>
                            <div className="py-2">
                                <Dropdown
                                    label="Sister Companies"
                                    items={navBarItems.partnersItems}
                                />
                            </div>

                            <Link
                                to="/about"
                                className="nav-link-underline block text-secondary hover:text-accent transition-colors duration-200 font-medium py-2"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                About Us
                            </Link>

                            {/* Mobile Contact Links */}
                            <div className="flex items-center gap-6 pt-4 border-secondary/20">
                                <Link
                                    to="/contact"
                                    className="flex items-center gap-2 text-secondary hover:text-accent transition-colors duration-200 font-medium"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    <Mail size={20} />
                                    <span>Contact</span>
                                </Link>
                                <Link
                                    to="/locations"
                                    className="flex items-center gap-2 text-secondary hover:text-accent transition-colors duration-200 font-medium"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    <MapPin size={20} />
                                    <span>Locations</span>
                                </Link>
                            </div>
                        </div>
                    </div>
                )}
            </nav>
        </div>
    );
};

export default Navbar;
