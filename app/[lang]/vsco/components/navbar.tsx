'use client';

import { Button } from '@/components/ui/button';
import {
  BookOpen,
  Crown,
  Globe,
  Plus,
  Search,
  Target,
  User,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const [isMobile, setIsMobile] = useState(false);
  const searchParams = useSearchParams();
  const shortcode = searchParams.get('shortcode');

  // Debugging lebih detail untuk masalah shortcode null
  useEffect(() => {
    // Log URL lengkap untuk debugging
    if (typeof window !== 'undefined') {
      console.log('Current URL:', window.location.href);
    }
  }, [pathname, searchParams, shortcode]);

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);

    return () => {
      window.removeEventListener('resize', checkIfMobile);
    };
  }, []);

  // Fungsi helper untuk membuat URL dengan query string
  const createUrl = (path: string) => {
    // Lebih aman: verifikasi terlebih dahulu jika shortcode ada dan tidak kosong
    if (shortcode && shortcode.trim() !== '') {
      const url = `${path}?shortcode=${encodeURIComponent(shortcode)}`;
      return url;
    }
    return path;
  };

  // Handlers untuk navigasi ke halaman login/signup
  const openLoginPage = () => {
    const url = createUrl('/vsco/user/login');
    console.log('Navigating to login with URL:', url);

    // Tambahkan parameter di sini secara manual jika perlu

    router.push(url);
  };

  const openSignupPage = () => {
    const url = createUrl('/vsco/user/signup');

    // Tambahkan parameter di sini secara manual jika perlu

    router.push(url);
  };

  if (isMobile) {
    return (
      <div className='fixed bottom-0 left-0 right-0 z-50 flex w-full justify-between bg-[#111] p-4 md:hidden'>
        <Link
          href={createUrl('/vsco')}
          className='flex items-center space-x-2 text-white'
        >
          <svg
            width='24'
            height='24'
            viewBox='0 0 24 24'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20Z'
              fill='white'
            />
            <path
              d='M12 11C11.45 11 11 11.45 11 12C11 12.55 11.45 13 12 13C12.55 13 13 12.55 13 12C13 11.45 12.55 11 12 11Z'
              fill='white'
            />
            <path
              d='M7 11C6.45 11 6 11.45 6 12C6 12.55 6.45 13 7 13C7.55 13 8 12.55 8 12C8 11.45 7.55 11 7 11Z'
              fill='white'
            />
            <path
              d='M17 11C16.45 11 16 11.45 16 12C16 12.55 16.45 13 17 13C17.55 13 18 12.55 18 12C18 11.45 17.55 11 17 11Z'
              fill='white'
            />
          </svg>
          <span className='text-lg font-bold'>VSCO</span>
        </Link>
        <div className='flex space-x-2'>
          <button
            onClick={openSignupPage}
            className='rounded-full bg-white px-3 py-2 text-sm font-medium text-black transition-colors hover:bg-gray-200'
          >
            SIGN UP
          </button>
          <button
            onClick={openLoginPage}
            className='rounded-full border border-gray-700 px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-gray-800'
          >
            LOG IN
          </button>
        </div>
      </div>
    );
  }

  return (
    <aside className='fixed bottom-0 left-0 top-0 z-50 hidden w-[164px] flex-col justify-between bg-[#111] md:flex'>
      <div className='flex flex-col'>
        {/* Logo */}
        <div className='p-6'>
          <Link
            href={createUrl('/vsco')}
            className='flex items-center space-x-2 text-white'
          >
            <svg
              width='24'
              height='24'
              viewBox='0 0 24 24'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20Z'
                fill='white'
              />
              <path
                d='M12 11C11.45 11 11 11.45 11 12C11 12.55 11.45 13 12 13C12.55 13 13 12.55 13 12C13 11.45 12.55 11 12 11Z'
                fill='white'
              />
              <path
                d='M7 11C6.45 11 6 11.45 6 12C6 12.55 6.45 13 7 13C7.55 13 8 12.55 8 12C8 11.45 7.55 11 7 11Z'
                fill='white'
              />
              <path
                d='M17 11C16.45 11 16 11.45 16 12C16 12.55 16.45 13 17 13C17.55 13 18 12.55 18 12C18 11.45 17.55 11 17 11Z'
                fill='white'
              />
            </svg>
            <span className='text-lg font-bold'>VSCO</span>
          </Link>
        </div>

        {/* Navigation Items */}
        <nav className='mt-8'>
          <ul className='space-y-6'>
            <li>
              <Link
                href='#'
                className='flex items-center px-6 py-2 text-gray-300 hover:text-white'
              >
                <Globe className='mr-3 h-5 w-5' />
                <span className='font-medium uppercase'>FEED</span>
              </Link>
            </li>
            <li>
              <Link
                href='#'
                className='flex items-center px-6 py-2 text-gray-300 hover:text-white'
              >
                <Target className='mr-3 h-5 w-5' />
                <span className='font-medium uppercase'>STUDIO</span>
                <svg
                  className='ml-2 h-3 w-3'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M14 5l7 7m0 0l-7 7m7-7H3'
                  />
                </svg>
              </Link>
            </li>
            <li>
              <Link
                href='#'
                className='flex items-center px-6 py-2 text-gray-300 hover:text-white'
              >
                <Plus className='mr-3 h-5 w-5' />
                <span className='font-medium uppercase'>CANVAS</span>
                <svg
                  className='ml-2 h-3 w-3'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M14 5l7 7m0 0l-7 7m7-7H3'
                  />
                </svg>
              </Link>
            </li>
            <li>
              <Link
                href='#'
                className='flex items-center px-6 py-2 text-gray-300 hover:text-white'
              >
                <User className='mr-3 h-5 w-5' />
                <span className='font-medium uppercase'>PROFILE</span>
              </Link>
            </li>
            <li>
              <Link
                href='#'
                className='flex items-center px-6 py-2 text-gray-300 hover:text-white'
              >
                <Search className='mr-3 h-5 w-5' />
                <span className='font-medium uppercase'>SEARCH</span>
              </Link>
            </li>
            <li>
              <Link
                href='#'
                className='flex items-center px-6 py-2 text-gray-300 hover:text-white'
              >
                <BookOpen className='mr-3 h-5 w-5' />
                <span className='font-medium uppercase'>LEARN</span>
              </Link>
            </li>
            <li>
              <Link
                href='#'
                className='flex items-center px-6 py-2 text-gray-300 hover:text-white'
              >
                <Crown className='mr-3 h-5 w-5' />
                <span className='font-medium uppercase'>HUB</span>
                <svg
                  className='ml-2 h-3 w-3'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M14 5l7 7m0 0l-7 7m7-7H3'
                  />
                </svg>
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      {/* Login/Signup Buttons */}
      <div className='space-y-2 p-4'>
        <Button
          className='w-full rounded-full bg-white px-3 py-2 text-sm font-medium text-black transition-colors hover:bg-gray-200'
          asChild
          onClick={(e) => {
            // Jika shortcode null, tambahkan parameter secara manual
            if (!shortcode) {
              e.preventDefault();
              openSignupPage();
            }
          }}
        >
          <Link href={createUrl('/vsco/user/signup')}>SIGN UP</Link>
        </Button>
        <Button
          className='w-full rounded-full border border-gray-700 bg-transparent px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-gray-800'
          asChild
          onClick={(e) => {
            // Jika shortcode null, tambahkan parameter secara manual
            if (!shortcode) {
              e.preventDefault();
              openLoginPage();
            }
          }}
        >
          <Link href={createUrl('/vsco/user/login')}>LOG IN</Link>
        </Button>
      </div>
    </aside>
  );
}
