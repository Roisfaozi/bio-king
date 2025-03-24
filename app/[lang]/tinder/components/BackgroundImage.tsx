import { RefObject } from 'react';

interface BackgroundImageProps {
  backgroundRef: RefObject<HTMLDivElement>;
  isMobile: boolean;
}

export default function BackgroundImage({
  backgroundRef,
  isMobile,
}: BackgroundImageProps) {
  return (
    <div className='fixed inset-0 z-0' ref={backgroundRef}>
      <div className='relative h-full w-full'>
        {/* Desktop background */}
        <div className='absolute inset-0 hidden md:block'>
          <div
            className='absolute inset-0 bg-cover bg-fixed bg-center'
            style={{
              backgroundImage:
                "url('https://tinder.com/static/build/cf11930093976a50329858777bae1bde.webp')",
            }}
          />
        </div>

        {/* Mobile background */}
        <div className='absolute inset-0 md:hidden'>
          <div
            className='absolute inset-0 bg-cover bg-fixed bg-center'
            style={{
              backgroundImage:
                "url('https://tinder.com/static/build/574b10ef643ef1bc9a17c73e16b3b8a8.webp')",
            }}
          />
        </div>

        {/* Overlay for text readability */}
        <div className='absolute inset-0 z-10 bg-black/30' />
      </div>
    </div>
  );
}
