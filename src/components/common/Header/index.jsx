import { Mail, Phone } from "lucide-react";
import { SiFacebook, SiInstagram, SiX } from "@icons-pack/react-simple-icons";
import { useContent } from "../../../context/globalContext";
import LoadingSpinner from "../Loading";
import Logo from '../Logo';
import logoMap from "../../../config/logoMap";

const Header = ({ className = "", isVisible }) => {
    const { content, isLoading } = useContent();

    if (isLoading) return <LoadingSpinner className={className} size={64} />;
    return (
        <header
            className={`
        bg-primary text-secondary px-6
        hidden md:block
        transition-all duration-300 ease-in-out
        overflow-hidden
        ${isVisible ? "py-2 max-h-20 opacity-100" : "py-0 max-h-0 opacity-0"}
        ${className}
        h-14
      `}
        >
            <div className="max-w-8xl flex justify-between items-center">
                {/* Social Links - Left */}
                <div className="flex items-start gap-4 pl-8">
                    <Logo logo={logoMap.autoways} size={40} />
                    {/* <a 
            href={content.info.socialLinks.facebook}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-accent transition-colors duration-200"
            aria-label="Facebook"
          >
            <SiFacebook size={18} />
          </a>
          <a 
            href={content.info.socialLinks.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-accent transition-colors duration-200"
            aria-label="Instagram"
          >
            <SiInstagram size={18} />
          </a>
          <a 
            href={content.info.socialLinks.twitter}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-accent transition-colors duration-200"
            aria-label="Twitter"
          >
            <SiX size={18} />
          </a> */}
                </div>

                {/* Contact Info - Right */}
                <div className="flex items-center gap-6 items-end">
                    <a
                        href={`mailto:${content?.info.email}`}
                        className="flex items-center gap-2 hover:text-accent transition-colors duration-200 md:text-sm"
                    >
                        <Mail size={16} />
                        <span>{content.info.email}</span>
                    </a>
                    <a
                        href={`tel:${content.info.phone.replace(/\s/g, "")}`}
                        className="flex items-center gap-2 hover:text-accent transition-colors duration-200 md:text-sm"
                    >
                        <Phone size={16} />
                        <span>{content?.info.phone}</span>
                    </a>
                </div>
            </div>
        </header>
    );
};

export default Header;
