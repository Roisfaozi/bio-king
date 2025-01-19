import { useThemeStore } from '@/store';
import { cn } from '@/lib/utils';
import React from 'react';
import { themes } from '@/config/thems';
import { useTheme } from 'next-themes';
import { Check } from 'lucide-react';
import { useSelectedLayoutSegment } from 'next/navigation';
import {
  TooltipProvider,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';

const ThemeChange = () => {
  const { theme, setTheme } = useThemeStore();
  const { resolvedTheme: mode } = useTheme();
  const newTheme = themes.find((t) => t.name === theme);

  const handleThemeChange = (event: any) => {
    setTheme(event.target.value);
  };

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
        Theme
      </div>
      <div className='mb-4 text-xs font-normal text-muted-foreground'>
        Choose a Theme
      </div>
      <div className='flex flex-wrap'>
        {[
          'zinc',
          'slate',
          'stone',
          'gray',
          'neutral',
          'red',
          'rose',
          'orange',
          'blue',
          'yellow',
          'violet',
        ].map((value) => {
          const themeObj = themes.find((theme) => theme.name === value);
          const isActive = theme === value; // Compare theme.name with value
          return (
            <TooltipProvider key={value}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <label>
                    <input
                      type='radio'
                      className='hidden'
                      value={value}
                      checked={theme === value} // Compare theme with value
                      onChange={handleThemeChange}
                    />
                    <div
                      className={cn(
                        'flex h-9 w-9 items-center justify-center rounded-full border-2 text-xs',
                        isActive
                          ? 'border-[--theme-primary]'
                          : 'border-transparent',
                      )}
                      style={
                        {
                          '--theme-primary': `hsl(${
                            themeObj?.activeColor[
                              mode === 'dark' ? 'dark' : 'light'
                            ]
                          })`,
                        } as React.CSSProperties
                      }
                    >
                      <div
                        className={cn(
                          'flex h-6 w-6 items-center justify-center rounded-full bg-[--theme-primary]',
                        )}
                      >
                        {isActive && (
                          <Check className='h-4 w-4 text-primary-foreground' />
                        )}
                      </div>
                    </div>
                  </label>
                </TooltipTrigger>
                <TooltipContent
                  align='center'
                  className='rounded-[0.5rem] bg-zinc-900 capitalize text-zinc-50'
                >
                  {value}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          );
        })}
      </div>
    </div>
  );
};

export default ThemeChange;
