import { useState, useEffect, useRef } from 'react';
import { useContent } from '../../context/globalContext';
import LoadingSpinner from '../../components/common/Loading';
import WaveBackground from '../../components/common/WaveBackground';
import { Navigate } from 'react-router-dom';
import { assetUrl } from '../../utils';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

const Gallery = () => {
  const { content, isLoading } = useContent();
  const galleryData = content?.gallery || [];

  const [visibleImages, setVisibleImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);
  const observerRef = useRef(null);
  const loadMoreRef = useRef(null);
  const isInitialized = useRef(false);

  const IMAGES_PER_ROW = 4;
  const INITIAL_ROWS = 2;
  const LOAD_MORE_ROWS = 1;

  useEffect(() => {
    if (galleryData.length > 0 && !isInitialized.current) {
      const initialCount = IMAGES_PER_ROW * INITIAL_ROWS;
      setVisibleImages(galleryData.slice(0, initialCount));
      setCurrentIndex(initialCount);
      isInitialized.current = true;
    }
  }, [galleryData]);

  useEffect(() => {
    if (!loadMoreRef.current) return;

    const options = {
      root: null,
      rootMargin: '100px',
      threshold: 0.1,
    };

    observerRef.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && currentIndex < galleryData.length) {
        loadMoreImages();
      }
    }, options);

    observerRef.current.observe(loadMoreRef.current);

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [currentIndex, galleryData.length]);

  const loadMoreImages = () => {
    const endIdx = currentIndex + (IMAGES_PER_ROW * LOAD_MORE_ROWS);
    const nextImages = galleryData.slice(currentIndex, endIdx);

    if (nextImages.length > 0) {
      setVisibleImages((prev) => [...prev, ...nextImages]);
      setCurrentIndex(endIdx);
    }
  };

  const openLightbox = (index) => {
    setSelectedImageIndex(index);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setSelectedImageIndex(null);
    document.body.style.overflow = 'auto';
  };

  const goToPrevious = () => {
    setSelectedImageIndex((prev) => (prev > 0 ? prev - 1 : galleryData.length - 1));
  };

  const goToNext = () => {
    setSelectedImageIndex((prev) => (prev < galleryData.length - 1 ? prev + 1 : 0));
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (selectedImageIndex === null) return;

      if (e.key === 'ArrowLeft') {
        goToPrevious();
      } else if (e.key === 'ArrowRight') {
        goToNext();
      } else if (e.key === 'Escape') {
        closeLightbox();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [selectedImageIndex, galleryData.length]);

  if (isLoading) return <LoadingSpinner />;

  if (!content || !galleryData) {
    return <Navigate to="/not-found" replace />;
  }

  return (
    <main className="min-h-screen bg-dark relative">
      <WaveBackground height={20} />

      {/* Hero Section */}
      <section className="relative py-6 lg:py-10 px-4 lg:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-6 lg:mb-10 animate-fade-in-up">
            <h1 className="font-bold text-3xl lg:text-6xl text-secondary mb-3 lg:mb-4">
              Gallery
            </h1>
            <div className="w-16 lg:w-24 h-1 bg-accent mx-auto mb-4 lg:mb-6" />
            <p className="text-base lg:text-xl text-secondary opacity-80 max-w-3xl mx-auto">
              Explore our collection of moments and achievements
            </p>
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-4 lg:py-8 px-4 lg:px-6">
        <div className="max-w-7xl mx-auto">
          {galleryData.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-secondary opacity-70 text-lg">
                No images in the gallery yet
              </p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
                {visibleImages.map((item, index) => {
                  const globalIndex = galleryData.findIndex(img => img._id === item._id);
                  return (
                  <div
                    key={item._id}
                    className="group relative overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer animate-fade-in-up"
                    style={{ animationDelay: `${(index % (IMAGES_PER_ROW * INITIAL_ROWS)) * 0.05}s` }}
                    onClick={() => openLightbox(globalIndex)}
                  >
                    <div className="aspect-w-16 aspect-h-12 bg-primary">
                      <img
                        src={assetUrl(item.image)}
                        alt={item.title || 'Gallery image'}
                        className="w-full h-64 object-cover transform group-hover:scale-110 transition-transform duration-500"
                        loading="lazy"
                      />
                    </div>

                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {item.title && (
                        <div className="absolute bottom-0 left-0 right-0 p-4">
                          <h3 className="text-secondary font-semibold text-lg">
                            {item.title}
                          </h3>
                        </div>
                      )}
                    </div>
                  </div>
                  );
                })}
              </div>

              {/* Load More Trigger */}
              {currentIndex < galleryData.length && (
                <div ref={loadMoreRef} className="flex justify-center py-8">
                  <div className="animate-pulse text-secondary opacity-50">
                    Loading more images...
                  </div>
                </div>
              )}

              {currentIndex >= galleryData.length && galleryData.length > 0 && (
                <div className="text-center py-8">
                  <p className="text-secondary opacity-50">
                    You've reached the end of the gallery
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* Lightbox Slideshow */}
      {selectedImageIndex !== null && (
        <div
          className="fixed inset-0 bg-black bg-opacity-98 z-50 flex items-center justify-center transition-opacity duration-200"
          onClick={closeLightbox}
        >
          {/* Close Button */}
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 text-white hover:text-accent transition-colors z-20 p-2 bg-black bg-opacity-50 rounded-full"
            aria-label="Close lightbox"
          >
            <X className="w-8 h-8" />
          </button>

          {/* Previous Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              goToPrevious();
            }}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-accent transition-colors z-20 p-3 bg-black bg-opacity-50 rounded-full hover:bg-opacity-75"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-8 h-8" />
          </button>

          {/* Next Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              goToNext();
            }}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-accent transition-colors z-20 p-3 bg-black bg-opacity-50 rounded-full hover:bg-opacity-75"
            aria-label="Next image"
          >
            <ChevronRight className="w-8 h-8" />
          </button>

          {/* Image Container */}
          <div
            className="relative w-full h-full flex items-center justify-center p-4 lg:p-12"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={assetUrl(galleryData[selectedImageIndex].image)}
              alt={galleryData[selectedImageIndex].title || 'Gallery image'}
              className="max-w-full max-h-full object-contain transition-opacity duration-200"
              style={{ maxWidth: '90vw', maxHeight: '85vh' }}
            />

            {/* Image Title */}
            {galleryData[selectedImageIndex].title && (
              <div className="absolute bottom-8 left-0 right-0 bg-gradient-to-t from-black via-black/80 to-transparent p-6 text-center">
                <h2 className="text-white text-xl lg:text-2xl font-bold">
                  {galleryData[selectedImageIndex].title}
                </h2>
              </div>
            )}

            {/* Image Counter */}
            <div className="absolute top-8 left-1/2 -translate-x-1/2 bg-black bg-opacity-50 text-white px-4 py-2 rounded-full text-sm">
              {selectedImageIndex + 1} / {galleryData.length}
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default Gallery;
