'use client';

import * as React from 'react';
import { useTheme } from 'next-themes';
import { cn } from '@/lib/utils';
import { Label } from '@/components/ui/label';
import { Icon } from '@iconify/react';
import { themes } from '@/config/thems';
import { useThemeStore } from '@/store';
import { Check } from 'lucide-react';

const allThemes = [
  { key: 'light', label: 'Light', icon: 'heroicons:sun' },
  { key: 'dark', label: 'Dark', icon: 'heroicons:moon' },
];

const SelectTheme = () => {
  const { theme, setTheme, resolvedTheme: mode } = useTheme();
  const { theme: config, setTheme: setConfig } = useThemeStore();
  const newTheme = themes.find((theme) => theme.name === config);

  return (
    <div
      style={
        {
          '--theme-primary': `hsl(${
            newTheme?.cssVars[mode === 'dark' ? 'dark' : 'light'].primary
          })`,
        } as React.CSSProperties
      }
    >
      <div className='relative mb-2 inline-block rounded-md px-3 py-[3px] text-xs font-medium text-[--theme-primary] before:absolute before:left-0 before:top-0 before:z-[-1] before:h-full before:w-full before:rounded before:bg-[--theme-primary] before:opacity-10'>
        Color Scheme
      </div>
      <div className='mb-4 text-xs font-normal text-muted-foreground'>
        Choose Light or Dark Scheme.
      </div>
      <div className='grid grid-cols-2 gap-3'>
        {allThemes?.map((themeOption) => (
          <div key={themeOption.key} className='w-full flex-1'>
            <button
              onClick={() => setTheme(themeOption.key)}
              className={cn(
                'relative flex w-full items-center justify-center rounded border px-10 py-[14px] text-center',
                {
                  'border-[--theme-primary] text-[--theme-primary]':
                    theme === themeOption.key,
                  'text-default-400': theme !== themeOption.key,
                },
              )}
            >
              {theme === themeOption.key && (
                <Icon
                  icon='heroicons:check-circle-20-solid'
                  className='absolute right-1 top-1 text-[--theme-primary]'
                />
              )}
              <div>
                <Icon icon={themeOption.icon} className='h-5 w-5' />
              </div>
            </button>
            <Label className='mt-2 block font-normal text-muted-foreground'>
              {themeOption.label}
            </Label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SelectTheme;
