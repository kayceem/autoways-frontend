import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { Play, Pause } from "lucide-react";
import { useContent } from "../../../context/globalContext";
import LoadingSpinner from "../../common/Loading";
import WaveBackground from "../../common/WaveBackground";
import "./index.css";
import { assetUrl } from '../../../utils/assetUrl';

const BullSection = ({ className = "" }) => {
    const { content, isLoading } = useContent();
    const [isPlaying, setIsPlaying] = useState(true);
    const[pausePlaying, setPaudePlaying] = useState(true);
    const videoRef = useRef(null);

    if (isLoading) return <LoadingSpinner size={64} />;

    const bull = content?.brands?.bull;
    const brandName = bull?.name || "Bull";

    const togglePlayPause = () => {
        setPaudePlaying(true);
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.pause();
            } else {
                // If video ended, restart from beginning
                if (videoRef.current.ended) {
                    videoRef.current.currentTime = 0;
                }
                videoRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    const handleVideoEnd = () => {
        setIsPlaying(false);
        setPaudePlaying(false);
    };

    return (
        <section
            className={`relative py-24 bg-primary overflow-hidden ${className}`}
        >
            {/* Wave Background - Top */}
            <WaveBackground
                position="top"
                opacity={0.15}
                waveColor="#f5f5f5"
                animate={true}
            />

            {/* Wave Background - Bottom */}
            <WaveBackground
                position="bottom"
                opacity={0.1}
                waveColor="#232323"
                animate={true}
            />

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
                    {/* Left Side - Portrait Video */}
                    <div className="relative flex justify-center order-2 lg:order-1">
                        <div className="relative w-full max-w-sm">
                            {/* Geometric Frame */}
                            <div className="absolute -inset-3 border-2 border-accent/30 rounded-3xl transform rotate-2" />
                            <div className="absolute -inset-3 border-2 border-accent/20 rounded-3xl transform -rotate-2" />

                            {/* Video Container - Portrait Aspect Ratio */}
                            <div className="relative aspect-[9/16] rounded-2xl overflow-hidden shadow-2xl group">
                                {/* Gradient Border Effect */}
                                <div className="absolute -inset-[2px] bg-gradient-to-br from-accent via-accent/50 to-transparent rounded-2xl -z-10" />

                                {/* Video Element */}
                                <video
                                    ref={videoRef}
                                    src={
                                        assetUrl(bull?.video) || "/assets/videos/bull-promo.mp4"
                                    }
                                    autoPlay
                                    muted
                                    playsInline
                                    onEnded={handleVideoEnd}
                                    className="w-full h-full object-cover"
                                />

                                {/* Video Overlay - subtle gradient for depth */}
                                <div className="absolute inset-0 bg-gradient-to-t from-primary/40 via-transparent to-transparent pointer-events-none" />

                                {/* Play/Pause Button */}
                                <button
                                    onClick={togglePlayPause}
                                    className="absolute bottom-4 right-4 w-12 h-12 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-black/70 hover:scale-110 z-10"
                                    aria-label={
                                        isPlaying ? "Pause video" : "Play video"
                                    }
                                >
                                    {isPlaying ? (
                                        <Pause size={20} fill="currentColor" />
                                    ) : (
                                        <Play
                                            size={20}
                                            fill="currentColor"
                                            className="ml-1"
                                        />
                                    )}
                                </button>

                                {/* Status indicator */}
                                {pausePlaying && (
                                    <div className="absolute bottom-4 left-4 flex items-center gap-2 text-white/80">
                                        <div
                                            className={`w-2 h-2 rounded-full ${
                                                isPlaying
                                                    ? "bg-red-500 animate-pulse"
                                                    : "bg-gray-400"
                                            }`}
                                        />
                                        <span className="text-xs font-medium uppercase tracking-wider">
                                            {isPlaying ? "Playing" : "Paused"}
                                        </span>
                                    </div>
                                )}
                            </div>

                            {/* Stats Badge */}
                            {/* <div
                                className={`absolute -bottom-4 -right-4 bg-secondary text-primary px-6 py-4 rounded-2xl shadow-xl z-10`}
                            >
                                <div className="text-3xl font-bold text-accent">
                                    100%
                                </div>
                                <div className="text-sm font-medium opacity-80">
                                    Reliability
                                </div>
                            </div> */}

                            {/* Decorative Elements */}
                            <div className="absolute -top-6 -left-6 w-12 h-12 border-2 border-accent/30 rounded-full" />
                            <div className="absolute -bottom-8 -right-8 w-16 h-16 border-2 border-accent/20 rounded-full" />
                        </div>
                    </div>

                    {/* Right Side - Promotional Content */}
                    <div className="relative text-center lg:text-left order-1 lg:order-2">
                        {/* Decorative Line */}
                        <div className="hidden lg:block absolute -left-4 top-0 w-1 h-24 bg-gradient-to-b from-accent to-transparent" />

                        <div className="max-w-xl mx-auto lg:mx-0">
                            {/* Label */}
                            <div
                                className={`inline-flex items-center gap-2 mb-6 px-4 py-2 bg-accent/10 rounded-full`}
                            >
                                <div className="w-2 h-2 bg-accent rounded-full animate-pulse" />
                                <span
                                    className={`text-accent font-semibold text-sm uppercase tracking-widest`}
                                >
                                    Power & Reliability
                                </span>
                            </div>

                            {/* Main Heading */}
                            <h2 className="text-5xl lg:text-6xl font-bold text-secondary mb-6 leading-tight">
                                Built Like a{" "}
                                <span
                                    className={`text-accent relative`}
                                >
                                    Bull
                                    <svg
                                        className="absolute -bottom-2 left-0 w-full"
                                        viewBox="0 0 100 12"
                                        preserveAspectRatio="none"
                                    >
                                        <path
                                            d="M0,8 Q25,0 50,8 T100,8"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="3"
                                            className="text-accent/40"
                                        />
                                    </svg>
                                </span>
                            </h2>

                            {/* Description */}
                            <p className="text-lg text-secondary/80 leading-relaxed mb-10">
                                Experience the unwavering strength and
                                reliability that drives your journey forward.
                                Our commitment to excellence ensures you get the
                                power and performance you deserve.
                            </p>

                            {/* Feature Cards */}
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
                                <div className="group p-4 bg-secondary/5 rounded-xl hover:bg-accent/10 transition-colors duration-300 cursor-default">
                                    <div className="w-10 h-10 text-accent rounded-lg flex items-center justify-center mb-3 mx-auto lg:mx-0 group-hover:bg-accent/30 transition-colors">
                                        <svg
                                            className={`w-5 h-5 text-accent`}
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M13 10V3L4 14h7v7l9-11h-7z"
                                            />
                                        </svg>
                                    </div>
                                    <div className="text-primary/80 font-semibold text-sm">
                                        Unmatched Strength
                                    </div>
                                </div>

                                <div className="group p-4 bg-secondary/5 rounded-xl hover:bg-accent/10 transition-colors duration-300 cursor-default">
                                    <div className="w-10 h-10 bg-accent/20 rounded-lg flex items-center justify-center mb-3 mx-auto lg:mx-0 group-hover:bg-accent/30 transition-colors">
                                        <svg
                                            className={`w-5 h-5 text-accent`}
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                                            />
                                        </svg>
                                    </div>
                                    <div className="text-primary/80 font-semibold text-sm">
                                        Trusted Performance
                                    </div>
                                </div>

                                <div className="group p-4 bg-secondary/5 rounded-xl hover:bg-accent/10 transition-colors duration-300 cursor-default">
                                    <div className="w-10 h-10 bg-accent/20 rounded-lg flex items-center justify-center mb-3 mx-auto lg:mx-0 group-hover:bg-accent/30 transition-colors">
                                        <svg
                                            className={`w-5 h-5 text-accent`}
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                            />
                                        </svg>
                                    </div>
                                    <div className="text-primary/80 font-semibold text-sm">
                                        Built to Last
                                    </div>
                                </div>
                            </div>

                            {/* CTA Button */}
                            <Link
                                to="/shop/bull"
                                className={`group inline-flex items-center gap-3 bg-accent text-primary px-8 py-4 rounded-full font-semibold hover:bg-accent/90 transition-all duration-300 hover:shadow-lg hover:shadow-accent/25`}
                            >
                                <span>Explore Products</span>
                                <svg
                                    className="w-5 h-5 transform group-hover:translate-x-1 transition-transform"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                                    />
                                </svg>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Background Decorative Elements */}
            <div className="absolute top-1/2 left-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl -translate-y-1/2 -translate-x-1/2" />
            <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-secondary/5 rounded-full blur-3xl translate-x-1/4 translate-y-1/4" />
            <div className="absolute top-20 right-20 w-32 h-32 bg-accent/5 rounded-full blur-2xl" />
        </section>
    );
};

export default BullSection;
