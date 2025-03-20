'use client';

import Link from 'next/link';

export default function Footer() {
  return (
    <footer className='bg-black pb-8 pt-16 text-white'>
      <div className='container mx-auto px-6'>
        <div className='mb-16 grid grid-cols-1 gap-10 md:grid-cols-5'>
          {/* First column - SO YOU CAN MAKE IT */}
          <div className='md:col-span-1'>
            <h2 className='text-4xl font-bold leading-tight'>
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
          <div>
            <h3 className='mb-6 text-sm font-bold tracking-wide'>COMPANY</h3>
            <ul className='space-y-4'>
              <li>
                <Link href='#' className='text-sm hover:underline'>
                  About VSCO
                </Link>
              </li>
              <li>
                <Link href='#' className='text-sm hover:underline'>
                  Products
                </Link>
              </li>
              <li>
                <Link href='#' className='text-sm hover:underline'>
                  Plans
                </Link>
              </li>
              <li>
                <Link href='#' className='text-sm hover:underline'>
                  Careers
                </Link>
              </li>
              <li>
                <Link href='#' className='text-sm hover:underline'>
                  Press
                </Link>
              </li>
            </ul>
          </div>

          {/* Third column - FEATURES */}
          <div>
            <h3 className='mb-6 text-sm font-bold tracking-wide'>FEATURES</h3>
            <ul className='space-y-4'>
              <li>
                <Link href='#' className='text-sm hover:underline'>
                  What's New
                </Link>
              </li>
              <li>
                <Link href='#' className='text-sm hover:underline'>
                  Photo Editor
                </Link>
              </li>
              <li>
                <Link href='#' className='text-sm hover:underline'>
                  Mobile App
                </Link>
              </li>
              <li>
                <Link href='#' className='text-sm hover:underline'>
                  Photo Filters
                </Link>
              </li>
              <li>
                <Link href='#' className='text-sm hover:underline'>
                  Creative Community
                </Link>
              </li>
              <li>
                <Link href='#' className='text-sm hover:underline'>
                  VSCO Hub
                </Link>
              </li>
              <li>
                <Link href='#' className='text-sm hover:underline'>
                  VSCO Canvas
                </Link>
              </li>
            </ul>
          </div>

          {/* Fourth column - COMMUNITY */}
          <div>
            <h3 className='mb-6 text-sm font-bold tracking-wide'>COMMUNITY</h3>
            <ul className='space-y-4'>
              <li>
                <Link href='#' className='text-sm hover:underline'>
                  Photographer Stories
                </Link>
              </li>
              <li>
                <Link href='#' className='text-sm hover:underline'>
                  Learn
                </Link>
              </li>
              <li>
                <Link href='#' className='text-sm hover:underline'>
                  Guidelines
                </Link>
              </li>
              <li>
                <Link href='#' className='text-sm hover:underline'>
                  Safety
                </Link>
              </li>
              <li>
                <Link href='#' className='text-sm hover:underline'>
                  Support
                </Link>
              </li>
              <li>
                <Link href='#' className='text-sm hover:underline'>
                  Forum
                </Link>
              </li>
            </ul>
          </div>

          {/* Fifth column - GUIDES */}
          <div>
            <h3 className='mb-6 text-sm font-bold tracking-wide'>GUIDES</h3>
            <ul className='space-y-4'>
              <li>
                <Link href='#' className='text-sm hover:underline'>
                  Photography Basics
                </Link>
              </li>
              <li>
                <Link href='#' className='text-sm hover:underline'>
                  Photography Tips and Techniques
                </Link>
              </li>
              <li>
                <Link href='#' className='text-sm hover:underline'>
                  Photography Guides
                </Link>
              </li>
              <li>
                <Link href='#' className='text-sm hover:underline'>
                  Curated Photo Collections
                </Link>
              </li>
              <li>
                <Link href='#' className='text-sm hover:underline'>
                  Photography Business
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Footer Section with Logo and Buttons */}
        <div className='border-t border-gray-800 pt-8'>
          <div className='mb-8 flex flex-col items-center justify-between md:flex-row'>
            <div className='mb-6 md:mb-0'>
              <Link href='#' className='flex items-center'>
                <div className='relative h-12 w-12'>
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

            <div className='flex space-x-4'>
              <Link
                href='#'
                className='inline-block rounded-full border border-white px-6 py-2.5 text-xs font-medium transition-colors hover:bg-white hover:text-black'
              >
                TRY FOR FREE
              </Link>
              <Link
                href='#'
                className='inline-block rounded-full border border-white px-6 py-2.5 text-xs font-medium transition-colors hover:bg-white hover:text-black'
              >
                DOWNLOAD NOW
              </Link>
            </div>
          </div>

          <div className='flex flex-col justify-between border-t border-gray-800 pt-6 md:flex-row'>
            <div className='mb-4 flex flex-wrap gap-6 md:mb-0'>
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

            <div className='text-xs text-gray-500'>
              Copyright 2025 VSCO. All rights reserved
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
