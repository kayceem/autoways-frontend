import { Link } from "react-router-dom";
import { Mail, Phone, MapPin } from "lucide-react";
import { SiFacebook, SiInstagram, SiX } from "@icons-pack/react-simple-icons";
import { useContent } from "../../../context/globalContext";

const Footer = ({ className = "" }) => {
    const { content, isLoading } = useContent();
    const { contactInfo = [], brands = [] } = content;
    if (isLoading) return null;
    const info = contactInfo?.length > 0 ? contactInfo[0] : {};
    const { email = "", phone = "", address = "", corporate_address = "",socialLinks = {} } = info;

    const currentYear = new Date().getFullYear();

    return (
        <footer className={`bg-primary-autoways border-t border-primary ${className}`}>
            {/* Main Footer Content */}
            <div className="max-w-7xl mx-auto px-4 lg:px-6 py-8 lg:py-12">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-12 mb-8 lg:mb-12">
                    {/* Company Info */}
                    <div>
                        <h3 className="text-xl lg:text-2xl font-bold text-primary-autoways mb-4 lg:mb-6">
                            Autoways
                        </h3>
                        <p className="text-sm lg:text-base text-primary-autoways mb-4 lg:mb-6 leading-relaxed">
                            Your trusted partner in finding the perfect vehicle.
                            Quality, service, and satisfaction guaranteed.
                        </p>

                        {/* Social Links */}
                        <div className="flex gap-2 lg:gap-3">
                            {socialLinks.facebook && (
                                <a
                                    href={socialLinks.facebook}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-10 h-10 bg-primary-autoways rounded-full flex items-center justify-center text-primary-autoways  hover:bg-accent hover:text-white transition-all duration-300"
                                    aria-label="Facebook"
                                >
                                    <SiFacebook className="w-5 h-5" />
                                </a>
                            )}
                            {socialLinks.instagram && (
                                <a
                                    href={socialLinks.instagram}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-10 h-10 bg-primary-autoways rounded-full flex items-center justify-center text-primary-autoways  hover:bg-accent hover:text-white transition-all duration-300"
                                    aria-label="Instagram"
                                >
                                    <SiInstagram className="w-5 h-5" />
                                </a>
                            )}
                            {socialLinks.twitter && (
                                <a
                                    href={socialLinks.twitter}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-10 h-10 bg-primary-autoways rounded-full flex items-center justify-center text-primary-autoways  hover:bg-accent hover:text-white transition-all duration-300"
                                    aria-label="Twitter"
                                >
                                    <SiX className="w-5 h-5" />
                                </a>
                            )}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-base lg:text-lg font-bold text-primary-autoways mb-4 lg:mb-6">
                            Quick Links
                        </h4>
                        <ul className="space-y-2 lg:space-y-3 text-sm lg:text-base">
                            <li>
                                <Link
                                    to="/"
                                    className="text-primary-autoways  hover:text-accent transition-colors duration-300"
                                >
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/about"
                                    className="text-primary-autoways  hover:text-accent transition-colors duration-300"
                                >
                                    About Us
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/contact"
                                    className="text-primary-autoways  hover:text-accent transition-colors duration-300"
                                >
                                    Contact
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/sister-companies"
                                    className="text-primary-autoways  hover:text-accent transition-colors duration-300"
                                >
                                    Sister Companies
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Shop by Brand */}
                    <div>
                        <h4 className="text-base lg:text-lg font-bold text-primary-autoways mb-4 lg:mb-6">
                            Shop by Brand
                        </h4>
                        <ul className="space-y-2 lg:space-y-3 text-sm lg:text-base">
                            {brands.length > 0 && brands.map((brand, index) => (
                                <li key={index}>
                                    <Link
                                        to={`/shop/${brand.slug}`}
                                        className="text-primary-autoways  hover:text-accent transition-colors duration-300"
                                    >
                                        {brand.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 className="text-base lg:text-lg font-bold text-primary-autoways mb-4 lg:mb-6">
                            Contact Us
                        </h4>
                        <ul className="space-y-3 lg:space-y-4 text-sm lg:text-base">
                            {phone && (
                                <li>
                                    <a
                                        href={`tel:${phone}`}
                                        className="flex items-start gap-3 text-primary-autoways  hover:text-accent transition-colors duration-300 group"
                                    >
                                        <Phone className="w-5 h-5 flex-shrink-0 mt-0.5" />
                                        <span>{phone}</span>
                                    </a>
                                </li>
                            )}
                            {email && (
                                <li>
                                    <a
                                        href={`mailto:${email}`}
                                        className="flex items-start gap-3 text-primary-autoways  hover:text-accent transition-colors duration-300 group"
                                    >
                                        <Mail className="w-5 h-5 flex-shrink-0 mt-0.5" />
                                        <span>{email}</span>
                                    </a>
                                </li>
                            )}
                            {corporate_address && (
                                <li className="flex items-start gap-3 text-primary-autoways ">
                                    <MapPin className="w-5 h-5 flex-shrink-0 mt-0.5" />
                                    <span>Corporate Office: {corporate_address}</span>
                                </li>
                            )}
                            {address && (
                                <li className="flex items-start gap-3 text-primary-autoways ">
                                    <MapPin className="w-5 h-5 flex-shrink-0 mt-0.5" />
                                    <span>Head Office: {address}</span>
                                </li>
                            )}
                        </ul>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-primary">
                <div className="max-w-7xl mx-auto px-4 lg:px-6 py-4 lg:py-6">
                    <div className="flex flex-col lg:flex-row justify-between items-center gap-4 lg:gap-0">
                        <p className="text-primary-autoways text-xs lg:text-sm">
                            © {currentYear} Autoways. All rights reserved.
                        </p>
                        <div className="flex gap-4 lg:gap-6">
                            <Link
                                to="/privacy"
                                className="text-primary-autoways hover:text-accent transition-colors duration-300"
                            >
                                Privacy Policy
                            </Link>
                            <Link
                                to="/terms"
                                className="text-primary-autoways hover:text-accent transition-colors duration-300"
                            >
                                Terms of Service
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
