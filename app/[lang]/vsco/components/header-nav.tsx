'use client';

import Link from 'next/link';

export default function HeaderNav() {
  return (
    <div className='fixed left-0 right-0 top-0 z-40 w-full border-b border-gray-800 bg-black pl-[164px]'>
      <div className='container mx-auto'>
        <nav className='flex justify-start'>
          <ul className='flex space-x-10'>
            <li>
              <Link
                href='#'
                className='inline-block py-4 text-xs font-medium tracking-wider text-white hover:text-gray-300'
              >
                PHOTO + VIDEO EDITOR
              </Link>
            </li>
            <li>
              <Link
                href='#'
                className='inline-block py-4 text-xs font-medium tracking-wider text-white hover:text-gray-300'
              >
                PHOTOGRAPHY COMMUNITY
              </Link>
            </li>
            <li>
              <Link
                href='#'
                className='inline-block py-4 text-xs font-medium tracking-wider text-white hover:text-gray-300'
              >
                BUSINESSES + BRANDS
              </Link>
            </li>
            <li>
              <Link
                href='#'
                className='inline-block py-4 text-xs font-medium tracking-wider text-white hover:text-gray-300'
              >
                FEATURES
              </Link>
            </li>
            <li>
              <Link
                href='#'
                className='inline-block py-4 text-xs font-medium tracking-wider text-white hover:text-gray-300'
              >
                PLANS + PRICING
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}
