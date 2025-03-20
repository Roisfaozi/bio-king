'use client';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { useEffect, useRef, useState } from 'react';
import CarouselFeatureItem from './carousel-feature-item';

interface FeatureItem {
  title: string;
  image: string;
  badge?: {
    text: string;
    color: string;
  };
  overlay?: React.ReactNode;
}

interface FeatureCarouselProps {
  features: FeatureItem[];
}

export default function FeatureCarousel({ features }: FeatureCarouselProps) {
  const [showRightButton, setShowRightButton] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Cek apakah ada konten yang bisa di-scroll
    const checkOverflow = () => {
      if (scrollContainerRef.current) {
        const { scrollWidth, clientWidth } = scrollContainerRef.current;
        setShowRightButton(scrollWidth > clientWidth);
      }
    };

    checkOverflow();
    window.addEventListener('resize', checkOverflow);

    return () => {
      window.removeEventListener('resize', checkOverflow);
    };
  }, []);

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  return (
    <div className='relative mb-8 px-3 sm:mb-12 sm:px-4 md:mb-16 md:px-8'>
      <Carousel
        opts={{
          align: 'start',
        }}
        className='w-full max-w-screen-md overflow-hidden lg:max-w-[1650px]'
      >
        <CarouselContent>
          {features.map((feature, index) => (
            <CarouselItem
              key={index}
              className='basis-1/3 p-2 md:basis-1/4 lg:basis-1/5'
            >
              <CarouselFeatureItem key={index} features={feature} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className='left-60 top-1/2 -translate-y-1/2 border-none bg-white text-[#111] opacity-100 hover:bg-white/50' />
        <CarouselNext className='right-60 top-1/2 -translate-y-1/2 border-none bg-white text-[#111] opacity-100 hover:bg-white/50' />
      </Carousel>
    </div>
  );
}
