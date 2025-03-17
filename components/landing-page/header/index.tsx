'use client';
import { Logo } from '@/components/landing-page/partials/logo';
import ThemeButton from '@/components/partials/header/theme-button';
import { useMediaQuery } from '@/hooks/use-media-query';
import { cn } from '@/lib/utils';
import { ChevronDown, Menu } from 'lucide-react';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { menus } from './../data';
import NavMenu from './nav-menu';
const Header = () => {
  const [scroll, setScroll] = useState<boolean>(false);
  useEffect(() => {
    window.addEventListener('scroll', () => {
      setScroll(window.scrollY > 50);
    });
  }, []);

  const isDesktop = useMediaQuery('(min-width: 1024px)');
  const [open, setOpen] = React.useState<boolean>(false);
  const [show, setShow] = React.useState<boolean>(false);
  if (!isDesktop) {
    return (
      <>
        <header className='shadow-header sticky top-0 z-50 flex h-16 items-center justify-between border-b bg-background/80 px-4 backdrop-blur-sm lg:px-6'>
          <nav className='container relative z-50 flex justify-between !p-0'>
            <Logo />

            <div className='flex items-center gap-2 md:gap-6'>
              <ThemeButton />
              <div className='flex gap-2 md:gap-4'>
                <Link
                  href='/auth/login'
                  className='btn-outline-gradient btn-hover-effect inline-flex h-8 items-center justify-center rounded-md border border-input px-2 text-xs font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 md:h-9 md:px-3 md:text-sm'
                >
                  Log in
                </Link>
                <Link
                  href='/auth/signup'
                  className='shadow-button btn-gradient btn-hover-effect inline-flex h-8 items-center justify-center rounded-md bg-gradient-primary px-2 text-xs font-medium text-primary-foreground transition-colors hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 md:h-9 md:px-3 md:text-sm'
                >
                  Sign up
                </Link>
              </div>
              <button type='button'>
                <Menu
                  className='h-6 w-6 cursor-pointer'
                  onClick={() => setOpen(!open)}
                />
              </button>
            </div>
            {open && (
              <div className='absolute top-full w-full rounded-md bg-background p-4 shadow-md'>
                <ul className='space-y-1.5'>
                  {menus?.map((item, i) =>
                    item.child ? (
                      <div className='space-y-1.5'>
                        <div
                          className='group flex cursor-pointer items-center justify-between pr-4'
                          onClick={() => setShow(!show)}
                        >
                          <span className='text-base font-medium text-default-600'>
                            {item.title}
                          </span>
                          <ChevronDown
                            className={cn(
                              'relative top-[1px] ml-1 h-4 w-4 transition duration-200',
                              {
                                'rotate-180': show,
                              },
                            )}
                          />
                        </div>
                        <ul className='space-y-1.5'>
                          {item.child.map((childItem, index) => (
                            <li
                              className={cn(
                                'block text-base font-medium text-default-600 hover:text-primary',
                                {
                                  hidden: !show,
                                },
                              )}
                              key={`child-item-${index}`}
                            >
                              <a href={childItem.href} target='_blank'>
                                {childItem.title}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ) : (
                      <li
                        key={`main-item-${i}`}
                        className='block text-base font-medium text-default-600 hover:text-primary'
                      >
                        <a href={item.href} onClick={() => setOpen(false)}>
                          {item.title}
                        </a>
                      </li>
                    ),
                  )}
                </ul>
              </div>
            )}
          </nav>
        </header>
      </>
    );
  }
  return (
    <header className='shadow-header sticky top-0 z-50 flex h-16 items-center justify-between border-b bg-card/80 px-4 backdrop-blur-sm lg:px-6'>
      <nav className='container flex justify-between'>
        <Logo />

        <NavMenu />
        <div className='flex items-center gap-2 md:gap-6'>
          <ThemeButton />
          <div className='gap-2 sm:flex md:gap-4'>
            <Link
              href='/auth/login'
              className='btn-outline-gradient btn-hover-effect inline-flex h-8 items-center justify-center rounded-md border border-input px-2 text-xs font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 md:h-9 md:px-3 md:text-sm'
            >
              Log in
            </Link>
            <Link
              href='/auth/signup'
              className='shadow-button btn-gradient btn-hover-effect inline-flex h-8 items-center justify-center rounded-md bg-gradient-primary px-2 text-xs font-medium text-primary-foreground transition-colors hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 md:h-9 md:px-3 md:text-sm'
            >
              Sign up
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
