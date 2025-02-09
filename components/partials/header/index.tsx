'use client';
import { cn } from '@/lib/utils';
import { useSidebar, useThemeStore } from '@/store';
import React from 'react';
import HorizontalHeader from './horizontal-header';
import HorizontalMenu from './horizontal-menu';
import ProfileInfo from './profile-info';
import ThemeButton from './theme-button';
import VerticalHeader from './vertical-header';

import { useMediaQuery } from '@/hooks/use-media-query';
import FullScreen from './full-screen';
import Language from './language';
import ClassicHeader from './layout/classic-header';
import MobileMenuHandler from './mobile-menu-handler';

const NavTools = ({
  isDesktop,
  isMobile,
  sidebarType,
}: {
  isDesktop: boolean;
  isMobile: boolean;
  sidebarType: string;
}) => {
  return (
    <div className='nav-tools flex items-center gap-2'>
      {isDesktop && <Language />}
      {isDesktop && <FullScreen />}

      <ThemeButton />

      <div className='ltr:pl-2 rtl:pr-2'>
        <ProfileInfo />
      </div>
      {!isDesktop && sidebarType !== 'module' && <MobileMenuHandler />}
    </div>
  );
};
const Header = ({
  handleOpenSearch,
  trans,
}: {
  handleOpenSearch: () => void;
  trans: string;
}) => {
  const { collapsed, sidebarType, setCollapsed, subMenu, setSidebarType } =
    useSidebar();
  const { layout, navbarType, setLayout } = useThemeStore();

  const isDesktop = useMediaQuery('(min-width: 1280px)');

  const isMobile = useMediaQuery('(min-width: 768px)');

  // set header style to classic if isDesktop
  React.useEffect(() => {
    if (!isDesktop && layout === 'horizontal') {
      setSidebarType('classic');
    }
  }, [isDesktop]);

  // if horizontal layout
  if (layout === 'horizontal' && navbarType !== 'hidden') {
    return (
      <ClassicHeader
        className={cn(' ', {
          'sticky top-0 z-50': navbarType === 'sticky',
        })}
      >
        <div className='w-full border-b bg-card/90 px-[15px] py-3 backdrop-blur-lg md:px-6'>
          <div className='flex h-full items-center justify-between'>
            <HorizontalHeader handleOpenSearch={handleOpenSearch} />
            <NavTools
              isDesktop={isDesktop}
              isMobile={isMobile}
              sidebarType={sidebarType}
            />
          </div>
        </div>
        {isDesktop && (
          <div className='w-full bg-card/90 px-6 shadow-md backdrop-blur-lg'>
            <HorizontalMenu trans={trans} />
          </div>
        )}
      </ClassicHeader>
    );
  }
  if (layout === 'semibox' && navbarType !== 'hidden') {
    return (
      <ClassicHeader
        className={cn('has-sticky-header rounded-md', {
          'ltr:xl:ml-[72px] rtl:xl:mr-[72px]': collapsed,
          'ltr:xl:ml-[272px] rtl:xl:mr-[272px]': !collapsed,

          'sticky top-6': navbarType === 'sticky',
        })}
      >
        <div className='mx-4 xl:mx-20'>
          <div className='my-6 w-full rounded-md border-b bg-card/90 px-[15px] py-3 shadow-md backdrop-blur-lg md:px-6'>
            <div className='flex h-full items-center justify-between'>
              <VerticalHeader handleOpenSearch={handleOpenSearch} />
              <NavTools
                isDesktop={isDesktop}
                isMobile={isMobile}
                sidebarType={sidebarType}
              />
            </div>
          </div>
        </div>
      </ClassicHeader>
    );
  }
  if (
    sidebarType !== 'module' &&
    navbarType !== 'floating' &&
    navbarType !== 'hidden'
  ) {
    return (
      <ClassicHeader
        className={cn('', {
          'ltr:xl:ml-[248px] rtl:xl:mr-[248px]': !collapsed,
          'ltr:xl:ml-[72px] rtl:xl:mr-[72px]': collapsed,
          'sticky top-0': navbarType === 'sticky',
        })}
      >
        <div className='w-full border-b bg-card/90 px-[15px] py-3 backdrop-blur-lg md:px-6'>
          <div className='flex h-full items-center justify-between'>
            <VerticalHeader handleOpenSearch={handleOpenSearch} />
            <NavTools
              isDesktop={isDesktop}
              isMobile={isMobile}
              sidebarType={sidebarType}
            />
          </div>
        </div>
      </ClassicHeader>
    );
  }
  if (navbarType === 'hidden') {
    return null;
  }
  if (navbarType === 'floating') {
    return (
      <ClassicHeader
        className={cn('has-sticky-header sticky top-6 rounded-md px-6', {
          'ltr:ml-[72px] rtl:mr-[72px]': collapsed,
          'ltr:xl:ml-[300px] rtl:xl:mr-[300px]':
            !collapsed && sidebarType === 'module',
          'ltr:xl:ml-[248px] rtl:xl:mr-[248px]':
            !collapsed && sidebarType !== 'module',
        })}
      >
        <div className='my-6 w-full rounded-md border-b bg-card/90 px-[15px] py-3 shadow-md backdrop-blur-lg md:px-6'>
          <div className='flex h-full items-center justify-between'>
            <VerticalHeader handleOpenSearch={handleOpenSearch} />
            <NavTools
              isDesktop={isDesktop}
              isMobile={isMobile}
              sidebarType={sidebarType}
            />
          </div>
        </div>
      </ClassicHeader>
    );
  }

  return (
    <ClassicHeader
      className={cn('', {
        'ltr:xl:ml-[300px] rtl:xl:mr-[300px]': !collapsed,
        'ltr:xl:ml-[72px] rtl:xl:mr-[72px]': collapsed,

        'sticky top-0': navbarType === 'sticky',
      })}
    >
      <div className='w-full border-b bg-card/90 px-[15px] py-3 backdrop-blur-lg md:px-6'>
        <div className='flex h-full items-center justify-between'>
          <VerticalHeader handleOpenSearch={handleOpenSearch} />
          <NavTools
            isDesktop={isDesktop}
            isMobile={isMobile}
            sidebarType={sidebarType}
          />
        </div>
      </div>
    </ClassicHeader>
  );
};

export default Header;
