import React from 'react';
import { Search } from 'lucide-react';
import { SiteLogo } from '@/components/svg';
import Link from 'next/link';
const horizontalHeader = ({
  handleOpenSearch,
}: {
  handleOpenSearch: () => void;
}) => {
  return (
    <div className='flex items-center gap-3 lg:gap-12'>
      <div>
        <Link
          href='/dashboard'
          className='flex items-center gap-2 text-primary'
        >
          <SiteLogo className='h-7 w-7' />
          <span className='hidden text-xl font-semibold lg:inline-block'>
            {' '}
            DashTail
          </span>
        </Link>
      </div>
      <button
        onClick={handleOpenSearch}
        className='mr-2 inline-flex items-center text-sm text-default-600 lg:mr-0 lg:gap-2'
      >
        <span>
          <Search className='h-4 w-4' />
        </span>
        <span className='hidden lg:inline-block'> Search...</span>
      </button>
    </div>
  );
};

export default horizontalHeader;
