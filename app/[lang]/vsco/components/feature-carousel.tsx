'use client';

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
  return (
    <div className='relative mb-16 px-4 md:px-8'>
      <div className='mx-auto max-w-screen-xl'>
        <div className='no-scrollbar flex space-x-4 overflow-x-auto pb-8'>
          {features.map((feature, index) => (
            <CarouselFeatureItem
              key={index}
              title={feature.title}
              image={feature.image}
              badge={feature.badge}
              overlay={feature.overlay}
            />
          ))}
        </div>
        <div className='absolute right-8 top-1/2 -translate-y-1/2 transform'>
          <button className='rounded-full bg-white p-2'>
            <svg
              className='h-6 w-6 text-black'
              viewBox='0 0 24 24'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M9 5L16 12L9 19'
                stroke='currentColor'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
