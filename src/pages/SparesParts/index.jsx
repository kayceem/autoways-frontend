import { Suspense, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import LoadingSpinner from "../../components/common/Loading";
import { SuspenseImage, ShimmerFallback, preloadImage } from "../../components/common/SuspenseImage";
import { useContent } from "../../context/globalContext";
import { assetUrl } from "../../utils";
import SEO from "../../components/common/SEO";

const SparesParts = () => {
    const {content, isLoading, error} = useContent();
    const sparePart = content?.spareParts?.[0];

    // Preload first 4 part images
    useEffect(() => {
        if (sparePart?.parts) {
            sparePart.parts.slice(0, 4).forEach((part) => {
                if (part.image) {
                    preloadImage(assetUrl(part.image));
                }
            });
        }
    }, [sparePart]);

    if (isLoading) {
        return <LoadingSpinner />;
    }

    if (error) {
        return <Navigate to="/not-found" replace />;
    }

    return (
        <>
        <SEO
            title="Spare Parts & Services | Genuine Auto Parts"
            description="Find genuine spare parts for Bull machines, Toyota, Eicher, Komatsu, and other brands at Autoways Nepal. Quality parts with warranty and expert technical support."
            keywords="autoways spare parts, genuine auto parts nepal, bull machine parts, toyota parts nepal, truck spare parts, construction equipment parts"
            url="/spares-parts"
            type="website"
        />
        <div className="min-h-screen bg-primary">
            {/* Hero Section */}
            <section className="relative h-[300px] lg:h-[600px] flex items-center justify-center overflow-hidden">
                {/* Background Image */}
                <div className="absolute inset-0 bg-secondary">
                    {sparePart?.image && (
                        <Suspense fallback={<ShimmerFallback />}>
                            <SuspenseImage
                                src={assetUrl(sparePart.image)}
                                alt="Spares & Parts"
                                className="w-full h-full object-cover opacity-90"
                            />
                        </Suspense>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/50 to-primary" />
                </div>

                {/* Hero Content */}
                <div className="relative z-10 text-center px-4 lg:px-6 max-w-5xl">
                    {/* <h1 className="font-bold text-4xl lg:text-6xl text-white mb-4 lg:mb-6 animate-fade-in-up"
                        style={{
                            textShadow: `
                                0 2px 8px rgba(0, 0, 0, 0.9),
                                0 4px 16px rgba(0, 0, 0, 0.7)
                            `
                        }}
                    >
                        Spares & Parts
                    </h1> */}
                    {/* {sparePart?.description && (
                        <p className="font-medium text-lg lg:text-2xl text-white max-w-3xl mx-auto animate-fade-in-up-delay"
                            style={{
                                textShadow: `
                                    0 2px 8px rgba(0, 0, 0, 0.9),
                                    0 4px 16px rgba(0, 0, 0, 0.7)
                                `,
                                backdropFilter: 'blur(2px)',
                                background: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.1))',
                                padding: '1rem 2rem',
                                borderRadius: '0.5rem',
                                letterSpacing: '0.02em',
                                lineHeight: '1.7',
                            }}
                        >
                            {sparePart.description}
                        </p>
                    )} */}
                </div>
            </section>

            {/* Parts Section */}
            <section className="py-10 lg:py-20 px-4 lg:px-6">
                <div className="max-w-7xl mx-auto">
                    {/* Section Header */}
                    <div className="text-center mb-8 lg:mb-16">
                        <h2 className="font-bold text-2xl lg:text-5xl text-primary mb-3 lg:mb-4">
                            Our Parts Collection
                        </h2>
                        <div className="w-16 lg:w-24 h-1 bg-secondary mx-auto" />
                    </div>

                    {/* Parts Grid */}
                    {sparePart?.parts && sparePart.parts.length > 0 ? (
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-8 mb-12 lg:mb-16">
                            {sparePart.parts.map((part, index) => (
                                <div
                                    key={index}
                                    className="group animate-fade-in-up"
                                    style={{ animationDelay: `${index * 100}ms` }}
                                >
                                    <div className="relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500">
                                        {/* Image Container */}
                                        <div className="relative h-48 lg:h-64 overflow-hidden">
                                            <img
                                                src={assetUrl(part.image)}
                                                alt={`Part ${part.name}`}
                                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                                loading={index < 4 ? 'eager' : 'lazy'}
                                            />

                                            {/* Gradient Overlay */}
                                            <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/50 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />

                                            {/* Animated Border */}
                                            <div className="absolute inset-0 border-2 border-accent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />
                                        </div>

                                        {/* Shine Effect */}
                                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                                        </div>
                                    </div>

                                    {/* Part ID */}
                                    <div className="mt-3 lg:mt-4 text-center">
                                        <p className="text-sm lg:text-base font-semibold text-primary">
                                            {part.name}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-20">
                            <p className="text-primary text-xl opacity-50">
                                No parts available
                            </p>
                        </div>
                    )}

                    {/* CTA Section */}
                    <div className="text-center mt-12 lg:mt-16">
                        <div className="bg-secondary/10 rounded-3xl p-8 lg:p-12 max-w-3xl mx-auto">
                            <h3 className="font-bold text-2xl lg:text-4xl text-primary mb-4 lg:mb-6">
                                Need Assistance?
                            </h3>
                            <p className="text-primary text-base lg:text-lg mb-6 lg:mb-8 opacity-80">
                                Our team is here to help you find the right parts for your needs.
                                Get in touch with us for expert guidance and support.
                            </p>
                            <Link
                                to="/contact"
                                className="inline-flex items-center gap-3 bg-secondary hover:bg-accent/90 text-white font-semibold px-6 lg:px-8 py-3 lg:py-4 rounded-lg transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
                                state={{ subject: "Spare parts and Services Inquiry", isParts: true }}
                            >
                                <span className="text-base lg:text-lg">Contact Us</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
        </>
    );
};

export default SparesParts;
