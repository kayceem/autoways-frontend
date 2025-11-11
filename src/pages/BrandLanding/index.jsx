import { useBeforeUnload, useParams } from "react-router-dom";
import { Mouse } from "lucide-react";
import LoadingSpinner from "../../components/common/Loading";
import ProductTypeCard from "../../components/common/ProductTypeCard";
import useBrandQuery from "../../hooks/useBrandQuery";
import { useState } from "react";

const BrandLanding = () => {
    const { brand } = useParams();
    const { data: brandData, isLoading, error } = useBrandQuery(brand);

    if (isLoading) {
        return <LoadingSpinner name={brand} />;
    }
    console.log("Brand Data:", brandData);
    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-primary">
                <div className="text-error text-2xl">
                    Failed to load brand data
                </div>
            </div>
        );
    }

    return (
        <div className={`min-h-screen bg-primary-${brand}`}>
            {/* Hero Section */}
            <section className="relative h-screen flex items-center justify-center overflow-hidden">
                {/* Background Image with Mouse Glow Effect */}
                <div className={`absolute inset-0 bg-secondary`}>
                    {brandData.images?.[0] && (
                        <img
                            src={brandData.images[0]}
                            alt={brandData.name}
                            className="w-full h-full object-cover opacity-40"
                        />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/50 to-primary" />
                </div>

                {/* Hero Content */}
                <div className="relative z-10 text-center px-6 max-w-5xl h-90">
                    {/* Brand Name with Enhanced Typography and Text Stroke */}
                    <h1
                        className={`font-bold text-8xl text-primary-${brand} mb-6 animate-fade-in-up`}
                        style={{
                            textShadow: `
                -2px -2px 0 #fff,
                2px -2px 0 #fff,
                -2px 2px 0 #fff,
                2px 2px 0 #fff,
                0 0 5px rgba(0,0,0,0.3)
            `,
                            letterSpacing: "0.02em",
                            fontWeight: "1500",
                        }}
                    >
                        {brandData.name}
                    </h1>

                    {/* Description with White Border and Better Typography */}
                    {brandData.description && (
                        <p
                            className={`font-medium text-2xl text-primary-${brand} max-w-3xl mx-auto mb-12 opacity-90 animate-fade-in-up-delay`}
                            style={{
                                textShadow: `
                    -0.5px -0.5px 0 #fff,
                    0.5px -0.5px 0 #fff,
                    -0.5px 0.5px 0 #fff,
                    0.5px 0.5px 0 #fff,
                    0 0 15px rgba(0,0,0,0.2)
                `,
                                letterSpacing: "0.01em",
                                lineHeight: "1.6",
                            }}
                        >
                            {brandData.description}
                        </p>
                    )}

                    {/* Scroll Indicator */}
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bottom-1/2 animate-bounce">
                        <Mouse size={40} className="text-accent" />
                    </div>
                </div>
            </section>

            {/* Product Types Section */}
            <section className="py-20 px-6">
                <div className="max-w-7xl mx-auto">
                    {/* Section Header */}
                    <div className="text-center mb-16">
                        <h2
                            className={`font-bold text-5xl text-secondary-${brand} mb-4`}
                        >
                            Explore Our Collection
                        </h2>
                        <div className="w-24 h-1 bg-accent mx-auto" />
                    </div>

                    {/* Product Type Cards Grid */}
                    <div className="grid grid-cols-3 gap-8">
                        {brandData.productTypes?.map((productType, index) => (
                            <ProductTypeCard
                                key={index}
                                type={productType.type}
                                image={productType.image}
                                link={`/shop/${brand}/${productType.type.toLowerCase()}`}
                                brandName={brandData.name}
                                className="animate-fade-in-up"
                                style={{ animationDelay: `${index * 150}ms` }}
                            />
                        ))}
                    </div>

                    {/* Empty State */}
                    {(!brandData.productTypes ||
                        brandData.productTypes.length === 0) && (
                        <div className="text-center py-20">
                            <p
                                className={`text-secondary-${brand} text-xl opacity-50`}
                            >
                                No products available
                            </p>
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
};

export default BrandLanding;
