'use client';

import logo from '@/public/images/logo/logo-2.png';
import { Facebook, Instagram, Linkedin, Twitter, Youtube } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const FooterSection = () => {
  const socials = [
    {
      link: '/',
      icon: <Twitter />,
    },
    {
      link: '/',
      icon: <Facebook />,
    },
    {
      link: '/',
      icon: <Linkedin />,
    },
    {
      link: '/',
      icon: <Instagram />,
    },
    {
      link: '/',
      icon: <Youtube />,
    },
  ];

  return (
    <footer className='shadow-footer relative w-full border-t bg-background/80 backdrop-blur-sm'>
      <div className='container relative z-10 px-4 py-12 md:px-6'>
        <div className='grid gap-8 md:grid-cols-2 lg:grid-cols-4'>
          <div className='space-y-4'>
            <div className='h-[38px] w-[170px]'>
              <Image
                src={logo}
                alt='Bio King'
                className='h-full w-full object-cover'
                width={600}
                height={500}
              />
            </div>
            <p className='text-sm text-muted-foreground'>
              Powerful bio link platform for creators and businesses. Create,
              customize, and track your bio link page.
            </p>
            <div className='flex space-x-4'>
              {socials.map((social, index) => (
                <Link
                  key={index}
                  href={social.link}
                  className='text-muted-foreground transition-colors hover:text-primary'
                >
                  <div className='size-8 border-glow flex items-center justify-center rounded-full border transition-colors hover:border-primary/50'>
                    {social.icon}
                  </div>
                </Link>
              ))}
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
                    className='text-muted-foreground transition-colors hover:text-primary'
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
                    className='text-muted-foreground transition-colors hover:text-primary'
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
                      className='text-muted-foreground transition-colors hover:text-primary'
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
};

export default FooterSection;
