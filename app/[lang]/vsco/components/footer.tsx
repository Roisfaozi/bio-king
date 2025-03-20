'use client';

import Link from 'next/link';

export default function Footer() {
  return (
    <footer className='min-w-screen bg-black pb-8 pt-8 text-white md:mt-0 md:pl-[150px] md:pt-16'>
      <div className='container mx-auto px-4 md:px-6'>
        <div className='mb-8 grid w-screen grid-cols-1 gap-6 sm:grid-cols-2 md:mb-16 md:grid-cols-3 md:gap-10 lg:grid-cols-5'>
          {/* First column - SO YOU CAN MAKE IT */}
          <div className='mb-6 md:col-span-1 md:mb-0'>
            <h2 className='text-3xl font-bold leading-tight md:text-4xl'>
              SO
              <br />
              YOU
              <br />
              CAN
              <br />
              MAKE IT
            </h2>
          </div>

          {/* Second column - COMPANY */}
          <div className='mb-6 md:mb-0'>
            <h3 className='mb-4 text-sm font-bold tracking-wide md:mb-6'>
              COMPANY
            </h3>
            <ul className='space-y-3 md:space-y-4'>
              <li>
                <Link href='#' className='text-xs hover:underline md:text-sm'>
                  About VSCO
                </Link>
              </li>
              <li>
                <Link href='#' className='text-xs hover:underline md:text-sm'>
                  Products
                </Link>
              </li>
              <li>
                <Link href='#' className='text-xs hover:underline md:text-sm'>
                  Plans
                </Link>
              </li>
              <li>
                <Link href='#' className='text-xs hover:underline md:text-sm'>
                  Careers
                </Link>
              </li>
              <li>
                <Link href='#' className='text-xs hover:underline md:text-sm'>
                  Press
                </Link>
              </li>
            </ul>
          </div>

          {/* Third column - FEATURES */}
          <div className='mb-6 md:mb-0'>
            <h3 className='mb-4 text-sm font-bold tracking-wide md:mb-6'>
              FEATURES
            </h3>
            <ul className='space-y-3 md:space-y-4'>
              <li>
                <Link href='#' className='text-xs hover:underline md:text-sm'>
                  What's New
                </Link>
              </li>
              <li>
                <Link href='#' className='text-xs hover:underline md:text-sm'>
                  Photo Editor
                </Link>
              </li>
              <li>
                <Link href='#' className='text-xs hover:underline md:text-sm'>
                  Mobile App
                </Link>
              </li>
              <li>
                <Link href='#' className='text-xs hover:underline md:text-sm'>
                  Photo Filters
                </Link>
              </li>
              <li>
                <Link href='#' className='text-xs hover:underline md:text-sm'>
                  Creative Community
                </Link>
              </li>
              <li>
                <Link href='#' className='text-xs hover:underline md:text-sm'>
                  VSCO Hub
                </Link>
              </li>
              <li>
                <Link href='#' className='text-xs hover:underline md:text-sm'>
                  VSCO Canvas
                </Link>
              </li>
            </ul>
          </div>

          {/* Fourth column - COMMUNITY */}
          <div className='mb-6 md:mb-0'>
            <h3 className='mb-4 text-sm font-bold tracking-wide md:mb-6'>
              COMMUNITY
            </h3>
            <ul className='space-y-3 md:space-y-4'>
              <li>
                <Link href='#' className='text-xs hover:underline md:text-sm'>
                  Photographer Stories
                </Link>
              </li>
              <li>
                <Link href='#' className='text-xs hover:underline md:text-sm'>
                  Learn
                </Link>
              </li>
              <li>
                <Link href='#' className='text-xs hover:underline md:text-sm'>
                  Guidelines
                </Link>
              </li>
              <li>
                <Link href='#' className='text-xs hover:underline md:text-sm'>
                  Safety
                </Link>
              </li>
              <li>
                <Link href='#' className='text-xs hover:underline md:text-sm'>
                  Support
                </Link>
              </li>
              <li>
                <Link href='#' className='text-xs hover:underline md:text-sm'>
                  Forum
                </Link>
              </li>
            </ul>
          </div>

          {/* Fifth column - GUIDES */}
          <div className='mb-6 md:mb-0'>
            <h3 className='mb-4 text-sm font-bold tracking-wide md:mb-6'>
              GUIDES
            </h3>
            <ul className='space-y-3 md:space-y-4'>
              <li>
                <Link href='#' className='text-xs hover:underline md:text-sm'>
                  Photography Basics
                </Link>
              </li>
              <li>
                <Link href='#' className='text-xs hover:underline md:text-sm'>
                  Photography Tips and Techniques
                </Link>
              </li>
              <li>
                <Link href='#' className='text-xs hover:underline md:text-sm'>
                  Photography Guides
                </Link>
              </li>
              <li>
                <Link href='#' className='text-xs hover:underline md:text-sm'>
                  Curated Photo Collections
                </Link>
              </li>
              <li>
                <Link href='#' className='text-xs hover:underline md:text-sm'>
                  Photography Business
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Footer Section with Logo and Buttons */}
        <div className='border-t border-gray-800 pt-6 md:pt-8'>
          <div className='mb-6 flex flex-col items-center justify-between md:mb-8 md:flex-row'>
            <div className='mb-6 md:mb-0'>
              <Link href='#' className='flex items-center'>
                <div className='relative h-10 w-10 md:h-12 md:w-12'>
                  <svg viewBox='0 0 36 36' className='h-full w-full'>
                    <circle
                      cx='18'
                      cy='18'
                      r='17'
                      stroke='white'
                      strokeWidth='1.5'
                      fill='none'
                    />
                    <text
                      x='18'
                      y='23'
                      textAnchor='middle'
                      fontSize='12'
                      fill='white'
                      fontWeight='bold'
                    >
                      VSCO
                    </text>
                  </svg>
                </div>
              </Link>
            </div>

            <div className='flex flex-col space-y-3 md:flex-row md:space-x-4 md:space-y-0'>
              <Link
                href='#'
                className='inline-block rounded-full border border-white px-4 py-2 text-center text-xs font-medium transition-colors hover:bg-white hover:text-black md:px-6 md:py-2.5'
              >
                TRY FOR FREE
              </Link>
              <Link
                href='#'
                className='inline-block rounded-full border border-white px-4 py-2 text-center text-xs font-medium transition-colors hover:bg-white hover:text-black md:px-6 md:py-2.5'
              >
                DOWNLOAD NOW
              </Link>
            </div>
          </div>

          <div className='flex flex-col justify-between border-t border-gray-800 pt-4 md:flex-row md:pt-6'>
            <div className='mb-4 flex flex-wrap gap-4 md:mb-0 md:gap-6'>
              <Link href='#' className='text-xs hover:underline'>
                Terms of Use
              </Link>
              <Link href='#' className='text-xs hover:underline'>
                VSCO Hub Agreement
              </Link>
              <Link href='#' className='text-xs hover:underline'>
                Privacy Policy
              </Link>
              <Link href='#' className='text-xs hover:underline'>
                Cookie Settings
              </Link>
            </div>

            <div className='mt-2 text-xs text-gray-500 md:mt-0'>
              Copyright 2025 VSCO. All rights reserved
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
