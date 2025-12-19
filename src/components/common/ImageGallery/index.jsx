import { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight, X, ZoomIn, ZoomOut, Maximize2 } from 'lucide-react';
import { assetUrl } from '../../../utils';

const ImageGallery = ({ images = [], productName = '' }) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [zoomLevel, setZoomLevel] = useState(1);
    const [panPosition, setPanPosition] = useState({ x: 0, y: 0 });
    const [isDragging, setIsDragging] = useState(false);
    const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
    const imageRef = useRef(null);

    // Prevent body scroll and hide navbar when fullscreen is open
    useEffect(() => {
        if (isFullscreen) {
            // Prevent body scroll
            document.body.style.overflow = 'hidden';
            document.documentElement.style.overflow = 'hidden';

            // Hide navbar by adding a class
            document.body.classList.add('image-viewer-open');

            return () => {
                document.body.style.overflow = '';
                document.documentElement.style.overflow = '';
                document.body.classList.remove('image-viewer-open');
            };
        }
    }, [isFullscreen]);

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
        <div className="w-full">
            {/* Main Image Display */}
            <div className="w-full mb-4">
                <div className="relative w-full h-[300px] lg:h-[500px] rounded-2xl overflow-hidden">
                    <img
                        src={assetUrl(images[currentImageIndex])}
                        alt={`${productName} - Image ${currentImageIndex + 1}`}
                        className="w-full h-full object-contain cursor-zoom-in transition-transform duration-300 hover:scale-105"
                        onClick={openFullscreen}
                    />

                    {/* Navigation Arrows */}
                    {images.length > 1 && (
                        <>
                            <button
                                onClick={goToPrevious}
                                className="absolute top-1/2 left-2 lg:left-4 -translate-y-1/2 bg-white/90 hover:bg-accent border-0 w-10 h-10 lg:w-12 lg:h-12 rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 text-primary hover:text-secondary hover:scale-110 z-10 shadow-lg"
                                aria-label="Previous image"
                            >
                                <ChevronLeft size={24} />
                            </button>
                            <button
                                onClick={goToNext}
                                className="absolute top-1/2 right-2 lg:right-4 -translate-y-1/2 bg-white/90 hover:bg-accent border-0 w-10 h-10 lg:w-12 lg:h-12 rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 text-primary hover:text-secondary hover:scale-110 z-10 shadow-lg"
                                aria-label="Next image"
                            >
                                <ChevronRight size={24} />
                            </button>
                        </>
                    )}

                    {/* Zoom Button */}
                    <button
                        onClick={openFullscreen}
                        className="absolute bottom-4 right-4 bg-white/90 hover:bg-accent border-0 w-10 h-10 rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 text-primary hover:text-secondary hover:scale-110 z-10 shadow-lg"
                        aria-label="View fullscreen"
                    >
                        <ZoomIn size={20} />
                    </button>

                    {/* Image Counter */}
                    {images.length > 1 && (
                        <div className="absolute bottom-4 left-4 bg-black/70 text-white px-4 py-2 rounded-full text-sm font-semibold z-10">
                            {currentImageIndex + 1} / {images.length}
                        </div>
                    )}
                </div>
            </div>

            {/* Thumbnail Strip */}
            {images.length > 1 && (
                <div className="flex gap-2 lg:gap-3 overflow-x-auto py-2 [&::-webkit-scrollbar]:h-1.5 [&::-webkit-scrollbar-track]:bg-secondary [&::-webkit-scrollbar-track]:rounded-sm [&::-webkit-scrollbar-thumb]:bg-accent [&::-webkit-scrollbar-thumb]:rounded-sm">
                    {images.map((image, index) => (
                        <button
                            key={index}
                            onClick={() => {
                                setCurrentImageIndex(index);
                                resetZoomAndPan();
                            }}
                            className={`flex-shrink-0 w-20 h-[60px] lg:w-[100px] lg:h-20 rounded-lg overflow-hidden border-2 cursor-pointer transition-all duration-300 bg-secondary p-0 hover:border-accent hover:-translate-y-0.5 hover:shadow-md ${
                                index === currentImageIndex ? 'border-accent shadow-[0_0_0_3px_rgb(var(--accent-rgb)/0.2)]' : 'border-transparent'
                            }`}
                            aria-label={`View image ${index + 1}`}
                        >
                            <img
                                src={assetUrl(image)}
                                alt={`${productName} thumbnail ${index + 1}`}
                                className="w-full h-full object-cover"
                            />
                        </button>
                    ))}
                </div>
            )}

            {/* Fullscreen Modal */}
            {isFullscreen && (
                <div className="fixed inset-0 bg-black/97 z-[100000] flex items-center justify-center animate-fadeIn" onClick={closeFullscreen}>
                    <button
                        onClick={closeFullscreen}
                        className="absolute top-6 right-6 bg-white/90 hover:bg-accent border-0 w-14 h-14 rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 text-black hover:text-secondary z-[100001] shadow-xl hover:rotate-90 hover:scale-110"
                        aria-label="Close fullscreen"
                    >
                        <X size={32} />
                    </button>

                    <div
                        className="w-full h-full flex items-center justify-center relative pt-16 pb-32 px-8"
                        onClick={(e) => e.stopPropagation()}
                        onMouseMove={handleMouseMove}
                        onMouseUp={handleMouseUp}
                        onMouseLeave={handleMouseUp}
                    >
                        <img
                            ref={imageRef}
                            src={assetUrl(images[currentImageIndex])}
                            alt={`${productName} - Image ${currentImageIndex + 1}`}
                            className={`max-w-[90%] max-h-[80vh] object-contain cursor-zoom-in transition-transform duration-300 ${
                                zoomLevel > 1 ? (isDragging ? 'cursor-grabbing' : 'cursor-grab') : ''
                            }`}
                            style={{
                                transform: `scale(${zoomLevel}) translate(${panPosition.x / zoomLevel}px, ${panPosition.y / zoomLevel}px)`,
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
                                    className="absolute top-1/2 left-4 lg:left-8 -translate-y-1/2 bg-white/85 hover:bg-accent border-0 w-12 h-12 lg:w-16 lg:h-16 rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 text-black hover:text-secondary z-[100001] shadow-xl hover:scale-110"
                                    aria-label="Previous image"
                                >
                                    <ChevronLeft className="w-8 h-8 lg:w-10 lg:h-10" />
                                </button>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        goToNext();
                                    }}
                                    className="absolute top-1/2 right-4 lg:right-8 -translate-y-1/2 bg-white/85 hover:bg-accent border-0 w-12 h-12 lg:w-16 lg:h-16 rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 text-black hover:text-secondary z-[100001] shadow-xl hover:scale-110"
                                    aria-label="Next image"
                                >
                                    <ChevronRight className="w-8 h-8 lg:w-10 lg:h-10" />
                                </button>
                            </>
                        )}

                        {/* Fullscreen Counter */}
                        {images.length > 1 && (
                            <div className="absolute top-8 left-1/2 -translate-x-1/2 bg-white/85 text-black px-6 py-3 rounded-full text-base font-semibold z-[100001] backdrop-blur-md shadow-xl">
                                {currentImageIndex + 1} / {images.length}
                            </div>
                        )}

                        {/* Fullscreen Thumbnails */}
                        {images.length > 1 && (
                            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 lg:gap-4 px-3 lg:px-4 py-3 lg:py-4 bg-white/15 rounded-2xl backdrop-blur-md max-w-[90%] overflow-x-auto z-[100001] shadow-xl [&::-webkit-scrollbar]:h-1 [&::-webkit-scrollbar-track]:bg-white/10 [&::-webkit-scrollbar-track]:rounded-sm [&::-webkit-scrollbar-thumb]:bg-accent [&::-webkit-scrollbar-thumb]:rounded-sm">
                                {images.map((image, index) => (
                                    <button
                                        key={index}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setCurrentImageIndex(index);
                                            resetZoomAndPan();
                                        }}
                                        className={`flex-shrink-0 w-[60px] h-[45px] lg:w-20 lg:h-[60px] rounded-lg overflow-hidden border-2 cursor-pointer transition-all duration-300 bg-white/10 p-0 hover:border-accent hover:-translate-y-1 ${
                                            index === currentImageIndex ? 'border-accent shadow-[0_0_0_3px_rgb(var(--accent-rgb)/0.3)]' : 'border-transparent'
                                        }`}
                                    >
                                        <img src={assetUrl(image)} alt={`Thumbnail ${index + 1}`} className="w-full h-full object-cover" />
                                    </button>
                                ))}
                            </div>
                        )}

                        {/* Zoom Controls */}
                        <div className="absolute bottom-8 right-4 lg:right-8 flex flex-col gap-2 z-[100001]">
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    zoomIn();
                                }}
                                className="bg-white/85 hover:bg-accent border-0 w-10 h-10 lg:w-12 lg:h-12 rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 text-black hover:text-secondary shadow-xl hover:scale-110 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-white/85 disabled:hover:text-black disabled:hover:scale-100"
                                aria-label="Zoom in"
                                disabled={zoomLevel >= MAX_ZOOM}
                            >
                                <ZoomIn size={18} className="lg:w-5 lg:h-5" />
                            </button>

                            <div className="bg-white/85 text-black px-2 py-1.5 lg:px-3 lg:py-2 rounded-3xl text-xs lg:text-sm font-semibold text-center shadow-xl min-w-[40px] lg:min-w-[48px]">
                                {Math.round(zoomLevel * 100)}%
                            </div>

                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    zoomOut();
                                }}
                                className="bg-white/85 hover:bg-accent border-0 w-10 h-10 lg:w-12 lg:h-12 rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 text-black hover:text-secondary shadow-xl hover:scale-110 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-white/85 disabled:hover:text-black disabled:hover:scale-100"
                                aria-label="Zoom out"
                                disabled={zoomLevel <= MIN_ZOOM}
                            >
                                <ZoomOut size={18} className="lg:w-5 lg:h-5" />
                            </button>

                            {zoomLevel > 1 && (
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        resetZoom();
                                    }}
                                    className="bg-white/85 hover:bg-accent border-0 w-10 h-10 lg:w-12 lg:h-12 rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 text-black hover:text-secondary shadow-xl hover:scale-110"
                                    aria-label="Reset zoom"
                                >
                                    <Maximize2 size={18} className="lg:w-5 lg:h-5" />
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
