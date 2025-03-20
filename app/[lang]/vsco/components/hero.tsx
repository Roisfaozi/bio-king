'use client';

import Link from 'next/link';

export default function Hero() {
  return (
    <div className='px-4 py-16 md:px-8'>
      <div className='max-w-[1650px] 2xl:mx-auto'>
        <h1 className='mb-4 text-5xl font-bold tracking-tight md:text-6xl'>
          YOUR HOME FOR PHOTOGRAPHY
        </h1>
        <p className='mb-10 max-w-3xl text-lg text-gray-300 md:text-xl'>
          Enhance your work with our video and photo editor, share with an
          authentic community, and get exposure to brands looking to hire.
        </p>
        <div className='mb-16 flex flex-wrap gap-4'>
          <Link
            href='#'
            className='rounded-full bg-white px-8 py-3 font-medium text-[#111] transition-colors hover:bg-gray-200'
          >
            TRY FOR FREE
          </Link>
          <Link
            href='#'
            className='rounded-full border border-gray-700 px-8 py-3 font-medium text-white transition-colors hover:bg-white/10'
          >
            SIGN IN
          </Link>
        </div>
      </div>
    </div>
  );
}
