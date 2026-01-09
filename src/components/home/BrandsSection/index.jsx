import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import "./index.css";
import { assetUrl } from '../../../utils';

const BrandsSection = ({ brands = {}, className = "" }) => {
    // Convert brands object to array
    const brandArray = Object.entries(brands).map(([key, brand]) => ({
        id: key,
        ...brand,
    }));

    return (
        <section className={`py-10 lg:py-20 bg-primary overflow-hidden ${className}`}>
            <div className="max-w-7xl mx-auto px-4 lg:px-6">
                {/* Section Header */}
                <div className="text-center mb-8 lg:mb-12">
                    <h2 className="text-2xl lg:text-4xl font-bold text-secondary mb-3 lg:mb-4">
                        Explore Our Brands
                    </h2>
                    <p className="text-sm lg:text-lg text-secondary max-w-2xl mx-auto px-4">
                        Discover premium vehicles from the world's leading
                        automotive manufacturers
                    </p>
                </div>
            </div>

            {/* Horizontal Scrollable Cards Container */}
            <div className="relative">
                {/* Fade Effect on Edges */}
                <div className="absolute left-0 top-0 bottom-0 w-16 lg:w-20 bg-gradient-to-r from-primary to-transparent z-10 pointer-events-none" />
                <div className="absolute right-0 top-0 bottom-0 w-16 lg:w-20 bg-gradient-to-l from-primary to-transparent z-10 pointer-events-none" />

                {/* Scrollable Cards */}
                <div className="flex gap-4 lg:gap-8 overflow-x-auto scrollbar-hide px-4 lg:px-6 pb-4 scroll-smooth">
                    {brandArray.map((brand, index) => (
                        <Link
                            key={index}
                            to={`/shop/${brand.slug}`}
                            className="group flex-shrink-0"
                            style={{
                                animation: `slideInFromRight 0.6s ease-out ${
                                    index * 0.1
                                }s both`,
                            }}
                        >
                            {/* Fixed Size Card Container */}
                            <div
                                className={`rounded-2xl overflow-hidden transition-all duration-500 hover:shadow-2xl hover:scale-[1.02] border border-primary w-64 lg:w-[360px]`}
                            >
                                {/* Vertical Layout */}
                                <div className="flex flex-col">
                                    {/* Brand Logo - Top Section (Square) */}
                                    <div className="w-full aspect-square bg-white flex items-center justify-center p-6 lg:p-12 relative overflow-hidden">
                                        {/* Subtle Glow on Hover */}
                                        <div className="absolute inset-0 bg-accent/0 group-hover:bg-accent/5 transition-all duration-500" />

                                        {/* Logo with fixed size container */}
                                        <div className="w-full h-full flex items-center justify-center relative z-10">
                                            <img
                                                src={assetUrl(brand.logo) || assetUrl(brand.image)}
                                                loading="lazy"
                                                alt={`${brand.name} logo`}
                                                className="max-w-full h-25 lg:h-40 object-contain group-hover:scale-110 transition-all duration-500"
                                            />
                                        </div>
                                    </div>

                                    {/* Brand Info - Bottom Section */}
                                    <div
                                        className={`p-4 lg:p-6 flex flex-col items-center justify-center relative bg-transparent h-[40px]`}
                                    >
                                        <h3 className="text-base lg:text-xl font-bold text-secondary inline-flex items-center group-hover:text-accent transition-colors duration-300 relative z-10 text-center">
                                            {brand.name}
                                            <ChevronRight className="w-3 h-3 lg:w-4 lg:h-4 text-secondary" />
                                        </h3>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default BrandsSection;
