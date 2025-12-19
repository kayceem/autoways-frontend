import { Link, Navigate, useParams } from 'react-router-dom';
import {
    ChevronDown,
    Download,
    FileText,
    Phone,
    Mail,
    MapPin,
    Check,
    Fuel,
    Battery,
    Zap
} from 'lucide-react';
import useProductsQuery from '../../hooks/useProductsQuery';
import ImageGallery from '../../components/common/ImageGallery';
import SpecificationsDisplay from '../../components/common/SpecificationsDisplay';
import LoadingSpinner from '../../components/common/Loading';
import useContentQuery from '../../hooks/useContentQuery';
import { assetUrl } from '../../utils';

const ProductDetails = () => {
    const { brand, typeSlug, id } = useParams();
    const typeName = typeSlug.replace(/_/g, ' ');
    const { data: siteContent, isLoading, error } = useContentQuery();
    const { data: productData, isLoading: productLoading, error: productError } = useProductsQuery({id: id});

    if (isLoading || productLoading) {
        return <LoadingSpinner name={brand} />;
    }
    
    if (error || productError) {
        return <div className="error-message">Error loading product details: {error?.message || productError?.message}</div>;
    }

    if (productData.length === 0) {
        return <Navigate to="/not-found" replace />;
    }
    const product = productData[0];

    const getFuelTypeIcon = (fuelType) => {
        switch(fuelType) {
            case 'electric':
                return <Zap size={20} />;
            case 'hybrid':
                return <Battery size={20} />;
            default:
                return <Fuel size={20} />;
        }
    };

    const getFuelTypeLabel = (fuelType) => {
        switch(fuelType) {
            case 'electric':
                return 'Electric';
            case 'hybrid-petrol':
                return 'Hybrid Petrol';
            case 'hybrid-diesel':
                return 'Hybrid Diesel';
            case 'diesel':
                return 'Diesel';
            default:
                return 'Petrol';
        }
    };

    const handleDownloadSpecs = () => {
        window.open(assetUrl(product?.specSheetUrl), '_blank');
    };

    
    const handleViewBrochure = () => {
        window.open(assetUrl(product?.brochureUrl), '_blank');
    };

    return (
        <div className="min-h-screen bg-primary">
            {/* Breadcrumb */}
            <section className="bg-primary border-b border-primary/10">
                <div className="max-w-7xl mx-auto px-4 lg:px-6 py-4 lg:py-6">
                    <div className="flex items-center gap-2 text-xs lg:text-sm text-primary opacity-70">
                        <Link to="/" className="hover:text-accent hover:opacity-100 transition-all">Home</Link>
                        <ChevronDown size={16} className="rotate-[-90deg]" />
                        <Link to={`/shop/${brand}`} className="capitalize hover:text-accent hover:opacity-100 transition-all">{brand}</Link>
                        <ChevronDown size={16} className="rotate-[-90deg]" />
                        <Link to={`/shop/${brand}/${typeSlug}`} className="capitalize hover:text-accent hover:opacity-100 transition-all">{typeName}</Link>
                        <ChevronDown size={16} className="rotate-[-90deg]" />
                        <span className="font-semibold text-secondary opacity-100">{product?.name}</span>
                    </div>
                </div>
            </section>

            {/* Hero Section */}
            <section className="bg-primary">
                <div className="max-w-7xl mx-auto px-4 lg:px-6 py-6 lg:py-12">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-16 items-start">
                        {/* Left: Image Gallery */}
                        <div className="lg:sticky lg:top-8">
                            <ImageGallery
                                images={product?.images}
                                productName={product?.name}
                            />
                        </div>

                        {/* Right: Product Info */}
                        <div className="py-4 lg:py-8">
                            <h1 className="text-3xl lg:text-5xl font-bold text-primary mb-4 lg:mb-6 leading-tight">{product?.name}</h1>

                            <div className="inline-flex items-center gap-2 px-4 lg:px-6 py-2 lg:py-3 bg-accent/10 border border-accent rounded-full font-semibold mb-4 lg:mb-6 text-primary text-sm lg:text-base">
                                {getFuelTypeIcon(product?.fuelType)}
                                <span>{getFuelTypeLabel(product?.fuelType)}</span>
                            </div>

                            {product?.shortDescription && (
                                <p className="text-base lg:text-xl font-semibold text-primary mb-3 lg:mb-4 leading-relaxed">
                                    {product?.shortDescription}
                                </p>
                            )}

                            {product?.fullDescription && (
                                <p className="text-sm lg:text-base text-primary mb-6 lg:mb-8 leading-relaxed opacity-100">
                                    {product?.fullDescription}
                                </p>
                            )}

                            {/* Action Buttons */}
                            <div className="flex flex-col lg:flex-row gap-3 lg:gap-4">
                                <button
                                    onClick={handleDownloadSpecs}
                                    className="flex items-center justify-center gap-2 lg:gap-3 px-6 lg:px-8 py-3 lg:py-4 rounded-xl font-bold text-sm lg:text-base bg-accent text-secondary hover:bg-secondary hover:text-accent border-2 border-transparent hover:border-accent transition-all cursor-pointer"
                                >
                                    <Download size={20} />
                                    <span>Download Specifications</span>
                                </button>

                                <button
                                    onClick={handleViewBrochure}
                                    className="flex items-center justify-center gap-2 lg:gap-3 px-6 lg:px-8 py-3 lg:py-4 rounded-xl font-bold text-sm lg:text-base bg-accent text-primary hover:bg-accent hover:text-secondary border-2 border-accent hover:shadow-lg transition-all cursor-pointer"
                                >
                                    <FileText size={20} />
                                    <span>View Brochure</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            {product?.features && product?.features.length > 0 && (
                <section className="bg-primary border-t border-primary/10">
                    <div className="max-w-7xl mx-auto px-4 lg:px-6 py-6 lg:py-12">
                        <h2 className="text-2xl lg:text-4xl font-bold mb-6 lg:mb-8 text-center text-primary">Key Features</h2>
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 lg:gap-4">
                            {product?.features.map((feature, index) => (
                                <div key={index} className="flex items-center gap-3 lg:gap-4 p-4 lg:p-5 bg-gradient-to-br from-primary to-primary/95 rounded-xl border border-accent/20 hover:border-accent hover:-translate-y-1 hover:shadow-lg transition-all">
                                    <Check className="flex-shrink-0 text-accent" size={20} />
                                    <span className="text-sm lg:text-base font-medium leading-relaxed text-secondary">{feature}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Specifications Section */}
            {product?.specifications && (
                <section className="py-6 lg:py-12 bg-accent">
                    <div className="max-w-7xl mx-auto px-4 lg:px-6">
                        <h2 className="text-2xl lg:text-4xl font-bold mb-6 lg:mb-8 text-center text-primary">Technical Specifications</h2>
                        <SpecificationsDisplay
                            specifications={product?.specifications}
                            fuelType={product?.fuelType}
                        />
                    </div>
                </section>
            )}

            {/* Contact CTA Section */}
            <section className="bg-gradient-to-br from-secondary to-secondary/95 border-t border-primary/10 border-b border-primary/10">
                <div className="max-w-5xl mx-auto px-4 lg:px-6 py-10 lg:py-16 text-center">
                    <h2 className="text-2xl lg:text-4xl font-bold mb-3 lg:mb-4 text-primary">Interested in {product?.name}?</h2>
                    <p className="text-sm lg:text-lg opacity-80 mb-8 lg:mb-12 text-primary">
                        Get in touch with our sales team for pricing, availability, and expert guidance
                    </p>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-8 mb-8 lg:mb-12">
                        <a href={`tel:${siteContent?.info?.phone}`} className="flex items-center gap-4 lg:gap-6 p-6 lg:p-8 rounded-2xl border-2 border-transparent hover:border-accent hover:-translate-y-1 hover:shadow-lg transition-all bg-primary text-secondary">
                            <Phone size={24} className="flex-shrink-0 text-accent" />
                            <div className="text-left">
                                <div className="text-xs lg:text-sm font-semibold opacity-70 mb-1 text-secondary">Call Us</div>
                                <div className="text-sm lg:text-base font-bold text-secondary">{siteContent?.contactInfo?.[0].phone}</div>
                            </div>
                        </a>

                        <a href={`mailto:${siteContent?.info?.email}`} className="flex items-center gap-4 lg:gap-6 p-6 lg:p-8 rounded-2xl border-2 border-transparent hover:border-accent hover:-translate-y-1 hover:shadow-lg transition-all bg-primary text-secondary">
                            <Mail size={24} className="flex-shrink-0 text-accent" />
                            <div className="text-left">
                                <div className="text-xs lg:text-sm font-semibold opacity-70 mb-1 text-secondary">Email Us</div>
                                <div className="text-sm lg:text-base font-bold text-secondary">{siteContent?.contactInfo?.[0].email}</div>
                            </div>
                        </a>

                        <Link to="/locations" className="flex items-center gap-4 lg:gap-6 p-6 lg:p-8 rounded-2xl border-2 border-transparent hover:border-accent hover:-translate-y-1 hover:shadow-lg transition-all bg-primary text-secondary">
                            <MapPin size={24} className="flex-shrink-0 text-accent" />
                            <div className="text-left">
                                <div className="text-xs lg:text-sm font-semibold opacity-70 mb-1 text-secondary">Visit Us</div>
                                <div className="text-sm lg:text-base font-bold text-secondary">Find nearest location</div>
                            </div>
                        </Link>
                    </div>

                    <Link to="/contact" className="inline-block px-8 lg:px-12 py-3 lg:py-5 rounded-xl font-bold text-base lg:text-lg border-2 border-accent hover:-translate-y-1 hover:shadow-xl transition-all bg-accent text-secondary hover:bg-secondary hover:text-accent">
                        Send Inquiry
                    </Link>
                </div>
            </section>

            {/* Related Products Section */}
            <section className="bg-primary text-center">
                <div className="max-w-7xl mx-auto px-4 lg:px-6 py-6 lg:py-12">
                    <h2 className="text-2xl lg:text-4xl font-bold mb-6 lg:mb-8 text-primary capitalize">More products from {brand}</h2>
                    <Link
                        to={`/shop/${brand}/${typeSlug}`}
                        className="inline-block px-6 lg:px-10 py-3 lg:py-4 rounded-xl font-bold text-sm lg:text-base border-2 border-accent hover:-translate-y-1 hover:shadow-xl transition-all bg-accent text-secondary hover:bg-secondary hover:text-accent"
                    >
                        View All products
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default ProductDetails;
