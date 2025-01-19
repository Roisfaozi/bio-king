'use client';
import React from 'react';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useSidebar } from '@/store';
const MobileMenuHandler = () => {
  const { mobileMenu, setMobileMenu } = useSidebar();
  return (
    <div>
      <Button
        onClick={() => setMobileMenu(!mobileMenu)}
        variant='ghost'
        size='icon'
        className='relative h-9 w-9 rounded-full text-default-500 hover:bg-primary-100 hover:text-primary dark:text-default-800 dark:hover:bg-default-300'
      >
        <Menu className='h-5 w-5' />
      </Button>
    </div>
  );
};

export default MobileMenuHandler;
