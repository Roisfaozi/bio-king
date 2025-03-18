'use client';

import { Logo } from '@/components/landing-page/partials/logo';
import Link from 'next/link';

export default function Header() {
  return (
    <header className='sticky top-0 z-50 flex h-16 items-center justify-between border-b bg-background/80 px-4 backdrop-blur-sm lg:px-6'>
      <Logo />
      <nav className='hidden gap-6 md:flex'>
        <Link
          href='/'
          className='text-sm font-medium transition-colors hover:text-primary'
        >
          Home
        </Link>
        <Link
          href='/marketing'
          className='text-sm font-medium transition-colors hover:text-primary'
        >
          Features
        </Link>
        <Link
          href='/pricing'
          className='text-sm font-medium text-primary transition-colors hover:text-primary'
        >
          Pricing
        </Link>
        <Link
          href='#'
          className='text-sm font-medium transition-colors hover:text-primary'
        >
          Blog
        </Link>
      </nav>
      <div className='flex gap-4'>
        <Link
          href='#'
          className='inline-flex h-9 items-center justify-center rounded-md border border-input px-3 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50'
        >
          Log in
        </Link>
        <Link
          href='#'
          className='inline-flex h-9 items-center justify-center rounded-md bg-gradient-primary px-3 text-sm font-medium text-primary-foreground transition-colors hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50'
        >
          Sign up
        </Link>
      </div>
    </header>
  );
}
