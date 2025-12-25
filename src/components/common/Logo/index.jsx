import { Link } from "react-router-dom";
import "./index.css";
import { assetUrl } from '../../../utils';

const Logo = ({
    to = "/",
    logo,
    autowaysLogo,
    altText,
    name,
    className = "",
    size = 64,
}) => {
    return (
        <Link
            to={to}
            className={`flex items-center gap-2 hover:opacity-80 transition-opacity duration-200 ${className}`}
        >
            {autowaysLogo ? (
                <>
                    <img
                        src={assetUrl(autowaysLogo)}
                        alt={altText || "Logo"}
                        className={`h-auto w-auto object-contain ${className}`}
                        style={{ width: size }}
                    />
                </>
            ) : (
                <>
                    <img
                        src={assetUrl(logo)}
                        alt={altText || "Logo"}
                        className={`h-auto w-auto object-contain ${className}`}
                        style={{ width: size, height: size }}
                        />
                </>
            )}
        </Link>
    );
};

export default Logo;
