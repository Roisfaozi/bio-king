'use client';

import React from 'react';

export interface FeatureItem {
  title: string;
  image: string;
  badge?: {
    text: string;
    color: string;
  };
  overlay?: React.ReactNode;
}

export const featuresData: FeatureItem[] = [
  {
    title: 'PHOTO EDITOR',
    image: '/images/photo-editor.jpg',
    overlay: (
      <div className='absolute inset-0 flex items-end bg-gradient-to-t from-black/70 to-transparent'>
        <div className='flex w-full items-center justify-between p-4'>
          <div className='flex space-x-2'>
            <div className='flex h-8 w-8 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm'>
              <span className='text-white'>□</span>
            </div>
            <div className='flex h-8 w-8 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm'>
              <span className='text-white'>◧</span>
            </div>
            <div className='flex h-8 w-8 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm'>
              <span className='text-white'>FX</span>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    title: 'VSCO CANVAS',
    image: '/images/vsco-canvas.jpg',
    overlay: (
      <div className='absolute left-0 top-0 p-3'>
        <div className='flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600'>
          <svg
            className='h-6 w-6 text-white'
            viewBox='0 0 24 24'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M15 3H6C4.89543 3 4 3.89543 4 5V19C4 20.1046 4.89543 21 6 21H18C19.1046 21 20 20.1046 20 19V8M15 3L20 8M15 3V7C15 7.55228 15.4477 8 16 8H20'
              stroke='currentColor'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
          </svg>
        </div>
      </div>
    ),
  },
  {
    title: 'VSCO SITES',
    image: '/images/vsco-sites.jpg',
    overlay: (
      <div className='absolute inset-0 flex items-center justify-center'>
        <button className='flex items-center space-x-2 rounded-full bg-white/20 px-4 py-2 backdrop-blur-sm'>
          <svg
            className='h-5 w-5'
            viewBox='0 0 24 24'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z'
              stroke='currentColor'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
            <path
              d='M2 12H22'
              stroke='currentColor'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
            <path
              d='M12 2C14.5013 4.73835 15.9228 8.29203 16 12C15.9228 15.708 14.5013 19.2616 12 22C9.49872 19.2616 8.07725 15.708 8 12C8.07725 8.29203 9.49872 4.73835 12 2Z'
              stroke='currentColor'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
          </svg>
          <span>BUILD SITE</span>
        </button>
      </div>
    ),
  },
  {
    title: 'PHOTO PRESETS',
    image: '/images/photo-presets.jpg',
    badge: {
      text: 'C1 PRO',
      color: 'orange-600',
    },
  },
  {
    title: 'BLOGS',
    image: '/images/blogs.jpg',
  },
  {
    title: 'VIDEO EDITOR',
    image: '/images/video-editor.jpg',
    overlay: (
      <div className='absolute left-3 top-3'>
        <div className='flex h-8 w-8 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm'>
          <span className='text-white'>▶</span>
        </div>
      </div>
    ),
  },
  {
    title: 'FILM FX',
    image: '/images/film-fx.jpg',
  },
  {
    title: 'A.I. REMOVE',
    image: '/images/ai-remove.jpg',
  },
  {
    title: 'PHOTOGRAPHY JOBS',
    image: '/images/photography-jobs.jpg',
    overlay: (
      <div className='absolute inset-0 flex items-center justify-center'>
        <div className='rounded-lg bg-white/20 p-4 text-center backdrop-blur-sm'>
          <div className='mb-2 flex justify-center'>
            <svg
              className='h-6 w-6'
              viewBox='0 0 24 24'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z'
                stroke='currentColor'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
            </svg>
          </div>
          <p className='text-sm'>
            Available for
            <br />
            professional work
          </p>
        </div>
      </div>
    ),
  },
  {
    title: 'ALL FEATURES',
    image: '/images/all-features.jpg',
  },
];
