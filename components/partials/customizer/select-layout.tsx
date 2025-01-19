import React from 'react';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { themes } from '@/config/thems';
import { useThemeStore } from '@/store';
import { useTheme } from 'next-themes';
import { VerticalSvg, HorizontalSvg, SemiBoxSvg } from '@/components/svg';

import { Icon } from '@iconify/react';
const layoutOptions = [
  {
    key: 'vertical',
    label: 'Vertical',
    svg: (
      <VerticalSvg className='[&>circle]:fill-default-400 [&>path]:fill-default-400 [&>rect]:fill-default-300' />
    ),
  },
  {
    key: 'horizontal',
    label: 'Horizontal',
    svg: (
      <HorizontalSvg className='[&>circle]:fill-default-400 [&>path]:fill-default-400 [&>rect]:fill-default-300' />
    ),
  },
  {
    key: 'semibox',
    label: 'Semi-Box',
    svg: (
      <SemiBoxSvg className='[&>circle]:fill-default-400 [&>path]:fill-default-400 [&>rect]:fill-default-300' />
    ),
  },
];

const SelectLayout = () => {
  const { layout, setLayout } = useThemeStore();
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
        Layout
      </div>
      <div className='mb-4 text-xs font-normal text-muted-foreground'>
        Choose your layout
      </div>
      <div className='grid grid-cols-3 gap-3'>
        {layoutOptions.map((layoutOption) => (
          <div key={layoutOption.key}>
            <button
              onClick={() => setLayout(layoutOption.key)}
              className={cn('relative block h-[72px] w-full rounded border', {
                'border-[--theme-primary] text-[--theme-primary]':
                  layout === layoutOption.key,
                'border-border text-muted-foreground':
                  layout !== layoutOption.key,
              })}
            >
              {layout === layoutOption.key && (
                <Icon
                  icon='heroicons:check-circle-20-solid'
                  className='absolute right-1 top-1 text-[--theme-primary]'
                />
              )}
              {layoutOption.svg}
            </button>

            <Label className='mt-2 block font-normal text-muted-foreground'>
              {layoutOption.label}
            </Label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SelectLayout;
