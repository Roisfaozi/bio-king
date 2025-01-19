import React from 'react';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useSidebar, useThemeStore } from '@/store';
import { themes } from '@/config/thems';
import { useTheme } from 'next-themes';
import { cn } from '@/lib/utils';
import { VerticalSvg, HorizontalSvg, SemiBoxSvg } from '@/components/svg';
import { Icon } from '@iconify/react';
const sidebarOptions = [
  {
    key: 'module',
    label: 'Module',
    disabled: (layout: string) =>
      layout === 'semibox' || layout === 'horizontal',
    svg: (
      <VerticalSvg className='[&>circle]:fill-default-400 [&>path]:fill-default-400 [&>rect]:fill-default-300' />
    ),
  },
  {
    key: 'classic',
    label: 'Classic',
    disabled: (layout: string) => layout === 'semibox',
    svg: (
      <SemiBoxSvg className='[&>circle]:fill-default-400 [&>path]:fill-default-400 [&>rect]:fill-default-300' />
    ),
  },
  {
    key: 'popover',
    label: 'Popover',
    svg: (
      <SemiBoxSvg className='[&>circle]:fill-default-400 [&>path]:fill-default-400 [&>rect]:fill-default-300' />
    ),
  },
];

const SidebarChange = () => {
  const { sidebarType, setSidebarType } = useSidebar();

  const { theme, setTheme, resolvedTheme: mode } = useTheme();
  const { theme: config, setTheme: setConfig, layout } = useThemeStore();
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
        Sidebar Layout
      </div>
      <div className='mb-4 text-xs font-normal text-muted-foreground'>
        Choose your layout
      </div>
      <div className='grid grid-cols-3 gap-3'>
        {sidebarOptions.map((sidebarOption) => (
          <div key={sidebarOption.key}>
            <button
              onClick={() => setSidebarType(sidebarOption.key)}
              disabled={
                sidebarOption.disabled && sidebarOption.disabled(layout)
              }
              className={cn(
                'relative block h-[72px] w-full rounded border disabled:cursor-not-allowed',
                {
                  'border-[--theme-primary] text-[--theme-primary]':
                    sidebarType === sidebarOption.key,
                  'border-border text-muted-foreground':
                    sidebarType !== sidebarOption.key,
                },
              )}
            >
              {sidebarType === sidebarOption.key && (
                <Icon
                  icon='heroicons:check-circle-20-solid'
                  className='absolute right-1 top-1 text-[--theme-primary]'
                />
              )}
              {sidebarOption.svg}
            </button>

            <Label className='mt-2 block font-normal text-muted-foreground'>
              {sidebarOption.label}
            </Label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SidebarChange;
