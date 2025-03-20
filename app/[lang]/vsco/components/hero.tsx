'use client';

import Link from 'next/link';

export default function Hero() {
  return (
    <div className='px-2 py-8 md:px-8 md:py-16'>
      <div className='w-full lg:max-w-[1650px] 2xl:mx-auto'>
        <h1 className='mb-4 text-3xl font-bold tracking-tight md:text-5xl lg:text-6xl'>
          YOUR HOME FOR PHOTOGRAPHY
        </h1>
        <p className='mb-6 max-w-3xl text-base text-gray-300 md:mb-10 md:text-lg lg:text-xl'>
          Enhance your work with our video and photo editor, share with an
          authentic community, and get exposure to brands looking to hire.
        </p>
        <div className='mb-8 flex flex-wrap gap-4 md:mb-16'>
          <Link
            href='#'
            className='rounded-full bg-white px-6 py-2 text-sm font-medium text-[#111] transition-colors hover:bg-gray-200 md:px-8 md:py-3 md:text-base'
          >
            TRY FOR FREE
          </Link>
          <Link
            href='#'
            className='rounded-full border border-gray-700 px-6 py-2 text-sm font-medium text-white transition-colors hover:bg-white/10 md:px-8 md:py-3 md:text-base'
          >
            SIGN IN
          </Link>
        </div>
      </div>
    </div>
  );
}
