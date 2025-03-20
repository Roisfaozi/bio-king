'use client';

import { motion } from 'framer-motion';
import { Heart, CloudLightningIcon as Lightning, Star, X } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

interface ProfileCardProps {
  profile: {
    id: number;
    name: string;
    age: number;
    image: string;
  };
  index: number;
}

export default function ProfileCard({ profile, index }: ProfileCardProps) {
  const [swiped, setSwiped] = useState<'left' | 'right' | null>(null);

  const handleSwipe = (direction: 'left' | 'right') => {
    setSwiped(direction);
  };

  if (swiped) {
    return null; // Remove card after swipe
  }

  return (
    <motion.div
      className='relative transform overflow-hidden rounded-xl bg-white shadow-lg'
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{
        opacity: 1,
        scale: 1,
        x: Math.random() * 20 - 10,
        y: Math.random() * 20 - 10,
      }}
      transition={{
        duration: 0.5,
        delay: index * 0.05,
      }}
      drag
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      dragElastic={0.9}
      onDragEnd={(e, info) => {
        if (info.offset.x > 100) {
          handleSwipe('right');
        } else if (info.offset.x < -100) {
          handleSwipe('left');
        }
      }}
      whileDrag={{ scale: 1.05 }}
    >
      <div className='relative aspect-[3/4]'>
        <Image
          src={profile.image || '/placeholder.svg'}
          alt={profile.name}
          fill
          className='object-cover'
        />
        <div className='absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3'>
          <div className='flex items-center'>
            <span className='font-semibold text-white'>{profile.name}</span>
            <span className='ml-1 text-white'>{profile.age}</span>
            {index % 3 === 0 && (
              <span className='ml-2 text-blue-400'>
                <svg viewBox='0 0 24 24' className='h-4 w-4 fill-current'>
                  <path d='M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm-1.5 14.5l-4-4 1.5-1.5 2.5 2.5 6-6 1.5 1.5-7.5 7.5z' />
                </svg>
              </span>
            )}
          </div>
        </div>
      </div>
      <div className='absolute left-0 right-0 top-0 flex justify-center p-1'>
        <div className='h-1 w-16 rounded-full bg-red-500' />
      </div>
      <div className='flex justify-around bg-white p-2'>
        <button
          className='flex h-8 w-8 items-center justify-center rounded-full border border-gray-300 text-red-500 transition hover:bg-red-50'
          onClick={() => handleSwipe('left')}
        >
          <X size={16} />
        </button>
        <button className='flex h-8 w-8 items-center justify-center rounded-full border border-gray-300 text-blue-500 transition hover:bg-blue-50'>
          <Star size={16} />
        </button>
        <button
          className='flex h-8 w-8 items-center justify-center rounded-full border border-gray-300 text-green-500 transition hover:bg-green-50'
          onClick={() => handleSwipe('right')}
        >
          <Heart size={16} />
        </button>
        <button className='flex h-8 w-8 items-center justify-center rounded-full border border-gray-300 text-purple-500 transition hover:bg-purple-50'>
          <Lightning size={16} />
        </button>
      </div>
    </motion.div>
  );
}
