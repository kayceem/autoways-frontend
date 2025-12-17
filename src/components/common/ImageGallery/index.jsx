import { useState } from 'react';
import { ChevronLeft, ChevronRight, X, ZoomIn } from 'lucide-react';
import './index.css';
import { assetUrl } from '../../../utils';

const ImageGallery = ({ images = [], productName = '' }) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [isZoomed, setIsZoomed] = useState(false);

    if (!images || images.length === 0) {
        return null;
    }

    const goToNext = () => {
        setCurrentImageIndex((prev) => (prev + 1) % images.length);
        setIsZoomed(false);
    };

    const goToPrevious = () => {
        setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
        setIsZoomed(false);
    };

    const openFullscreen = () => {
        setIsFullscreen(true);
    };

    const closeFullscreen = () => {
        setIsFullscreen(false);
        setIsZoomed(false);
    };

    const toggleZoom = () => {
        setIsZoomed(!isZoomed);
    };

    return (
        <div className="image-gallery">
            {/* Main Image Display */}
            <div className="main-image-container">
                <div className="main-image-wrapper">
                    <img
                        src={assetUrl(images[currentImageIndex])}
                        alt={`${productName} - Image ${currentImageIndex + 1}`}
                        className="main-image"
                        onClick={openFullscreen}
                    />

                    {/* Navigation Arrows */}
                    {images.length > 1 && (
                        <>
                            <button
                                onClick={goToPrevious}
                                className="nav-button nav-button-left"
                                aria-label="Previous image"
                            >
                                <ChevronLeft size={24} />
                            </button>
                            <button
                                onClick={goToNext}
                                className="nav-button nav-button-right"
                                aria-label="Next image"
                            >
                                <ChevronRight size={24} />
                            </button>
                        </>
                    )}

                    {/* Zoom Button */}
                    <button
                        onClick={openFullscreen}
                        className="zoom-button"
                        aria-label="View fullscreen"
                    >
                        <ZoomIn size={20} />
                    </button>

                    {/* Image Counter */}
                    {images.length > 1 && (
                        <div className="image-counter">
                            {currentImageIndex + 1} / {images.length}
                        </div>
                    )}
                </div>
            </div>

            {/* Thumbnail Strip */}
            {images.length > 1 && (
                <div className="thumbnail-strip">
                    {images.map((image, index) => (
                        <button
                            key={index}
                            onClick={() => {
                                setCurrentImageIndex(index);
                                setIsZoomed(false);
                            }}
                            className={`thumbnail ${index === currentImageIndex ? 'thumbnail-active' : ''}`}
                            aria-label={`View image ${index + 1}`}
                        >
                            <img
                                src={assetUrl(image)}
                                alt={`${productName} thumbnail ${index + 1}`}
                            />
                        </button>
                    ))}
                </div>
            )}

            {/* Fullscreen Modal */}
            {isFullscreen && (
                <div className="fullscreen-modal" onClick={closeFullscreen}>
                    <button
                        onClick={closeFullscreen}
                        className="fullscreen-close"
                        aria-label="Close fullscreen"
                    >
                        <X size={32} />
                    </button>

                    <div className="fullscreen-content" onClick={(e) => e.stopPropagation()}>
                        <img
                            src={assetUrl(images[currentImageIndex])}
                            alt={`${productName} - Image ${currentImageIndex + 1}`}
                            className={`fullscreen-image ${isZoomed ? 'fullscreen-image-zoomed' : ''}`}
                            onClick={toggleZoom}
                        />

                        {/* Navigation in Fullscreen */}
                        {images.length > 1 && (
                            <>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        goToPrevious();
                                    }}
                                    className="fullscreen-nav fullscreen-nav-left"
                                    aria-label="Previous image"
                                >
                                    <ChevronLeft size={40} />
                                </button>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        goToNext();
                                    }}
                                    className="fullscreen-nav fullscreen-nav-right"
                                    aria-label="Next image"
                                >
                                    <ChevronRight size={40} />
                                </button>
                            </>
                        )}

                        {/* Fullscreen Counter */}
                        {images.length > 1 && (
                            <div className="fullscreen-counter">
                                {currentImageIndex + 1} / {images.length}
                            </div>
                        )}

                        {/* Fullscreen Thumbnails */}
                        {images.length > 1 && (
                            <div className="fullscreen-thumbnails">
                                {images.map((image, index) => (
                                    <button
                                        key={index}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setCurrentImageIndex(index);
                                            setIsZoomed(false);
                                        }}
                                        className={`fullscreen-thumbnail ${index === currentImageIndex ? 'fullscreen-thumbnail-active' : ''}`}
                                    >
                                        <img src={assetUrl(image)} alt={`Thumbnail ${index + 1}`} />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default ImageGallery;
