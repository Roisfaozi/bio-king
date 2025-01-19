import { SiteLogo } from '@/components/svg';
import { useSidebar } from '@/store';
import React from 'react';

const SidebarLogo = ({ hovered }: { hovered?: boolean }) => {
  const { sidebarType, setCollapsed, collapsed } = useSidebar();
  return (
    <div className='p-4'>
      <div className='flex items-center'>
        <div className='flex flex-1 items-center gap-x-3'>
          <SiteLogo className='h-8 w-8 text-primary' />
          {(!collapsed || hovered) && (
            <div className='flex-1 text-xl font-semibold text-primary'>
              DashTail
            </div>
          )}
        </div>
        {sidebarType === 'classic' && (!collapsed || hovered) && (
          <div className='hidden flex-none lg:block'>
            <div
              onClick={() => setCollapsed(!collapsed)}
              className={`h-4 w-4 rounded-full border-[1.5px] border-default-900 transition-all duration-150 dark:border-default-200 ${
                collapsed
                  ? ''
                  : 'bg-default-900 ring-2 ring-inset ring-default-900 ring-offset-4 dark:ring-offset-default-300'
              } `}
            ></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SidebarLogo;
