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
import WaveBackground from '../../components/common/WaveBackground';
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
            <section className="bg-primary border-b border-neutral-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 lg:py-4">
                    <nav className="flex items-center gap-2 text-xs lg:text-sm" aria-label="Breadcrumb">
                        <Link to="/" className="text-secondary/60 hover:text-accent transition-colors font-medium">Home</Link>
                        <ChevronDown size={14} className="rotate-[-90deg] text-secondary/40" />
                        <Link to={`/shop/${brand}`} className="text-secondary/60 hover:text-accent transition-colors font-medium capitalize">{brand}</Link>
                        <ChevronDown size={14} className="rotate-[-90deg] text-secondary/40" />
                        <Link to={`/shop/${brand}/${typeSlug}`} className="text-secondary/60 hover:text-accent transition-colors font-medium capitalize">{typeName}</Link>
                        <ChevronDown size={14} className="rotate-[-90deg] text-secondary/40" />
                        <span className="font-semibold text-secondary">{product?.name}</span>
                    </nav>
                </div>
            </section>

            {/* Hero Section */}
            <section className="bg-primary relative">
                <WaveBackground position="top" opacity={0.05} waveColor="#a7ed81" />
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-16 relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-16 items-start">
                        {/* Left: Image Gallery */}
                        <div className="lg:sticky lg:top-24 animate-fade-in">
                            <ImageGallery
                                images={product?.images}
                                productName={product?.name}
                            />
                        </div>

                        {/* Right: Product Info */}
                        <div className="flex flex-col gap-6 animate-fade-in-up">
                            <div>
                                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-secondary mb-4 leading-tight tracking-tight">{product?.name}</h1>

                                <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/50 border border-accent rounded-full text-sm font-semibold text-secondary">
                                    {getFuelTypeIcon(product?.fuelType)}
                                    <span>{getFuelTypeLabel(product?.fuelType)}</span>
                                </div>
                            </div>

                            {product?.shortDescription && (
                                <p className="text-lg lg:text-xl font-semibold text-secondary leading-relaxed">
                                    {product?.shortDescription}
                                </p>
                            )}

                            {product?.fullDescription && (
                                <p className="text-sm lg:text-base text-secondary/70 leading-relaxed">
                                    {product?.fullDescription}
                                </p>
                            )}

                            {/* Action Buttons */}
                            <div className="flex flex-col sm:flex-row gap-3 pt-2">
                                <button
                                    onClick={handleDownloadSpecs}
                                    className="group flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg font-semibold text-sm lg:text-base bg-accent text-secondary hover:bg-accent-2 transition-all duration-300 shadow-sm hover:shadow-md cursor-pointer hover:-translate-y-0.5"
                                >
                                    <Download size={18} className="group-hover:scale-110 transition-transform duration-300" />
                                    <span>Download Specs</span>
                                </button>

                                <button
                                    onClick={handleViewBrochure}
                                    className="group flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg font-semibold text-sm lg:text-base bg-primary text-secondary border-2 border-neutral-300 hover:border-accent hover:bg-accent/10 transition-all duration-300 cursor-pointer hover:-translate-y-0.5"
                                >
                                    <FileText size={18} className="group-hover:scale-110 transition-transform duration-300" />
                                    <span>View Brochure</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            {product?.features && product?.features.length > 0 && (
                <section className="bg-accent/30 border-neutral-200 relative overflow-hidden">
                    <WaveBackground position="top" opacity={0.08} waveColor="#35621b" />
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16 relative z-10">
                        <h2 className="text-2xl lg:text-3xl font-bold mb-8 lg:mb-10 text-center text-secondary animate-fade-in">Key Features</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {product?.features.map((feature, index) => (
                                <div key={index} className="flex items-start gap-3 p-4 bg-primary rounded-lg border border-neutral-200 hover:border-accent/60 hover:shadow-md transition-all duration-300 animate-slide-up cursor-default hover:-translate-y-1" style={{animationDelay: `${index * 50}ms`}}>
                                    <Check className="flex-shrink-0 text-accent mt-0.5" size={18} />
                                    <span className="text-sm lg:text-base font-medium leading-relaxed text-secondary">{feature}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Specifications Section */}
            {product?.specifications && (
                <section className="bg-primary relative overflow-hidden">
                    <WaveBackground position="top" opacity={0.04} waveColor="#a7ed81" />
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16 relative z-10">
                        <h2 className="text-2xl lg:text-3xl font-bold mb-8 lg:mb-10 text-center text-secondary animate-fade-in">Technical Specifications</h2>
                        <SpecificationsDisplay
                            specifications={product?.specifications}
                            fuelType={product?.fuelType}
                        />
                    </div>
                </section>
            )}

            {/* Contact CTA Section */}
            <section className="bg-primary border-y border-neutral-200 relative overflow-hidden">
                <WaveBackground position="top" opacity={0.03} waveColor="#ccc7c7ff" />
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20 relative z-10">
                    <div className="text-center mb-10 lg:mb-14 animate-fade-in">
                        <h2 className="text-2xl lg:text-3xl font-bold mb-3 text-primary">Interested in {product?.name}?</h2>
                        <p className="text-sm lg:text-base text-primary/70 max-w-2xl mx-auto">
                            Get in touch with our sales team for pricing, availability, and expert guidance
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6 mb-10">
                        <a href={`tel:${siteContent?.info?.phone}`} className="flex items-center gap-4 p-5 rounded-lg border border-primary/20 hover:border-accent hover:bg-primary/5 transition-all duration-300 bg-transparent text-primary group cursor-pointer hover:-translate-y-1 animate-slide-up">
                            <div className="p-3 rounded-full bg-accent/20 group-hover:bg-accent/30 transition-all duration-300 group-hover:scale-110">
                                <Phone size={20} className="text-accent" />
                            </div>
                            <div className="text-left">
                                <div className="text-xs font-semibold opacity-60 mb-1">Call Us</div>
                                <div className="text-sm font-bold">{siteContent?.contactInfo?.[0].phone}</div>
                            </div>
                        </a>

                        <a href={`mailto:${siteContent?.info?.email}`} className="flex items-center gap-4 p-5 rounded-lg border border-primary/20 hover:border-accent hover:bg-primary/5 transition-all duration-300 bg-transparent text-primary group cursor-pointer hover:-translate-y-1 animate-slide-up" style={{animationDelay: '100ms'}}>
                            <div className="p-3 rounded-full bg-accent/20 group-hover:bg-accent/30 transition-all duration-300 group-hover:scale-110">
                                <Mail size={20} className="text-accent" />
                            </div>
                            <div className="text-left">
                                <div className="text-xs font-semibold opacity-60 mb-1">Email Us</div>
                                <div className="text-sm font-bold">{siteContent?.contactInfo?.[0].email}</div>
                            </div>
                        </a>

                        <Link to="/locations" className="flex items-center gap-4 p-5 rounded-lg border border-primary/20 hover:border-accent hover:bg-primary/5 transition-all duration-300 bg-transparent text-primary group cursor-pointer hover:-translate-y-1 animate-slide-up" style={{animationDelay: '200ms'}}>
                            <div className="p-3 rounded-full bg-accent/20 group-hover:bg-accent/30 transition-all duration-300 group-hover:scale-110">
                                <MapPin size={20} className="text-accent" />
                            </div>
                            <div className="text-left">
                                <div className="text-xs font-semibold opacity-60 mb-1">Visit Us</div>
                                <div className="text-sm font-bold">Find nearest location</div>
                            </div>
                        </Link>
                    </div>

                    <div className="text-center animate-fade-in-up">
                        <Link to="/contact" className="inline-block px-8 py-3.5 rounded-lg font-semibold text-base bg-accent text-secondary hover:bg-accent-2 transition-all duration-300 shadow-sm hover:shadow-lg cursor-pointer hover:-translate-y-0.5">
                            Send Inquiry
                        </Link>
                    <Link
                        to={`/shop/${brand}/${typeSlug}`}
                        className="inline-block px-6 py-3 rounded-lg font-semibold text-sm lg:text-base bg-accent text-secondary hover:bg-accent-2 transition-all duration-300 shadow-sm hover:shadow-md cursor-pointer hover:-translate-y-0.5 animate-fade-in-up"
                    >
                        View All Products
                    </Link>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ProductDetails;
