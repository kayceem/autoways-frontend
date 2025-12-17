import { useState, useRef } from 'react';
import { ChevronLeft, ChevronRight, X, ZoomIn, ZoomOut, Maximize2 } from 'lucide-react';
import './index.css';
import { assetUrl } from '../../../utils';

const ImageGallery = ({ images = [], productName = '' }) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [zoomLevel, setZoomLevel] = useState(1);
    const [panPosition, setPanPosition] = useState({ x: 0, y: 0 });
    const [isDragging, setIsDragging] = useState(false);
    const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
    const imageRef = useRef(null);

    const ZOOM_LEVELS = [1, 1.5, 2, 2.5, 3];
    const MAX_ZOOM = Math.max(...ZOOM_LEVELS);
    const MIN_ZOOM = Math.min(...ZOOM_LEVELS);

    if (!images || images.length === 0) {
        return null;
    }

    const resetZoomAndPan = () => {
        setZoomLevel(1);
        setPanPosition({ x: 0, y: 0 });
    };

    const goToNext = () => {
        setCurrentImageIndex((prev) => (prev + 1) % images.length);
        resetZoomAndPan();
    };

    const goToPrevious = () => {
        setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
        resetZoomAndPan();
    };

    const openFullscreen = () => {
        setIsFullscreen(true);
    };

    const closeFullscreen = () => {
        setIsFullscreen(false);
        resetZoomAndPan();
    };

    const zoomIn = () => {
        setZoomLevel((prev) => {
            const currentIndex = ZOOM_LEVELS.findIndex(level => level >= prev);
            const nextIndex = Math.min(currentIndex + 1, ZOOM_LEVELS.length - 1);
            return ZOOM_LEVELS[nextIndex];
        });
    };

    const zoomOut = () => {
        setZoomLevel((prev) => {
            const currentIndex = ZOOM_LEVELS.findIndex(level => level >= prev);
            const prevIndex = Math.max(currentIndex - 1, 0);
            const newZoom = ZOOM_LEVELS[prevIndex];
            if (newZoom === 1) {
                setPanPosition({ x: 0, y: 0 });
            }
            return newZoom;
        });
    };

    const resetZoom = () => {
        setZoomLevel(1);
        setPanPosition({ x: 0, y: 0 });
    };

    const handleMouseDown = (e) => {
        if (zoomLevel > 1) {
            setIsDragging(true);
            setDragStart({
                x: e.clientX - panPosition.x,
                y: e.clientY - panPosition.y
            });
        }
    };

    const handleMouseMove = (e) => {
        if (isDragging && zoomLevel > 1) {
            setPanPosition({
                x: e.clientX - dragStart.x,
                y: e.clientY - dragStart.y
            });
        }
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    const handleWheel = (e) => {
        e.preventDefault();
        if (e.deltaY < 0) {
            zoomIn();
        } else {
            zoomOut();
        }
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

                    <div
                        className="fullscreen-content"
                        onClick={(e) => e.stopPropagation()}
                        onMouseMove={handleMouseMove}
                        onMouseUp={handleMouseUp}
                        onMouseLeave={handleMouseUp}
                    >
                        <img
                            ref={imageRef}
                            src={assetUrl(images[currentImageIndex])}
                            alt={`${productName} - Image ${currentImageIndex + 1}`}
                            className={`fullscreen-image ${zoomLevel > 1 ? 'fullscreen-image-panning' : ''}`}
                            style={{
                                transform: `scale(${zoomLevel}) translate(${panPosition.x / zoomLevel}px, ${panPosition.y / zoomLevel}px)`,
                                cursor: zoomLevel > 1 ? (isDragging ? 'grabbing' : 'grab') : 'default'
                            }}
                            onMouseDown={handleMouseDown}
                            onWheel={handleWheel}
                            draggable={false}
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
                                            resetZoomAndPan();
                                        }}
                                        className={`fullscreen-thumbnail ${index === currentImageIndex ? 'fullscreen-thumbnail-active' : ''}`}
                                    >
                                        <img src={assetUrl(image)} alt={`Thumbnail ${index + 1}`} />
                                    </button>
                                ))}
                            </div>
                        )}

                        {/* Zoom Controls */}
                        <div className="zoom-controls">
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    zoomIn();
                                }}
                                className="zoom-control-button"
                                aria-label="Zoom in"
                                disabled={zoomLevel >= MAX_ZOOM}
                            >
                                <ZoomIn size={20} />
                            </button>

                            <div className="zoom-level-indicator">
                                {Math.round(zoomLevel * 100)}%
                            </div>

                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    zoomOut();
                                }}
                                className="zoom-control-button"
                                aria-label="Zoom out"
                                disabled={zoomLevel <= MIN_ZOOM}
                            >
                                <ZoomOut size={20} />
                            </button>

                            {zoomLevel > 1 && (
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        resetZoom();
                                    }}
                                    className="zoom-control-button"
                                    aria-label="Reset zoom"
                                >
                                    <Maximize2 size={20} />
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ImageGallery;
