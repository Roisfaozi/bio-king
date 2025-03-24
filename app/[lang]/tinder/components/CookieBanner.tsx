import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';

interface CookieBannerProps {
  show: boolean;
  onClose: () => void;
}

export default function CookieBanner({ show, onClose }: CookieBannerProps) {
  if (!show) return null;

  return (
    <AnimatePresence>
      <motion.div
        className='fixed bottom-0 left-0 right-0 z-50 bg-white p-4 text-center md:text-left'
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        exit={{ y: 100 }}
        transition={{ duration: 0.3 }}
      >
        <div className='mx-auto flex max-w-6xl flex-col items-center justify-between md:flex-row'>
          <div className='mb-4 text-sm text-gray-700 md:mb-0 md:mr-4'>
            <span>
              We value your privacy. We and our partners use trackers to measure
              the audience of our website and to provide you with offers and
              improve our own Tinder marketing operations.
            </span>
            <Link href='#' className='ml-1 font-medium underline'>
              More info on cookies and providers we use
            </Link>
            <span>
              . You can withdraw your consent at any time in your settings.
            </span>
          </div>
          <div className='flex flex-wrap justify-center gap-2'>
            <Button
              variant='outline'
              className='rounded-full border-gray-300 text-black'
              onClick={() => {}}
            >
              Personalize my choices
            </Button>
            <Button
              variant='outline'
              className='rounded-full border-gray-300 text-black'
              onClick={onClose}
            >
              I accept
            </Button>
            <Button
              variant='outline'
              className='rounded-full border-gray-300 text-black'
              onClick={onClose}
            >
              I decline
            </Button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
