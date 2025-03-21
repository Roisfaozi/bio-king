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

  return (
    <div className='relative w-full px-3 sm:px-4'>
      <Carousel
        opts={{
          align: 'start',
        }}
        className='w-full items-center overflow-hidden'
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
        <CarouselPrevious className='left-30 top-1/2 -translate-y-1/2 border-none bg-white text-[#111] opacity-100 hover:bg-white/50 md:left-60' />
        <CarouselNext className='right-30 top-1/2 -translate-y-1/2 border-none bg-white text-[#111] opacity-100 hover:bg-white/50 md:right-60' />
      </Carousel>
    </div>
  );
}
