'use client';

import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed left-0 right-0 top-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-black/90 backdrop-blur-sm' : 'bg-black'}`}
    >
      <div className='flex h-16 items-center justify-between px-4 md:px-6 lg:px-10'>
        {/* Logo */}
        <Link href='/' className='flex items-center'>
          <div className='relative h-8 w-8'>
            <svg
              viewBox='0 0 40 40'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
              className='h-full w-full'
            >
              <circle
                cx='20'
                cy='20'
                r='19'
                stroke='white'
                strokeWidth='2'
                fill='none'
              />
              <circle
                cx='20'
                cy='20'
                r='12'
                stroke='white'
                strokeWidth='2'
                fill='none'
              />
              <circle
                cx='20'
                cy='20'
                r='5'
                stroke='white'
                strokeWidth='2'
                fill='none'
              />
            </svg>
          </div>
          <span className='ml-2 text-sm font-bold uppercase text-white'>
            VSCO
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className='hidden items-center space-x-8 lg:flex'>
          <Link
            href='/editor'
            className='text-xs font-medium tracking-wide text-white hover:opacity-80'
          >
            PHOTO + VIDEO EDITOR
          </Link>
          <Link
            href='/community'
            className='text-xs font-medium tracking-wide text-white hover:opacity-80'
          >
            PHOTOGRAPHY COMMUNITY
          </Link>
          <Link
            href='/businesses'
            className='text-xs font-medium tracking-wide text-white hover:opacity-80'
          >
            BUSINESSES + BRANDS
          </Link>
          <Link
            href='/features'
            className='text-xs font-medium tracking-wide text-white hover:opacity-80'
          >
            FEATURES
          </Link>
          <Link
            href='/plans'
            className='text-xs font-medium tracking-wide text-white hover:opacity-80'
          >
            PLANS + PRICING
          </Link>
        </nav>

        {/* Mobile Menu Button - Only visible on large screens */}
        <Button
          variant='ghost'
          size='icon'
          className='hidden text-white lg:flex'
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
        >
          {isMenuOpen ? (
            <X className='h-5 w-5' />
          ) : (
            <Menu className='h-5 w-5' />
          )}
        </Button>
      </div>

      {/* Mobile Navigation - Only for large screens */}
      {isMenuOpen && (
        <div className='hidden border-t border-gray-800 bg-black lg:block'>
          <nav className='flex flex-col px-4 py-4'>
            <Link
              href='/editor'
              className='py-3 text-sm font-medium tracking-wide text-white hover:opacity-80'
              onClick={() => setIsMenuOpen(false)}
            >
              PHOTO + VIDEO EDITOR
            </Link>
            <Link
              href='/community'
              className='py-3 text-sm font-medium tracking-wide text-white hover:opacity-80'
              onClick={() => setIsMenuOpen(false)}
            >
              PHOTOGRAPHY COMMUNITY
            </Link>
            <Link
              href='/businesses'
              className='py-3 text-sm font-medium tracking-wide text-white hover:opacity-80'
              onClick={() => setIsMenuOpen(false)}
            >
              BUSINESSES + BRANDS
            </Link>
            <Link
              href='/features'
              className='py-3 text-sm font-medium tracking-wide text-white hover:opacity-80'
              onClick={() => setIsMenuOpen(false)}
            >
              FEATURES
            </Link>
            <Link
              href='/plans'
              className='py-3 text-sm font-medium tracking-wide text-white hover:opacity-80'
              onClick={() => setIsMenuOpen(false)}
            >
              PLANS + PRICING
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
