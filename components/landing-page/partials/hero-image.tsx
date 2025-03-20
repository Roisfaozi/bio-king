'use client';

import Image from 'next/image';
import { useState } from 'react';

interface HeroImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
}

export function HeroImage({
  src,
  alt,
  width = 600,
  height = 400,
  className = '',
}: HeroImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  // Fallback image if the original fails to load
  const fallbackImage = '/placeholder.svg';

  return (
    <div className='relative h-full w-full'>
      {isLoading && (
        <div className='absolute inset-0 flex items-center justify-center rounded-xl bg-muted/20'>
          <div className='h-10 w-10 animate-spin rounded-full border-4 border-primary border-t-transparent'></div>
        </div>
      )}
      <Image
        src={hasError ? fallbackImage : src}
        width={width}
        height={height}
        alt={alt}
        className={`${className} transition-opacity duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
        priority
        onLoad={() => setIsLoading(false)}
        onError={() => {
          setIsLoading(false);
          setHasError(true);
        }}
      />
    </div>
  );
}
