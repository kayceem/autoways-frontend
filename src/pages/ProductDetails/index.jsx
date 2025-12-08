import { Link, useParams } from 'react-router-dom';
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
import useProductDetailsQuery from '../../hooks/useProductDetailsQuery';
import ImageGallery from '../../components/common/ImageGallery';
import SpecificationsDisplay from '../../components/common/SpecificationsDisplay';
import LoadingSpinner from '../../components/common/Loading';
import useContentQuery from '../../hooks/useContentQuery';
import './index.css';

const ProductDetails = () => {
    const { brand, type, id } = useParams();
    const { data: product, isLoading, error } = useProductDetailsQuery(brand, type, id);
    const { data: siteContent } = useContentQuery();

    if (isLoading) {
        return <LoadingSpinner />;
    }

    if (error || !product) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-primary">
                <div className="text-center">
                    <h2 className="text-error font-light text-3xl mb-4">
                        Product Not Found
                    </h2>
                    <Link
                        to={`/shop/${brand}/${type}`}
                        className="text-accent hover:underline font-bold"
                    >
                        Back to {type} listing
                    </Link>
                </div>
            </div>
        );
    }

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
            case 'hybrid':
                return 'Hybrid';
            default:
                return 'Diesel/Petrol';
        }
    };

    const handleDownloadSpecs = () => {
        // In a real application, this would trigger a PDF download
        alert('Downloading specifications PDF...');
    };

    const handleViewBrochure = () => {
        // In a real application, this would open the brochure PDF
        alert('Opening brochure...');
    };

    return (
        <div className="product-details-page bg-primary">
            {/* Breadcrumb */}
            <section className="breadcrumb-section bg-secondary">
                <div className="max-w-7xl mx-auto px-6 py-6">
                    <div className="breadcrumb text-primary">
                        <Link to="/" className="hover:text-accent">Home</Link>
                        <ChevronDown size={16} className="rotate-[-90deg]" />
                        <Link to={`/shop/${brand}`} className="capitalize hover:text-accent">{brand}</Link>
                        <ChevronDown size={16} className="rotate-[-90deg]" />
                        <Link to={`/shop/${brand}/${type}`} className="capitalize hover:text-accent">{type}</Link>
                        <ChevronDown size={16} className="rotate-[-90deg]" />
                        <span className="breadcrumb-current text-accent">{product.name}</span>
                    </div>
                </div>
            </section>

            {/* Hero Section */}
            <section className="product-hero-section">
                <div className="max-w-7xl mx-auto px-6 py-12">
                    <div className="product-hero-grid">
                        {/* Left: Image Gallery */}
                        <div className="product-images">
                            <ImageGallery
                                images={product.images}
                                productName={product.name}
                            />
                        </div>

                        {/* Right: Product Info */}
                        <div className="product-info">
                            {product.tag && (
                                <div className="product-tag bg-accent text-secondary">
                                    {product.tag}
                                </div>
                            )}

                            <h1 className="product-title text-primary">{product.name}</h1>

                            <div className="product-fuel-type text-accent">
                                {getFuelTypeIcon(product.fuelType)}
                                <span>{getFuelTypeLabel(product.fuelType)}</span>
                            </div>

                            {product.shortDescription && (
                                <p className="product-short-desc text-primary">
                                    {product.shortDescription}
                                </p>
                            )}

                            {product.fullDescription && (
                                <p className="product-full-desc text-primary">
                                    {product.fullDescription}
                                </p>
                            )}

                            {/* {product.price && (
                                <div className="product-price">
                                    <span className="price-label text-secondary">Starting from</span>
                                    <span className="price-value text-secondary">${product.price.toLocaleString()}</span>
                                </div>
                            )} */}

                            {/* Action Buttons */}
                            <div className="product-actions">
                                <button
                                    onClick={handleDownloadSpecs}
                                    className="action-button action-button-primary bg-accent text-secondary hover:bg-secondary hover:text-accent"
                                >
                                    <Download size={20} />
                                    <span>Download Specifications</span>
                                </button>

                                <button
                                    onClick={handleViewBrochure}
                                    className="action-button action-button-secondary bg-secondary text-accent hover:bg-accent hover:text-secondary"
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
            {product.features && product.features.length > 0 && (
                <section className="features-section bg-primary">
                    <div className="max-w-7xl mx-auto px-6 py-12">
                        <h2 className="section-title text-primary">Key Features</h2>
                        <div className="features-grid">
                            {product.features.map((feature, index) => (
                                <div key={index} className="feature-item">
                                    <Check className="feature-icon text-accent" size={20} />
                                    <span className="text-secondary">{feature}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Specifications Section */}
            {product.specifications && (
                <section className="specifications-section bg-accent">
                    <div className="max-w-7xl mx-auto px-6 py-12">
                        <h2 className="section-title text-primary">Technical Specifications</h2>
                        <SpecificationsDisplay
                            specifications={product.specifications}
                            fuelType={product.fuelType}
                        />
                    </div>
                </section>
            )}

            {/* Contact CTA Section */}
            <section className="contact-cta-section">
                <div className="max-w-5xl mx-auto px-6 py-16 text-center">
                    <h2 className="cta-title text-primary">Interested in {product.name}?</h2>
                    <p className="cta-description text-primary">
                        Get in touch with our sales team for pricing, availability, and expert guidance
                    </p>

                    <div className="contact-options">
                        <a href={`tel:${siteContent?.info?.phone}`} className="contact-option bg-primary text-secondary">
                            <Phone size={24} className="text-accent" />
                            <div>
                                <div className="contact-option-label text-secondary">Call Us</div>
                                <div className="contact-option-value text-secondary">{siteContent?.info?.phone}</div>
                            </div>
                        </a>

                        <a href={`mailto:${siteContent?.info?.email}`} className="contact-option bg-primary text-secondary">
                            <Mail size={24} className="text-accent" />
                            <div>
                                <div className="contact-option-label text-secondary">Email Us</div>
                                <div className="contact-option-value text-secondary">{siteContent?.info?.email}</div>
                            </div>
                        </a>

                        <Link to="/locations" className="contact-option bg-primary text-secondary">
                            <MapPin size={24} className="text-accent" />
                            <div>
                                <div className="contact-option-label text-secondary">Visit Us</div>
                                <div className="contact-option-value text-secondary">Find nearest location</div>
                            </div>
                        </Link>
                    </div>

                    <Link to="/contact" className="contact-form-button bg-accent text-secondary hover:bg-secondary hover:text-accent">
                        Send Inquiry
                    </Link>
                </div>
            </section>

            {/* Related Products Section */}
            <section className="related-products-section bg-primary">
                <div className="max-w-7xl mx-auto px-6 py-12">
                    <h2 className="section-title text-primary">More {type}s from {brand}</h2>
                    <Link
                        to={`/shop/${brand}/${type}`}
                        className="view-all-link bg-accent text-secondary hover:bg-secondary hover:text-accent"
                    >
                        View All {type}s
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default ProductDetails;
