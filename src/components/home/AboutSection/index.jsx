import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import WaveBackground from "../../common/WaveBackground";

const AboutSection = ({ aboutData = {}, className = "" }) => {
    const {
        title = "Welcome to Autoways",
        content = "",
        image = "",
    } = aboutData;

    const brandName = aboutData.brandName || "Autoways";

    return (
        <section
            className={`relative py-32 bg-primary overflow-hidden ${className}`}
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

            <div className="max-w-8xl mx-auto px-20 relative z-10">
                <div className="relative flex items-center min-h-[750px]">
                    {/* Image Container - 80% width, positioned to the right */}
                    <div className="absolute right-0 w-[80%] h-[750px] z-0">
                        <div className="relative h-full">
                            {/* Diagonal Cut Container */}
                            <div
                                className="absolute inset-0 overflow-hidden rounded-3xl"
                                style={{
                                    clipPath:
                                        "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
                                }}
                            >
                                <img
                                    src={image}
                                    alt={title}
                                    className="w-full h-full object-cover scale-100 hover:scale-110 transition-transform duration-700"
                                />
                                {/* Modern Gradient Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-transparent to-transparent mix-blend-overlay" />
                            </div>

                            {/* Decorative Accent Element */}
                            <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-accent/10 rounded-full blur-3xl" />
                        </div>
                    </div>

                    {/* Text Content - Overlaying on the left, extending 30% onto the image */}
                    <div className="relative z-10 w-[50%] pr-8">
                        {/* Semi-transparent background for text readability */}
                        <div className="bg-primary/95 backdrop-blur-sm p-12 rounded-3xl shadow-2xl">
                            {/* Decorative Element */}
                            <div className="absolute -left-4 top-12 w-1 h-24 bg-accent" />

                            <div className="max-w-xl">
                                {/* Small Label */}
                                <div className="inline-block mb-6">
                                    <span className="text-accent font-semibold text-sm uppercase tracking-widest">
                                        About Us
                                    </span>
                                </div>

                                {/* Title */}
                                <h2 className="text-6xl font-bold text-secondary mb-8 leading-tight">
                                    {title}
                                </h2>

                                {/* Content */}
                                <p className="text-xl text-justify text-secondary leading-relaxed mb-10">
                                    {content}
                                </p>

                                {/* Single CTA Button */}
                                <Link
                                    to="/about"
                                    className="inline-flex items-center gap-3 bg-accent text-secondary px-10 py-4 rounded-full font-semibold text-lg hover:bg-accent/90 transition-all duration-300 transform hover:scale-105 hover:gap-4 group"
                                >
                                    Learn More About Us
                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                                </Link>
                            </div>
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