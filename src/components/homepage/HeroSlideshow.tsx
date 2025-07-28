// src/components/homepage/HeroSlideshow.tsx
'use client'; 

import { useState, useEffect } from 'react';
import Image from 'next/image'; // <-- ADD THIS IMPORT
import { ChevronLeft, ChevronRight } from 'lucide-react';

const slides = [
  { image: '/slideshow/leaf1.jpg', quote: 'The leaf of the righteous is a tree of life.', author: 'AISH NATURALEAF HERBS talks' },
  { image: '/slideshow/leaf2.jpg', quote: 'In every leaf, nature speaks to us.', author: 'AISH NATURALEAF HERBS talks' },
  { image: '/slideshow/leaf3.jpg', quote: 'Health is the greatest of all possessions.', author: 'AISH NATURALEAF HERBS talks' },
  { image: '/slideshow/leaf4.jpg', quote: 'Let food be thy medicine and medicine be thy food.', author: 'AISH NATURALEAF HERBS talks' },
  { image: '/slideshow/leaf5.jpg', quote: 'The greatest wealth is health.', author: 'AISH NATURALEAF HERBS talks' }
];

export default function HeroSlideshow() {
  const [current, setCurrent] = useState(0);

  const previousSlide = () => { setCurrent(c => (c === 0 ? slides.length - 1 : c - 1)); };
  const nextSlide = () => { setCurrent(c => (c === slides.length - 1 ? 0 : c + 1)); };

  useEffect(() => {
    const slideInterval = setInterval(nextSlide, 5000); 
    return () => clearInterval(slideInterval);
  }, []);

  return (
    <div className="relative w-full h-96 overflow-hidden">
      {slides.map((slide, index) => (
        <div key={index} className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${ index === current ? 'opacity-100' : 'opacity-0' }`}>
          {/* FIX IS HERE: Replaced <img> with <Image> and added fill, objectFit */}
          <Image
            src={slide.image}
            alt={slide.quote}
            fill // This makes the image fill the parent container
            objectFit="cover" // Mimics your old object-cover CSS
            priority={index === 0} // Optimize loading for the first image
          />
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="text-center text-white p-4">
              <h2 className="text-3xl md:text-4xl font-bold italic">{`"${slide.quote}"`}</h2>
              <p className="mt-4 text-xl">- {slide.author}</p>
            </div>
          </div>
        </div>
      ))}
      
      <button onClick={previousSlide} className="absolute top-1/2 left-4 transform -translate-y-1/2 text-white bg-black bg-opacity-50 p-2 rounded-full hover:bg-opacity-75">
        <ChevronLeft size={24} />
      </button>
      
      <button onClick={nextSlide} className="absolute top-1/2 right-4 transform -translate-y-1/2 text-white bg-black bg-opacity-50 p-2 rounded-full hover:bg-opacity-75">
        <ChevronRight size={24} />
      </button>
    </div>
  );
}