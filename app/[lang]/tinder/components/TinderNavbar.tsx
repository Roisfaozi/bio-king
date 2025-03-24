import { forwardRef } from 'react';
import Link from 'next/link';
import { AlertCircle, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface TinderNavbarProps {
  isFixed?: boolean;
  locationEnabled?: boolean;
  locationError?: string | null;
  onLoginClick: () => void;
  className?: string;
}

const TinderNavbar = forwardRef<HTMLDivElement, TinderNavbarProps>(
  function TinderNavbar(
    {
      isFixed = false,
      locationEnabled = false,
      locationError = null,
      onLoginClick,
      className = '',
    },
    ref,
  ) {
    return (
      <div ref={ref} className={`${className}`}>
        <header
          className={`navbar sticky top-0 z-50 w-full ${isFixed ? 'navbar-fixed' : ''}`}
        >
          <div className='bg-gradient-to-b from-black/80 via-black/60 to-transparent'>
            <div className='flex w-full items-center justify-between px-4 py-3 md:px-8 lg:px-16'>
              <div className='flex items-center'>
                <Link href='/' className='flex items-center'>
                  <svg
                    viewBox='0 0 24 24'
                    className='h-8 w-8 fill-current text-white'
                  >
                    <path d='M16.5 11.5c0 2.5-1.5 4.5-4.5 4.5-2 0-4.5-2-4.5-4.5C7.5 9 9.5 7 12 7s4.5 2 4.5 4.5zm-4.5 6c3.5 0 6.5-2 6.5-6.5S15.5 5 12 5 5.5 7 5.5 11.5 9 17.5 12 17.5z' />
                    <path d='M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.6 0 12 0zm0 22.5C6.2 22.5 1.5 17.8 1.5 12S6.2 1.5 12 1.5 22.5 6.2 22.5 12 17.8 22.5 12 22.5z' />
                  </svg>
                  <span className='ml-2 text-2xl font-bold text-white'>
                    tinder
                  </span>
                </Link>
                <nav className='ml-8 hidden space-x-6 md:flex'>
                  <Link
                    href='#'
                    className='text-white transition hover:text-white/80'
                  >
                    Products
                  </Link>
                  <Link
                    href='#'
                    className='text-white transition hover:text-white/80'
                  >
                    Learn
                  </Link>
                  <Link
                    href='#'
                    className='text-white transition hover:text-white/80'
                  >
                    Safety
                  </Link>
                  <Link
                    href='#'
                    className='text-white transition hover:text-white/80'
                  >
                    Support
                  </Link>
                  <Link
                    href='#'
                    className='text-white transition hover:text-white/80'
                  >
                    Download
                  </Link>
                  <Link
                    href='#'
                    className='text-white transition hover:text-white/80'
                  >
                    Gift Cards
                  </Link>
                </nav>
              </div>
              <div className='flex items-center space-x-4'>
                {locationEnabled && (
                  <div className='mr-2 flex items-center text-white'>
                    <MapPin className='mr-1 h-4 w-4 text-pink-500' />
                    <span className='hidden text-sm md:inline'>
                      Location Active
                    </span>
                  </div>
                )}
                {locationError && (
                  <div className='mr-2 hidden items-center text-red-400 md:flex'>
                    <AlertCircle className='mr-1 h-4 w-4' />
                    <span className='text-sm'>Location Error</span>
                  </div>
                )}
                <button className='hidden items-center text-white transition hover:text-white/80 md:flex'>
                  <span className='mr-1'>🌐</span>
                  Language
                </button>
                <Button
                  className='rounded-full bg-white px-6 font-medium text-black hover:bg-white/90'
                  onClick={onLoginClick}
                >
                  Log in
                </Button>
              </div>
            </div>
          </div>
        </header>
      </div>
    );
  },
);

export default TinderNavbar;
