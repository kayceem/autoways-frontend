import { Link } from "react-router-dom";
import "./index.css";

const Logo = ({ to = "/", logo, altText, name, className = "" , size=64 }) => {
    return (
        <Link
            to={to}
            className={`flex items-center gap-2 hover:opacity-80 transition-opacity duration-200 ${className}`}
        >
            {logo ? (
                <>
                    <img
                        src={logo}
                        alt={altText || "Logo"}
                        className={`h-15 w-auto object-contain ${className}`}
                        style={{ width: size, height: size }}
                    />
                    {name && (
                        <span className={`text-xl ${className}`}>{name}</span>
                    )}
                </>
            ) : (
                <>
                    {name && (
                        <span className={`text-xl ${className}`}>{name}</span>
                    )}
                </>
            )}
        </Link>
    );
};

export default Logo;
