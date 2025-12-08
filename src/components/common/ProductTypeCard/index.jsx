import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const ProductTypeCard = ({ type, image, link, state, brandName, className = "" }) => {
    return (
        <div className="flex flex-col gap-4 group">
            <Link
                to={link}
                state={state}
                className={`relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 ${className}`}
            >
                {/* Image Container */}
                <div className="relative h-80 overflow-hidden">
                    <img
                        src={image}
                        alt={`${brandName} ${type}`}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/50 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />

                    {/* Animated Border */}
                    <div className={`absolute inset-0 border-2 border-accent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl`} />
                </div>

                {/* Shine Effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                </div>
            </Link>
            {/* Content */}
            <div className="transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                {/* Type Name */}
                <h3
                    className={`font-bold text-3xl text-primary mb-2 transform transition-transform duration-300`}
                >
                    {type}
                </h3>

                {/* Explore Button */}
                <div className="flex items-center gap-2 text-accent opacity-0 group-hover:opacity-100 transform translate-x-4 group-hover:translate-x-0 transition-all duration-500 delay-100">
                    <span
                        className={`text-sm text-primary uppercase tracking-wider`}
                    >
                        Explore
                    </span>
                    <ArrowRight
                        size={20}
                        className={`transform text-primary group-hover:translate-x-2 transition-transform duration-300`}
                    />
                </div>
            </div>
        </div>
    );
};

export default ProductTypeCard;
