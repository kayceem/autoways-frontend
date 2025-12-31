import { useParams, Navigate } from "react-router-dom";
import { Suspense } from "react";
import LoadingSpinner from "../../components/common/Loading";
import ProductTypeCard from "../../components/common/ProductTypeCard";
import { SuspenseImage, ShimmerFallback } from "../../components/common/SuspenseImage";
import { getBrandData } from "../../utils";
import { useContent } from "../../context/globalContext";
import { assetUrl } from "../../utils";
import SEO from "../../components/common/SEO";
import { sanitizeMetaDescription } from "../../utils/seoHelpers";

const BrandLanding = () => {
    const { brand } = useParams();
    const {content, isLoading, error} = useContent();

    const brandData = !isLoading && !error ? getBrandData(content?.brands, brand) : null;

    if (isLoading) {
        return <LoadingSpinner name={brand} />;
    }

    if (error) {
        return <Navigate to="/not-found" replace />;
    }

    if (!brandData) {
        return <Navigate to="/not-found" replace />;
    }

    return (
        <>
        <SEO
            title={`${brandData.name} Products | Buy in Nepal`}
            description={brandData.description ? sanitizeMetaDescription(brandData.description) : `Explore ${brandData.name} products available at Autoways Nepal. Browse our collection of trucks, buses, construction equipment, and more.`}
            keywords={`${brandData.name}, ${brandData.name} nepal, ${brandData.name} products, buy ${brandData.name}, autoways ${brandData.name}`}
            image={brandData.heroImage ? assetUrl(brandData.heroImage) : undefined}
            url={`/shop/${brand}`}
            type="website"
        />
        <div className={`min-h-screen bg-primary`}>
            {/* Hero Section */}
            <section className="relative h-[300px] lg:h-[600px] flex items-center justify-center overflow-hidden">
                {/* Background Image */}
                <div className="absolute inset-0 bg-secondary">
                    {brandData?.heroImage && (
                        <Suspense key={brand} fallback={<ShimmerFallback />}>
                            <SuspenseImage
                                src={assetUrl(brandData.heroImage)}
                                alt={brandData.name}
                                className="w-full h-full object-cover opacity-90"
                            />
                        </Suspense>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/50 to-primary" />
                </div>
            </section>

            {/* Product Types Section */}
            <section className="py-10 lg:py-20 px-4 lg:px-6">
                <div className="max-w-7xl mx-auto">
                    {/* Section Header */}
                    <div className="text-center mb-8 lg:mb-16">
                        <h2
                            className={`font-bold text-2xl lg:text-5xl text-primary mb-3 lg:mb-4`}
                        >
                            Explore Our Collection
                        </h2>
                        <div className="w-16 lg:w-24 h-1 bg-secondary mx-auto" />
                    </div>

                    {/* Product Type Cards Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-8">
                        {brandData?.productTypes?.map((productType, index) => (
                            <ProductTypeCard
                                key={index}
                                type={productType.name}
                                image={productType.image}
                                link={`/shop/${brand}/${productType.type?.toLowerCase()}`}
                                brandName={brandData.name}
                                className="animate-fade-in-up"
                                style={{ animationDelay: `${index * 150}ms` }}
                            />
                        ))}
                    </div>

                    {/* Empty State */}
                    {(!brandData?.productTypes ||
                        brandData.productTypes?.length === 0) && (
                        <div className="text-center py-20">
                            <p
                                className={`text-primary text-xl opacity-50`}
                            >
                                No products available
                            </p>
                        </div>
                    )}
                </div>
            </section>
        </div>
        </>
    );
};

export default BrandLanding;
