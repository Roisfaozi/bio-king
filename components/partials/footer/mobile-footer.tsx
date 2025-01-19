'use client';
import React from 'react';
import ThemeCustomize from '../customizer/theme-customizer';
import { MenuBar, Settings, SiteLogo, DSearch } from '@/components/svg';
import Link from 'next/link';
const MobileFooter = ({
  handleOpenSearch,
}: {
  handleOpenSearch: () => void;
}) => {
  return (
    <footer className='footer-bg fixed bottom-0 left-0 z-50 flex w-full items-center justify-around border-t bg-card bg-no-repeat px-4 py-[12px] shadow-[0_-4px_29px_#9595952b] backdrop-blur-2xl dark:border-none dark:shadow-[0_-4px_29px_#000000cc]'>
      <div className='flex flex-col items-center justify-center'>
        <DSearch
          className='h-6 w-6 cursor-pointer'
          onClick={handleOpenSearch}
        />
        <p className='mb-0 mt-1.5 text-xs text-default-600'>Search</p>
      </div>
      <div className='footer-bg relative z-[-1] -mt-[40px] flex h-[70px] w-[70px] items-center justify-center rounded-full border-t bg-card bg-no-repeat shadow-[0_-4px_10px_#9595952b] backdrop-blur-2xl dark:border-none dark:shadow-[0_-4px_10px_#0000004d]'>
        <div className='custom-dropshadow relative left-0 top-0 flex h-[60px] w-[60px] items-center justify-center rounded-full bg-primary p-3 text-center'>
          <Link href='/dashboard'>
            <SiteLogo className='h-8 w-8 text-primary-foreground' />
          </Link>
        </div>
      </div>
      <div className='flex flex-col items-center justify-center'>
        <ThemeCustomize
          trigger={<Settings className='h-6 w-6 cursor-pointer' />}
        />
        <p className='mb-0 mt-1.5 text-xs text-default-600'>Settings</p>
      </div>
    </footer>
  );
};

export default MobileFooter;
