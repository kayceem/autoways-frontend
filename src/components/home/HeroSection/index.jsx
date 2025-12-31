import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { useState, useEffect } from 'react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import './index.css';
import { assetUrl } from '../../../utils';
import { PulseFallback, preloadImage } from '../../common/SuspenseImage';

const HeroSection = ({ heroImages = [], className = '' }) => {
  const [loadedImages, setLoadedImages] = useState({});

  // Preload first 3 images
  useEffect(() => {
    heroImages.slice(0, 3).forEach((image) => {
      preloadImage(assetUrl(image.image));
    });
  }, [heroImages]);

  const handleImageLoad = (index) => {
    setLoadedImages(prev => ({ ...prev, [index]: true }));
  };

  return (
    <section className={`relative w-full h-screen ${className}`}>
      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        spaceBetween={0}
        slidesPerView={1}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
          bulletClass: 'swiper-pagination-bullet',
          bulletActiveClass: 'swiper-pagination-bullet-active',
        }}
        navigation={false}
        loop={true}
        className="h-full w-full"
        lazy={"true"}
      >
        {heroImages.map((image, index) => (
          <SwiperSlide key={index}>
            <div className="relative w-full h-full">
              {/* Loading Skeleton */}
              {!loadedImages[index] && <PulseFallback />}

              {/* Hero Image */}
              <img
                src={assetUrl(image.image)}
                alt={image.alt || `Hero slide ${index + 1}`}
                className={`w-full h-full object-cover transition-opacity duration-500 ${
                  loadedImages[index] ? 'opacity-100' : 'opacity-0'
                }`}
                onLoad={() => handleImageLoad(index)}
                loading={index < 3 ? 'eager' : 'lazy'}
                fetchPriority={index === 0 ? 'high' : 'auto'}
              />
              
              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60" />
              
              {/* Overlay Content */}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 lg:px-6">
                <h1 className="text-3xl lg:text-6xl font-bold text-white mb-4 lg:mb-6 max-w-4xl leading-tight">
                  {image.title || 'Welcome to Autoways'}
                </h1>
                <p className="text-base lg:text-2xl text-white/90 mb-6 lg:mb-10 max-w-2xl">
                  {image.subtitle || 'Discover Your Perfect Vehicle'}
                </p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default HeroSection;