import React from "react";
import { Link } from "react-router-dom";
import WaveBackground from "../../common/WaveBackground";
import { assetUrl } from '../../../utils';

const AboutSection = ({ aboutData = {}, className = "" }) => {
    const {
        title = "Welcome to Autoways",
        content = "",
        image = "",
    } = aboutData;

    return (
        <section
            className={`relative py-12 lg:py-24 bg-primary overflow-hidden ${className}`}
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
                {/* Small Label */}
                <div className="mb-4 lg:mb-6">
                    <span className="text-accent font-semibold text-xs lg:text-sm uppercase tracking-widest">
                        About Us
                    </span>
                </div>

                {/* Title */}
                <h2 className="text-3xl lg:text-5xl font-bold text-secondary mb-6 lg:mb-8 leading-tight">
                    {title}
                </h2>

                {/* Content with floating image */}
                <div className="text-secondary">
                    {/* Floating Image - positioned in the middle-right */}
                    <div className="float-right ml-6 mb-4 lg:ml-10 lg:mb-6 w-full lg:w-[50%]">
                        <div className="relative aspect-[16/9] rounded-2xl overflow-hidden shadow-xl">
                            <img
                                src={assetUrl(image)}
                                alt={title}
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-transparent to-transparent mix-blend-overlay" />
                        </div>
                    </div>

                    {/* Text content that wraps around the image */}
                    <p className="text-base lg:text-2xl leading-relaxed text-justify mb-4 lg:mb-8">
                        {content}
                    </p>

                    {/* CTA Button */}
                    <div className="clear-both pt-4">
                        <Link
                            to="/about"
                            className="inline-flex items-center gap-2 lg:gap-3 bg-accent text-dark px-6 py-3 lg:px-10 lg:py-4 rounded-full font-semibold text-sm lg:text-lg transition-all duration-300 hover:scale-105 hover:shadow-lg"
                        >
                            Learn More
                        </Link>
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
