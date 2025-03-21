'use client';

import FeatureCarousel from '@/app/[lang]/vsco/components/feature-carousel';
import { featuresData } from '@/app/[lang]/vsco/components/features-data';
import { Button } from '@/components/ui/button';

export default function Hero() {
  return (
    <div className='w-full bg-[#000]'>
      {/* Hero Text */}
      <div className='px-4 py-10 sm:px-6 sm:py-12 md:px-10 md:py-16 lg:px-16'>
        <div className='mx-auto max-w-5xl'>
          <h1 className='xs:text-3xl mb-4 text-2xl font-bold leading-tight sm:mb-6 sm:text-4xl md:text-5xl lg:text-6xl'>
            YOUR HOME FOR PHOTOGRAPHY
          </h1>
          <p className='xs:text-base mb-6 max-w-3xl text-sm text-muted-foreground sm:mb-8 sm:text-lg md:text-xl'>
            Enhance your work with our video and photo editor, share with an
            authentic community, and get exposure to brands looking to hire.
          </p>
          <div className='flex flex-wrap gap-3 sm:gap-4'>
            <Button
              size='sm'
              className='h-10 rounded-full bg-white px-4 text-xs text-[#000] hover:bg-gray-200 sm:h-11 sm:px-5 sm:text-sm md:h-12 md:px-6'
            >
              TRY FOR FREE
            </Button>
            <Button
              size='sm'
              variant='outline'
              className='h-10 rounded-full px-4 text-xs sm:h-11 sm:px-5 sm:text-sm md:h-12 md:px-6'
            >
              SIGN IN
            </Button>
          </div>
        </div>
      </div>

      {/* Features Carousel */}
      <FeatureCarousel features={featuresData} />
    </div>
  );
}
