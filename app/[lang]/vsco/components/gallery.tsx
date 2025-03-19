'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

// Data galeri (gambar sampel)
const galleryData = [
  {
    id: 1,
    imageUrl:
      'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    username: 'alex_turner',
    likes: 243,
    filter: 'A6',
  },
  {
    id: 2,
    imageUrl:
      'https://images.unsplash.com/photo-1501785888041-af3ef285b470?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    username: 'travel_enthusiast',
    likes: 156,
    filter: 'C1',
  },
  {
    id: 3,
    imageUrl:
      'https://images.unsplash.com/photo-1493246507139-91e8fad9978e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    username: 'nature_lover',
    likes: 421,
    filter: 'M5',
  },
  {
    id: 4,
    imageUrl:
      'https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    username: 'landscape_shots',
    likes: 198,
    filter: 'F2',
  },
  {
    id: 5,
    imageUrl:
      'https://images.unsplash.com/photo-1682687220566-5599dbbebf11?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    username: 'city_explorer',
    likes: 312,
    filter: 'B5',
  },
  {
    id: 6,
    imageUrl:
      'https://images.unsplash.com/photo-1470770903676-69b98201ea1c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    username: 'sunset_chaser',
    likes: 267,
    filter: 'G3',
  },
  {
    id: 7,
    imageUrl:
      'https://images.unsplash.com/photo-1518895949257-7621c3c786d7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    username: 'minimal_style',
    likes: 178,
    filter: 'P3',
  },
  {
    id: 8,
    imageUrl:
      'https://images.unsplash.com/photo-1693022434462-26322aeb3067?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    username: 'street_life',
    likes: 202,
    filter: 'T1',
  },
  {
    id: 9,
    imageUrl:
      'https://images.unsplash.com/photo-1682687220063-4742bd7fd538?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    username: 'wilderness_photography',
    likes: 345,
    filter: 'M1',
  },
];

interface GalleryProps {
  onLoginRequired: () => void;
}

export default function Gallery({ onLoginRequired }: GalleryProps) {
  const [isBlurred, setIsBlurred] = useState(false);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);

  // Blur gallery and show login prompt after a delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsBlurred(true);
      setShowLoginPrompt(true);
    }, 2000); // 2 detik delay

    return () => clearTimeout(timer);
  }, []);

  const handleImageClick = () => {
    if (isBlurred) {
      onLoginRequired();
    }
  };

  return (
    <div className='relative'>
      <div className='mb-8'>
        <div className='mb-6 flex items-center justify-between'>
          <h2 className='text-2xl font-bold'>Featured Photography</h2>
          <div className='flex space-x-4'>
            <button className='text-white hover:text-gray-300'>Popular</button>
            <span className='text-gray-600'>|</span>
            <button className='text-gray-400 hover:text-white'>Recent</button>
            <span className='text-gray-600'>|</span>
            <button className='text-gray-400 hover:text-white'>
              Following
            </button>
          </div>
        </div>
      </div>

      <div
        className={`grid grid-cols-1 gap-1 sm:grid-cols-2 md:grid-cols-3 ${isBlurred ? 'blur-sm filter' : ''}`}
      >
        {galleryData.map((item) => (
          <div
            key={item.id}
            className='group relative aspect-square cursor-pointer overflow-hidden'
            onClick={handleImageClick}
          >
            <Image
              src={item.imageUrl}
              alt={`Photo by ${item.username}`}
              width={500}
              height={500}
              className='h-full w-full transform object-cover transition-transform duration-500 group-hover:scale-105'
              unoptimized={true} // For external images
            />
            <div className='absolute inset-0 flex items-end justify-start bg-gradient-to-t from-black/70 via-black/20 to-transparent p-4 opacity-0 transition-all duration-300 group-hover:opacity-100'>
              <div className='text-white'>
                <p className='font-medium'>{item.username}</p>
                <div className='mt-1 flex items-center text-sm'>
                  <span className='mr-2 rounded bg-black/50 px-1.5 py-0.5'>
                    {item.filter}
                  </span>
                  <span className='flex items-center'>
                    <svg
                      className='mr-1 h-3 w-3'
                      viewBox='0 0 24 24'
                      fill='currentColor'
                    >
                      <path d='M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z' />
                    </svg>
                    {item.likes}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showLoginPrompt && (
        <div
          className='absolute inset-0 flex items-center justify-center'
          onClick={onLoginRequired}
        >
          <div className='z-10 mx-4 max-w-md rounded-xl border border-gray-700 bg-black p-8 text-center shadow-xl'>
            <svg
              className='mx-auto mb-4 h-16 w-16 text-white'
              viewBox='0 0 24 24'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20Z'
                fill='currentColor'
              />
            </svg>
            <h3 className='mb-2 text-xl font-semibold text-white'>
              Experience the full VSCO community
            </h3>
            <p className='mb-6 text-gray-400'>
              Sign in to view more incredible photography and connect with
              creators
            </p>
            <button
              onClick={onLoginRequired}
              className='w-full rounded-lg bg-white py-3 font-medium text-black transition-colors hover:bg-gray-200'
            >
              Log In or Sign Up
            </button>
            <p className='mt-4 text-sm text-gray-500'>
              Join millions of creators sharing their work
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
