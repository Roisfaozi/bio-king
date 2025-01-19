'use client';
import Image from 'next/image';
import lightImage from '@/public/images/error/light-404.png';
import darkImage from '@/public/images/error/dark-404.png';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useTheme } from 'next-themes';
const ErrorBlock = () => {
  const { theme } = useTheme();
  return (
    <div className='flex min-h-screen items-center justify-center overflow-y-auto p-10'>
      <div className='flex w-full flex-col items-center'>
        <div className='max-w-[740px]'>
          <Image
            src={theme === 'dark' ? darkImage : lightImage}
            alt='error image'
            className='h-full w-full object-cover'
          />
        </div>
        <div className='mt-16 text-center'>
          <div className='text-2xl font-semibold text-default-900 md:text-4xl lg:text-5xl'>
            Ops! Page Not Found
          </div>
          <div className='mt-3 text-sm text-default-600 md:text-base'>
            The page you are looking for might have been removed had <br /> its
            name changed or is temporarily unavailable.
          </div>
          <Button asChild className='mt-9 md:min-w-[300px]' size='lg'>
            <Link href='/dashboard'>Go to Homepage</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ErrorBlock;
