import { Link } from "react-router-dom";
import './index.css';

const Logo = ({ to = "/", logo, altText, name, className = "" }) => {
    return (
        <Link
            to={to}
            className={`flex items-center gap-2 hover:opacity-80 transition-opacity duration-200 ${className}`}
        >
            {logo ? (
                <img
                    src={logo}
                    alt={altText || "Logo"}
                    className={`h-10 w-auto object-contain ${className}`}
                />
            ) : (
                <>
                    {name && (
                        <span className="text-xl text-secondary">
                            {name}
                        </span>
                    )}
                </>
            )}
        </Link>
    );
};

export default Logo;
