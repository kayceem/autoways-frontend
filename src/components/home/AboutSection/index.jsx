import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import WaveBackground from "../../common/WaveBackground";
import { assetUrl } from '../../../utils';

const AboutSection = ({ aboutData = {}, className = "" }) => {
    const {
        title = "Welcome to Autoways",
        content = "",
        image = "",
    } = aboutData;

    const brandName = aboutData.brandName || "Autoways";

    return (
        <section
            className={`relative py-12 lg:py-32 bg-primary overflow-hidden ${className}`}
        >
            {/* Wave Background - Top */}
            <WaveBackground
                position="top"
                opacity={0.45}
                waveColor="#ccc7c7ff"
                animate={true}
                />

            {/* Wave Background - Bottom */}
            <WaveBackground
                position="bottom"
                opacity={0.45}
                waveColor="#e0dcdcff"
                animate={true}
            />

            <div className="max-w-8xl mx-auto px-4 lg:px-20 relative z-10">
                <div className="flex flex-col lg:flex-row gap-8 lg:gap-20 justify-between items-center">
                    {/* Left Side - Text Content */}
                    <div className="w-full lg:w-xl">
                        {/* Decorative Element */}
                        <div className="hidden lg:block absolute -left-4 top-0 w-1 h-24 bg-accent" />

                        <div className="max-w-xl">
                            {/* Small Label */}
                            <div className="inline-block mb-4 lg:mb-6">
                                <span className="text-accent font-semibold text-xs lg:text-sm uppercase tracking-widest">
                                    About Us
                                </span>
                            </div>

                            {/* Title */}
                            <h2 className="text-3xl lg:text-6xl font-bold text-secondary mb-4 lg:mb-8 leading-tight">
                                {title}
                            </h2>

                            {/* Content */}
                            <p className="text-sm lg:text-xl text-justify text-secondary leading-relaxed mb-6 lg:mb-10">
                                {content}
                            </p>

                            {/* Single CTA Button */}
                            <Link
                                to="/about"
                                className="inline-flex items-center gap-2 lg:gap-3 bg-accent text-secondary px-6 py-3 lg:px-10 lg:py-4 rounded-full font-semibold text-sm lg:text-lg hover:bg-accent/90 transition-all duration-300 transform hover:scale-105 hover:gap-4 group"
                            >
                                Learn More About Us
                            </Link>
                        </div>
                    </div>

                    {/* Right Side - Diagonal Cut Image */}
                    <div className="w-full lg:w-[1100px]">
                        <div className="relative h-64 lg:h-[750px]">
                            {/* Diagonal Cut Container */}
                            <div
                                className="absolute inset-0 overflow-hidden rounded-2xl lg:rounded-3xl"
                                style={{
                                    clipPath:
                                        "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
                                }}
                            >
                                <img
                                    src={assetUrl(image)}
                                    alt={title}
                                    className="w-full h-full object-cover scale-100 hover:scale-110 transition-transform duration-700"
                                />
                                {/* Modern Gradient Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-transparent to-transparent mix-blend-overlay" />
                            </div>

                            {/* Decorative Accent Element */}
                            <div className="hidden lg:block absolute -bottom-6 -right-6 w-48 h-48 bg-accent/10 rounded-full blur-3xl" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Background Decorative Elements */}
            <div className="absolute top-1/4 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
            <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-primary/30 rounded-full blur-3xl" />
        </section>
    );
};

export default AboutSection;