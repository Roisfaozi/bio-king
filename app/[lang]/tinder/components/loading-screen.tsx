'use client';

import { motion } from 'framer-motion';

export default function LoadingScreen() {
  return (
    <div
      className='fixed inset-0 z-50 flex items-center justify-center'
      style={{
        background: 'linear-gradient(180deg, #fe3c72 0%, #ff7655 100%)',
      }}
    >
      <motion.div
        initial={{ y: 0, scale: 1 }}
        animate={{
          y: [-15, 0, -15],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 1.8,
          repeat: Number.POSITIVE_INFINITY,
          ease: 'easeInOut',
          times: [0, 0.5, 1], // Synchronize the animations
        }}
        className='h-16 w-16 text-white'
      >
        <svg viewBox='0 0 24 24' className='h-full w-full fill-current'>
          <path d='M16.5 11.5c0 2.5-1.5 4.5-4.5 4.5-2 0-4.5-2-4.5-4.5C7.5 9 9.5 7 12 7s4.5 2 4.5 4.5zm-4.5 6c3.5 0 6.5-2 6.5-6.5S15.5 5 12 5 5.5 7 5.5 11.5 9 17.5 12 17.5z' />
        </svg>
      </motion.div>
    </div>
  );
}
