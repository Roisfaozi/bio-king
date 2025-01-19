'use client';

import * as React from 'react';
import { useTheme } from 'next-themes';
import { cn } from '@/lib/utils';
import { Label } from '@/components/ui/label';
import { Icon } from '@iconify/react';

import { useThemeStore } from '@/store';
import { useRouter, usePathname } from 'next/navigation';

const RtlSwitcher = () => {
  const router = useRouter();
  const { isRtl, setRtl } = useThemeStore();
  const pathname = usePathname();

  const handleDirectionChange = (rtl: boolean) => {
    if (pathname) {
      const lang = rtl ? 'ar' : 'en';
      setRtl(rtl);
      router.push(`/${lang}/${pathname.split('/')[2]}`);
    }
  };

  return (
    <div>
      <div className='relative mb-2 inline-block rounded-md px-3 py-[3px] text-xs font-medium text-[--theme-primary] before:absolute before:left-0 before:top-0 before:z-[-1] before:h-full before:w-full before:rounded before:bg-primary before:opacity-10'>
        Direction
      </div>
      <div className='mb-4 text-xs font-normal text-muted-foreground'>
        Choose your direction
      </div>
      <div className='grid grid-cols-2 gap-3'>
        <button
          className={cn(
            'relative flex w-full items-center justify-center rounded border px-10 py-[14px] text-center text-default-400',
            {
              'border-primary text-primary': !isRtl,
            },
          )}
          onClick={() => handleDirectionChange(false)}
        >
          Ltr
        </button>
        <button
          className={cn(
            'relative flex w-full items-center justify-center rounded border px-10 py-[14px] text-center',
            {
              'border-primary text-primary': isRtl,
            },
          )}
          onClick={() => handleDirectionChange(true)}
        >
          Rtl
        </button>
      </div>
    </div>
  );
};

export default RtlSwitcher;
