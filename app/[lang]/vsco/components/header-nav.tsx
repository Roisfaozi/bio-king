'use client';

import { Menu } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

export default function HeaderNav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className='left-0 right-0 top-0 z-40 w-full max-w-[1650px] bg-[#111] py-8 2xl:mx-auto'>
      <div className=''>
        <div className='flex items-center justify-between px-4 md:px-0'>
          <button
            className='block text-white md:hidden'
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu />
          </button>
          <nav
            className={`${isMenuOpen ? 'block' : 'hidden'} absolute left-0 right-0 top-20 z-50 bg-[#111] p-4 md:relative md:top-0 md:block md:p-0`}
          >
            <ul className='flex flex-col space-y-4 md:flex-row md:space-x-10 md:space-y-0'>
              <li>
                <Link
                  href='#'
                  className='inline-block py-4 text-xs font-semibold tracking-wider text-white hover:text-gray-300'
                >
                  PHOTO + VIDEO EDITOR
                </Link>
              </li>
              <li>
                <Link
                  href='#'
                  className='inline-block py-4 text-xs font-semibold tracking-wider text-white hover:text-gray-300'
                >
                  PHOTOGRAPHY COMMUNITY
                </Link>
              </li>
              <li>
                <Link
                  href='#'
                  className='inline-block py-4 text-xs font-semibold tracking-wider text-white hover:text-gray-300'
                >
                  BUSINESSES + BRANDS
                </Link>
              </li>
              <li>
                <Link
                  href='#'
                  className='inline-block py-4 text-xs font-semibold tracking-wider text-white hover:text-gray-300'
                >
                  FEATURES
                </Link>
              </li>
              <li>
                <Link
                  href='#'
                  className='inline-block py-4 text-xs font-semibold tracking-wider text-white hover:text-gray-300'
                >
                  PLANS + PRICING
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
}
