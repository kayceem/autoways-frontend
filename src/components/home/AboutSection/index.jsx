import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const AboutSection = ({ aboutData = {}, className = "" }) => {
    const {
        title = "Welcome to Autoways",
        content = "",
        image = "",
    } = aboutData;

    const brandName = aboutData.brandName || "Autoways";

    return (
        <section
            className={`relative py-32 bg-secondary-${brandName.toLowerCase()} overflow-hidden ${className}`}
        >
            {/* Wavy Background Pattern */}
            <div className="absolute inset-0 opacity-[0.09]">
                <svg
                    className="absolute w-full h-full"
                    preserveAspectRatio="none"
                    viewBox="0 0 1440 800"
                    fill="none"
                >
                    {/* Flowing Wave 1 */}
                    <path
                        d="M-100,200 C200,100 400,300 600,200 S1000,100 1200,200 S1600,300 1800,200"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        fill="none"
                    />
                    {/* Flowing Wave 2 */}
                    <path
                        d="M-100,350 C150,250 350,450 600,350 S900,250 1150,350 S1400,450 1700,350"
                        stroke="currentColor"
                        strokeWidth="1"
                        fill="none"
                    />
                    {/* Flowing Wave 3 */}
                    <path
                        d="M-50,500 C200,400 450,600 700,500 S1050,400 1300,500 S1550,600 1800,500"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        fill="none"
                    />
                    {/* Flowing Wave 4 */}
                    <path
                        d="M-100,650 C100,550 350,750 650,650 S950,550 1250,650 S1550,750 1800,650"
                        stroke="currentColor"
                        strokeWidth="1"
                        fill="none"
                    />
                </svg>
            </div>

            {/* Curved Accent Lines */}
            <div className="absolute inset-0 opacity-[0.1]">
                <svg
                    className="absolute w-full h-full"
                    preserveAspectRatio="none"
                    viewBox="0 0 1440 800"
                    fill="none"
                >
                    {/* Sweeping Curve 1 */}
                    <path
                        d="M0,100 Q360,400 720,200 T1440,300"
                        stroke="currentColor"
                        strokeWidth="2"
                        fill="none"
                    />
                    {/* Sweeping Curve 2 */}
                    <path
                        d="M0,600 Q400,300 800,500 T1440,400"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        fill="none"
                    />
                    {/* Circular Arc */}
                    <circle
                        cx="1200"
                        cy="150"
                        r="200"
                        stroke="currentColor"
                        strokeWidth="1"
                        fill="none"
                    />
                    {/* Circular Arc 2 */}
                    <circle
                        cx="200"
                        cy="700"
                        r="150"
                        stroke="currentColor"
                        strokeWidth="1"
                        fill="none"
                    />
                </svg>
            </div>

            <div className="max-w-8xl mx-auto px-20 relative z-10">
                <div className="flex gap-20 justify-between items-center">
                    {/* Left Side - Text Content */}
                    <div className="w-xl">
                        {/* Decorative Element */}
                        <div className="absolute -left-4 top-0 w-1 h-24 bg-accent" />

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
                            <p className="text-xl text-secondary leading-relaxed mb-10">
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

                    {/* Right Side - Diagonal Cut Image */}
                    <div className="w-[850px]">
                        <div className="relative h-[650px]">
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
                                    className="w-full h-full object-fill scale-100 hover:scale-120 transition-transform duration-700"
                                />
                                {/* Modern Gradient Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-br from-accent/20 via-transparent to-transparent mix-blend-overlay" />
                            </div>

                            {/* Decorative Accent Element */}
                            <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-accent/10 rounded-full blur-3xl" />
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