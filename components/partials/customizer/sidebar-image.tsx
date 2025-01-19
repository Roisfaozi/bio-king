import React, { useState, useEffect } from 'react';
import { useSidebar, useThemeStore } from '@/store';
import { Check, Upload, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { themes } from '@/config/thems';
import { Icon } from '@iconify/react';
import { useTheme } from 'next-themes';
import { hslToHex, hexToRGB } from '@/lib/utils';
const SidebarImage = () => {
  const { sidebarBg, setSidebarBg } = useSidebar();
  const [selectedFiles, setSelectedFiles] = useState([
    '/images/all-img/img-2.jpeg',
    '/images/all-img/img-1.jpeg',
  ]);
  const { theme: mode } = useTheme();
  const { theme: config, setTheme: setConfig } = useThemeStore();
  const newTheme = themes.find((theme) => theme.name === config);

  const handleFileChange = (e: any) => {
    const file = e.target.files[0];
    setSelectedFiles([...selectedFiles, URL.createObjectURL(file)]);
  };

  const handleClear = () => {
    setSidebarBg('none');
  };
  const hslPrimary = `hsla(${
    newTheme?.cssVars[mode === 'dark' ? 'dark' : 'light'].primary
  })`;

  const hexPrimary = hslToHex(hslPrimary);

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
      <div className='relative mb-2 inline-block rounded px-3 py-[3px] text-xs font-medium text-[--theme-primary] before:absolute before:left-0 before:top-0 before:z-[-1] before:h-full before:w-full before:rounded before:bg-[--theme-primary] before:opacity-10'>
        Sidebar Image
      </div>
      <div className='mb-4 text-xs font-normal text-muted-foreground'>
        Choose a image of Sidebar.
      </div>
      <div className='grid grid-cols-7 gap-3'>
        <button
          onClick={handleClear}
          className='flex h-[72px] items-center justify-center rounded border border-border text-default-400'
        >
          {sidebarBg === 'none' ? (
            <Icon icon='heroicons:check' className='h-6 w-6' />
          ) : (
            <Icon icon='heroicons:x-mark' className='h-6 w-6' />
          )}
        </button>
        {selectedFiles.map((file, index) => (
          <button
            key={index}
            onClick={() => setSidebarBg(file)}
            className={cn(
              'relative h-[72px] rounded bg-cover bg-no-repeat bg-blend-multiply',
              {
                'custom-bg-opacity': sidebarBg === file,
                '': sidebarBg !== file,
              },
            )}
            style={{
              backgroundImage: `url(${file})`,
              backgroundColor:
                sidebarBg === file ? hexToRGB(hexPrimary, 0.5) : 'transparent',
            }}
          >
            {sidebarBg === file && (
              <Icon
                icon='heroicons:check-circle-20-solid'
                className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-primary-foreground'
              />
            )}
          </button>
        ))}
        <label className='flex h-[72px] items-center justify-center rounded border border-border bg-border text-muted-foreground'>
          <input type='file' className='hidden' onChange={handleFileChange} />

          <Icon icon='heroicons:cloud-arrow-up' className='h-5 w-5' />
        </label>
      </div>
    </div>
  );
};

export default SidebarImage;
