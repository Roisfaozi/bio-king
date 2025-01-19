import React from 'react';
import { useSidebar, useThemeStore } from '@/store';
import { cn } from '@/lib/utils';
import { Icon } from '@iconify/react';
import { Search } from 'lucide-react';
import { SiteLogo } from '@/components/svg';
import Link from 'next/link';
import { useMediaQuery } from '@/hooks/use-media-query';

const MenuBar = ({
  collapsed,
  setCollapsed,
}: {
  collapsed: boolean;
  setCollapsed: (value: boolean) => void;
}) => {
  return (
    <button
      className='group relative opacity-50 disabled:cursor-not-allowed'
      onClick={() => setCollapsed(!collapsed)}
    >
      <div>
        <div
          className={cn(
            'flex h-[16px] w-[20px] origin-center transform flex-col justify-between overflow-hidden transition-all duration-300',
            {
              '-translate-x-1.5 rotate-180': collapsed,
            },
          )}
        >
          <div
            className={cn(
              'h-[2px] origin-left transform bg-card-foreground transition-all delay-150 duration-300',
              {
                'w-[11px] rotate-[42deg]': collapsed,
                'w-7': !collapsed,
              },
            )}
          ></div>
          <div
            className={cn(
              'h-[2px] w-7 transform rounded bg-card-foreground transition-all duration-300',
              {
                'translate-x-10': collapsed,
              },
            )}
          ></div>
          <div
            className={cn(
              'h-[2px] origin-left transform bg-card-foreground transition-all delay-150 duration-300',
              {
                'w-[11px] -rotate-[43deg]': collapsed,
                'w-7': !collapsed,
              },
            )}
          ></div>
        </div>
      </div>
    </button>
  );
};

type VerticalHeaderProps = {
  handleOpenSearch: () => void;
};
const VerticalHeader: React.FC<VerticalHeaderProps> = ({
  handleOpenSearch,
}) => {
  const { collapsed, setCollapsed, subMenu, sidebarType } = useSidebar();
  const { layout } = useThemeStore();
  const isDesktop = useMediaQuery('(min-width: 1280px)');
  const isMobile = useMediaQuery('(min-width: 768px)');
  let LogoContent = null;
  let menuBarContent = null;
  let searchButtonContent = null;

  const MainLogo = (
    <Link href='/dashboard' className='text-primary'>
      <SiteLogo className='h-7 w-7' />
    </Link>
  );
  const SearchButton = (
    <div>
      <button
        type='button'
        className='inline-flex items-center gap-2 text-sm text-default-600'
        onClick={handleOpenSearch}
      >
        <span>
          <Search className='h-4 w-4' />
        </span>
        <span className='hidden md:block'> Search...</span>
      </button>
    </div>
  );
  if (layout === 'semibox' && !isDesktop) {
    LogoContent = MainLogo;
  }
  if (
    layout === 'vertical' &&
    !isDesktop &&
    isMobile &&
    sidebarType === 'module'
  ) {
    LogoContent = MainLogo;
  }
  if (layout === 'vertical' && !isDesktop && sidebarType !== 'module') {
    LogoContent = MainLogo;
  }

  // menu bar content condition
  if (isDesktop && sidebarType !== 'module') {
    menuBarContent = (
      <MenuBar collapsed={collapsed} setCollapsed={setCollapsed} />
    );
  }
  if (sidebarType === 'module') {
    menuBarContent = (
      <MenuBar collapsed={collapsed} setCollapsed={setCollapsed} />
    );
  }
  if (sidebarType === 'classic') {
    menuBarContent = null;
  }
  if (subMenu && isDesktop) {
    menuBarContent = null;
  }
  if (sidebarType === 'module' && isMobile) {
    searchButtonContent = SearchButton;
  }
  if (sidebarType === 'classic' || sidebarType === 'popover') {
    searchButtonContent = SearchButton;
  }
  return (
    <>
      <div className='flex items-center gap-3 md:gap-6'>
        {LogoContent}
        {menuBarContent}
        {searchButtonContent}
      </div>
    </>
  );
};

export default VerticalHeader;
