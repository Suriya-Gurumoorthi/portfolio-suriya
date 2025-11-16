'use client';

// @flow strict
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { BsChevronLeft, BsChevronRight, BsX } from 'react-icons/bs';
import { createPortal } from 'react-dom';

function WorkshopCard({ workshop }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const nextImage = (e) => {
    e?.stopPropagation();
    setCurrentImageIndex((prev) => 
      prev === workshop.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = (e) => {
    e?.stopPropagation();
    setCurrentImageIndex((prev) => 
      prev === 0 ? workshop.images.length - 1 : prev - 1
    );
  };

  const openLightbox = () => {
    setIsLightboxOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setIsLightboxOpen(false);
    document.body.style.overflow = 'unset';
  };

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isLightboxOpen) {
        closeLightbox();
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isLightboxOpen]);

  // Handle arrow keys
  useEffect(() => {
    const handleArrowKeys = (e) => {
      if (isLightboxOpen && workshop.images.length > 1) {
        if (e.key === 'ArrowLeft') prevImage();
        if (e.key === 'ArrowRight') nextImage();
      }
    };
    window.addEventListener('keydown', handleArrowKeys);
    return () => window.removeEventListener('keydown', handleArrowKeys);
  }, [isLightboxOpen]);

  return (
    <div className="from-[#0d1224] border-[#1b2c68a0] relative rounded-lg border bg-gradient-to-r to-[#0a0d37] w-full overflow-hidden group hover:border-[#464c6a] transition-all duration-500">
      {/* Gradient Header */}
      <div className="flex flex-row">
        <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-pink-500 to-violet-600"></div>
        <div className="h-[1px] w-full bg-gradient-to-r from-violet-600 to-transparent"></div>
      </div>

      {/* Title Bar */}
      <div className="px-4 lg:px-8 py-3 lg:py-5">
        <p className="text-center text-[#16f2b3] text-base lg:text-xl font-medium flex items-center justify-center gap-2">
          <span className="text-2xl">{workshop.icon}</span>
          {workshop.title}
        </p>
      </div>

      {/* Content Container */}
      <div className="border-t-[2px] border-indigo-900">
        {/* Image Gallery */}
        <div className="relative bg-gradient-to-br from-[#0a0d37] to-[#0d1224] p-4 flex items-center justify-center">
          <div 
            className="relative w-full aspect-video rounded-lg overflow-hidden group/image cursor-pointer"
            onClick={openLightbox}
          >
            <Image
              src={workshop.images[currentImageIndex]}
              alt={workshop.title}
              fill
              className="object-cover group-hover/image:scale-110 transition-transform duration-500"
            />
            
            {/* Image Navigation - Only show if multiple images */}
            {workshop.images.length > 1 && (
              <>
                {/* Navigation Buttons */}
                <button
                  onClick={prevImage}
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 text-white p-2.5 md:p-2 rounded-full opacity-100 md:opacity-0 md:group-hover/image:opacity-100 transition-all duration-300 backdrop-blur-sm z-10"
                  aria-label="Previous image"
                >
                  <BsChevronLeft size={20} className="md:w-[18px] md:h-[18px]" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 text-white p-2.5 md:p-2 rounded-full opacity-100 md:opacity-0 md:group-hover/image:opacity-100 transition-all duration-300 backdrop-blur-sm z-10"
                  aria-label="Next image"
                >
                  <BsChevronRight size={20} className="md:w-[18px] md:h-[18px]" />
                </button>

                {/* Image Counter */}
                <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-sm text-white px-2.5 py-1 rounded-full text-xs font-medium">
                  {currentImageIndex + 1}/{workshop.images.length}
                </div>

                {/* Dots Indicator */}
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                  {workshop.images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        index === currentImageIndex
                          ? 'bg-[#16f2b3] w-6'
                          : 'bg-white/50 hover:bg-white/80 w-1.5'
                      }`}
                      aria-label={`Go to image ${index + 1}`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        </div>

        {/* Workshop Details */}
        <div className="px-4 py-4 flex flex-col border-t-[2px] border-indigo-900 min-h-[280px]">
          {/* Topic Badge */}
          <div className="mb-3">
            <div className={`inline-block px-3 py-1.5 rounded-full bg-gradient-to-r ${workshop.color} text-white text-xs font-medium`}>
              {workshop.topic}
            </div>
          </div>

          {/* Description */}
          <p className="text-gray-300 text-sm leading-relaxed mb-4 flex-grow">
            {workshop.description}
          </p>

          {/* Venue */}
          <div className="mt-auto pt-3 border-t border-gray-700/50">
            <div className="flex items-center gap-2 text-[#16f2b3]">
              <svg
                className="w-4 h-4 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              <span className="text-sm font-medium">{workshop.venue}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Gradient */}
      <div className="flex flex-row">
        <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-violet-600 to-pink-500"></div>
        <div className="h-[1px] w-full bg-gradient-to-r from-pink-500 to-transparent"></div>
      </div>

      {/* Lightbox Modal - Rendered via Portal to document body for true full screen */}
      {mounted && isLightboxOpen && createPortal(
        <div 
          className="fixed inset-0 z-[99999] bg-black/95 backdrop-blur-sm flex items-center justify-center"
          style={{ margin: 0, padding: '1rem' }}
          onClick={closeLightbox}
        >
          {/* Close Button */}
          <button
            onClick={closeLightbox}
            className="fixed top-4 right-4 text-white bg-black/50 hover:bg-black/70 p-3 rounded-full transition-all duration-300 hover:scale-110 z-[100000]"
            aria-label="Close"
          >
            <BsX size={32} />
          </button>

          {/* Main Image Container */}
          <div 
            className="relative w-full h-full max-w-[95vw] max-h-[95vh] flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Image */}
            <div className="relative w-full h-full">
              <Image
                src={workshop.images[currentImageIndex]}
                alt={`${workshop.title} - Image ${currentImageIndex + 1}`}
                fill
                className="object-contain"
                quality={100}
                priority
              />
            </div>

            {/* Navigation Buttons - Only if multiple images */}
            {workshop.images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 text-white p-3 md:p-4 rounded-full transition-all duration-300 hover:scale-110 backdrop-blur-sm"
                  aria-label="Previous image"
                >
                  <BsChevronLeft size={28} />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 text-white p-3 md:p-4 rounded-full transition-all duration-300 hover:scale-110 backdrop-blur-sm"
                  aria-label="Next image"
                >
                  <BsChevronRight size={28} />
                </button>

                {/* Image Counter */}
                <div className="absolute top-2 md:top-4 left-2 md:left-4 bg-black/60 backdrop-blur-sm text-white px-3 md:px-4 py-1.5 md:py-2 rounded-full text-sm md:text-base font-medium">
                  {currentImageIndex + 1} / {workshop.images.length}
                </div>
              </>
            )}
          </div>
        </div>,
        document.body
      )}
    </div>
  );
}

export default WorkshopCard;

