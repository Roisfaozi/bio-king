'use client';

import { Logo } from '@/components/landing-page/partials/logo';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className='w-full border-t bg-background/80 backdrop-blur-sm'>
      <div className='container px-4 py-12 md:px-6'>
        <div className='grid gap-8 md:grid-cols-2 lg:grid-cols-4'>
          <div className='space-y-4'>
            <Logo />
            <p className='text-sm text-muted-foreground'>
              Powerful bio link platform for creators and businesses. Create,
              customize, and track your bio link page.
            </p>
            <div className='flex space-x-4'>
              {['twitter', 'facebook', 'instagram', 'linkedin'].map(
                (social) => (
                  <Link
                    key={social}
                    href='#'
                    className='text-muted-foreground hover:text-foreground'
                  >
                    <span className='sr-only'>{social}</span>
                    <div className='size-8 flex items-center justify-center rounded-full border'>
                      <span className='text-xs'>
                        {social.charAt(0).toUpperCase()}
                      </span>
                    </div>
                  </Link>
                ),
              )}
            </div>
          </div>
          <div className='space-y-4'>
            <h3 className='text-sm font-medium'>Product</h3>
            <ul className='space-y-2 text-sm'>
              {[
                'Features',
                'Pricing',
                'Integrations',
                'Enterprise',
                'Security',
              ].map((item) => (
                <li key={item}>
                  <Link
                    href='#'
                    className='text-muted-foreground hover:text-foreground'
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className='space-y-4'>
            <h3 className='text-sm font-medium'>Resources</h3>
            <ul className='space-y-2 text-sm'>
              {[
                'Blog',
                'Documentation',
                'Guides',
                'API Reference',
                'Status',
              ].map((item) => (
                <li key={item}>
                  <Link
                    href='#'
                    className='text-muted-foreground hover:text-foreground'
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className='space-y-4'>
            <h3 className='text-sm font-medium'>Company</h3>
            <ul className='space-y-2 text-sm'>
              {['About', 'Careers', 'Contact', 'Terms', 'Privacy'].map(
                (item) => (
                  <li key={item}>
                    <Link
                      href='#'
                      className='text-muted-foreground hover:text-foreground'
                    >
                      {item}
                    </Link>
                  </li>
                ),
              )}
            </ul>
          </div>
        </div>
        <div className='mt-8 flex flex-col items-center gap-2 border-t py-6 sm:flex-row'>
          <p className='text-xs text-muted-foreground'>
            © {new Date().getFullYear()} Bio King. All rights reserved.
          </p>
          <nav className='flex gap-4 sm:ml-auto sm:gap-6'>
            <Link
              href='#'
              className='text-xs underline-offset-4 hover:underline'
            >
              Terms of Service
            </Link>
            <Link
              href='#'
              className='text-xs underline-offset-4 hover:underline'
            >
              Privacy Policy
            </Link>
            <Link
              href='#'
              className='text-xs underline-offset-4 hover:underline'
            >
              Cookie Policy
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
