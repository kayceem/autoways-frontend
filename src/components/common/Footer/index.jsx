import { Link } from "react-router-dom";
import { Mail, Phone, MapPin } from "lucide-react";
import { SiFacebook, SiInstagram, SiX } from "@icons-pack/react-simple-icons";
import { useContent } from "../../../context/globalContext";

const Footer = ({ className = "" }) => {
    const { content, isLoading } = useContent();
    const { info = {}, brands = {} } = content;
    const { email = "", phone = "", address = "", socialLinks = {} } = info;

    // Convert brands object to array (limit to 6 for footer)
    const brandArray = Object.entries(brands)
        .map(([key, brand]) => ({ id: key, ...brand }))
        .slice(0, 6);

    const currentYear = new Date().getFullYear();

    return (
        <footer className={`bg-primary border-t border-primary ${className}`}>
            {/* Main Footer Content */}
            <div className="max-w-7xl mx-auto px-6 py-16">
                <div className="grid grid-cols-4 gap-12 mb-12">
                    {/* Company Info */}
                    <div>
                        <h3 className="text-2xl font-bold text-secondary mb-6">
                            Autoways
                        </h3>
                        <p className="text-secondary mb-6 leading-relaxed">
                            Your trusted partner in finding the perfect vehicle.
                            Quality, service, and satisfaction guaranteed.
                        </p>

                        {/* Social Links */}
                        <div className="flex gap-3">
                            {socialLinks.facebook && (
                                <a
                                    href={socialLinks.facebook}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-secondary hover:bg-accent hover:text-white transition-all duration-300"
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
                                    className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-secondary hover:bg-accent hover:text-white transition-all duration-300"
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
                                    className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-secondary hover:bg-accent hover:text-white transition-all duration-300"
                                    aria-label="Twitter"
                                >
                                    <SiX className="w-5 h-5" />
                                </a>
                            )}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-lg font-bold text-secondary mb-6">
                            Quick Links
                        </h4>
                        <ul className="space-y-3">
                            <li>
                                <Link
                                    to="/"
                                    className="text-secondary hover:text-accent transition-colors duration-300"
                                >
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/about"
                                    className="text-secondary hover:text-accent transition-colors duration-300"
                                >
                                    About Us
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/contact"
                                    className="text-secondary hover:text-accent transition-colors duration-300"
                                >
                                    Contact
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/partners"
                                    className="text-secondary hover:text-accent transition-colors duration-300"
                                >
                                    Partners
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Shop by Brand */}
                    <div>
                        <h4 className="text-lg font-bold text-secondary mb-6">
                            Shop by Brand
                        </h4>
                        <ul className="space-y-3">
                            {brandArray.map((brand) => (
                                <li key={brand.id}>
                                    <Link
                                        to={`/shop/${brand.id}`}
                                        className="text-secondary hover:text-accent transition-colors duration-300"
                                    >
                                        {brand.name}
                                    </Link>
                                </li>
                            ))}
                            {Object.keys(brands).length > 6 && (
                                <li>
                                    <Link
                                        to="/shop"
                                        className="text-accent hover:text-accent/80 transition-colors duration-300 font-semibold"
                                    >
                                        View All Brands →
                                    </Link>
                                </li>
                            )}
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 className="text-lg font-bold text-secondary mb-6">
                            Contact Us
                        </h4>
                        <ul className="space-y-4">
                            {phone && (
                                <li>
                                    <a
                                        href={`tel:${phone}`}
                                        className="flex items-start gap-3 text-secondary hover:text-accent transition-colors duration-300 group"
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
                                        className="flex items-start gap-3 text-secondary hover:text-accent transition-colors duration-300 group"
                                    >
                                        <Mail className="w-5 h-5 flex-shrink-0 mt-0.5" />
                                        <span>{email}</span>
                                    </a>
                                </li>
                            )}
                            {address && (
                                <li className="flex items-start gap-3 text-secondary">
                                    <MapPin className="w-5 h-5 flex-shrink-0 mt-0.5" />
                                    <span>{address}</span>
                                </li>
                            )}
                        </ul>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-primary">
                <div className="max-w-7xl mx-auto px-6 py-6">
                    <div className="flex justify-between items-center">
                        <p className="text-secondary text-sm">
                            © {currentYear} Autoways. All rights reserved.
                        </p>
                        <div className="flex gap-6">
                            <Link
                                to="/privacy"
                                className="text-secondary hover:text-accent transition-colors duration-300 text-sm"
                            >
                                Privacy Policy
                            </Link>
                            <Link
                                to="/terms"
                                className="text-secondary hover:text-accent transition-colors duration-300 text-sm"
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
