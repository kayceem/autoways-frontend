import { useState } from "react";
import { Link } from "react-router-dom";
import { Eye, Tag, ArrowRight } from "lucide-react";

const ProductCard = ({ product, brandName, className = "" }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [mousePosition, setMousePosition] = useState({ x: 0.5, y: 0.5 });

    const handleMouseMove = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;
        setMousePosition({ x, y });
    };

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
        setMousePosition({ x: 0.5, y: 0.5 });
    };

    // Calculate 3D transform based on mouse position
    const rotateX = (mousePosition.y - 0.5) * -15;
    const rotateY = (mousePosition.x - 0.5) * 15;

    return (
        <div
            className={`group relative bg-transparent rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 ${className}`}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            style={{
                transform: isHovered
                    ? `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`
                    : "perspective(1200px) rotateX(0deg) rotateY(0deg) scale(1)",
                transition: "transform 0.1s ease-out, box-shadow 0.5s ease",
            }}
        >
            {/* Image Container with 3D Effect */}
            <div
                className={`relative h-72 overflow-hidden bg-seondary`}
            >
                {/* Default Image */}
                <img
                    src={product.images?.[0] || product.defaultImage}
                    alt={product.name}
                    className={`w-full h-full object-contain transition-all duration-700 ${
                        isHovered
                            ? "opacity-0 scale-110"
                            : "opacity-100 scale-100"
                    }`}
                    style={{
                        transform: isHovered
                            ? `translateZ(50px) scale(1.1)`
                            : "translateZ(0px) scale(1)",
                        filter: isHovered ? "brightness(1.1)" : "brightness(1)",
                    }}
                />
                {/* Hover Image */}
                {product.images?.[1] && (
                    <img
                        src={product.images[1]}
                        alt={`${product.name} alternate view`}
                        className={`absolute inset-0 w-full h-full object-contain transition-all duration-700 ${
                            isHovered
                                ? "opacity-100 scale-110"
                                : "opacity-0 scale-100"
                        }`}
                        style={{
                            transform: isHovered
                                ? `translateZ(50px) scale(1.1)`
                                : "translateZ(0px) scale(1)",
                            filter: isHovered
                                ? "brightness(1.1) drop-shadow(0 20px 40px rgba(0,0,0,0.3))"
                                : "brightness(1)",
                        }}
                    />
                )}
                {/* Subtle Background Glow */}
                <div
                    className={`absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-primary/30 transition-opacity duration-500 ${
                        isHovered ? "opacity-100" : "opacity-0"
                    }`}
                />
            </div>
            {/* Content */}
            <div className="p-6 relative z-10">
                {/* Tag and Price Row */}
                {/* <div className="flex items-center justify-between mb-3">
                    {product.tag && (
                        <div
                            className={`bg-accent/20 text-accent px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1`}
                        >
                            <Tag size={12} />
                            <span>{product.tag}</span>
                        </div>
                    )}
                    {product.price && (
                        <div
                            className={`text-primary text-xl font-bold`}
                        >
                            ${product.price}
                        </div>
                    )}
                </div> */}
                {/* Product Name */}
                <h3
                    className={`font-bold text-2xl text-primary mb-2 group-hover:text-accent transition-colors duration-300`}
                >
                    {product.name}
                </h3>
                {/* Short Description */}
                {product.shortDescription && (
                    <p
                        className={`font-light text-primary text-opacity-70 text-sm mb-4 line-clamp-2`}
                    >
                        {product.shortDescription}
                    </p>
                )}
                {/* View Button */}
                <Link
                    to={`/shop/${brandName}/${product.type}/${product.id}`}
                    className={`group inline-flex items-center gap-4 bg-primary text-secondary px-6 py-3 rounded-xl font-bold border-2 border-transparent hover:border-accent transition-all duration-300 transform hover:bg-secondary hover:text-accent hover:scale-105`}
                >
                    <span>Explore</span>

                    {/* Animated arrow icon */}
                    <ArrowRight
                        size={18}
                        className="opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0"
                    />
                </Link>
            </div>
        </div>
    );
};

export default ProductCard;
