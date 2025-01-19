'use client';
import { useSession, signIn, signOut } from 'next-auth/react';
import { Icon } from '@iconify/react';

import { useState } from 'react';
import AddBlock from '../common/add-block';
const LogoutFooter = () => {
  return (
    <>
      <AddBlock />

      <div className='mt-5 flex items-center gap-3 bg-default-50 px-4 py-2 dark:bg-default-200'>
        <div className='flex-1'>
          <div className='mb-0.5 truncate text-sm font-semibold capitalize text-default-700'>
            Mac Callem
          </div>
          <div className='truncate text-xs text-default-600'>
            dashtail@company.com
          </div>
        </div>
        <div className='flex-none'>
          <button
            type='button'
            onClick={() => signOut()}
            className='inline-flex h-9 w-9 items-center justify-center rounded text-default-500 dark:bg-default-300 dark:text-default-900'
          >
            <Icon
              icon='heroicons:arrow-right-start-on-rectangle-20-solid'
              className='h-5 w-5'
            />
          </button>
        </div>
      </div>
    </>
  );
};

export default LogoutFooter;
