import React, { useEffect, useState } from 'react';
import { cn, isLocationMatch, getDynamicPath, translate } from '@/lib/utils';
import { menusConfig, ModernNavType } from '@/config/menus';
import SingleIconMenu from './single-icon-menu';
import { useRouter, usePathname } from 'next/navigation';
import { useSidebar, useThemeStore } from '@/store';
import MenuItem from './menu-item';
import NestedMenus from './nested-menus';
import Image from 'next/image';
import Link from 'next/link';
import FooterMenu from './footer-menu';
import { SiteLogo } from '@/components/svg';
import { ScrollArea } from '@/components/ui/scroll-area';
import LogoutFooter from './logout-footer';
import { useMediaQuery } from '@/hooks/use-media-query';
import MenuOverlayPortal from './MenuOverlayPortal';
import { ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

const ModuleSidebar = ({ trans }: { trans: any }) => {
  const menus = menusConfig?.sidebarNav?.modern || [];
  const { subMenu, setSubmenu, collapsed, setCollapsed, sidebarBg } =
    useSidebar();
  const { isRtl } = useThemeStore();
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [currentSubMenu, setCurrentSubMenu] = useState<any[]>([]);
  const [nestedIndex, setNestedIndex] = useState<number | null>(null);
  const [multiNestedIndex, setMultiNestedIndex] = useState<number | null>(null);
  // mobile menu overlay
  const [menuOverlay, setMenuOverlay] = useState<boolean>(false);
  const isDesktop = useMediaQuery('(min-width: 1280px)');
  const isMobile = useMediaQuery('(min-width: 768px)');

  // location

  const pathname = usePathname();
  const locationName = getDynamicPath(pathname);

  const toggleSubMenu = (index: number) => {
    setActiveIndex(index);
    if (menus[index].child) {
      setCurrentSubMenu(menus[index].child);
      setSubmenu(false);
      setCollapsed(false);
      if (!isDesktop) {
        setMenuOverlay(true);
      }
    } else {
      setSubmenu(true);
      setCollapsed(true);

      if (!isDesktop) {
        // when location match need to close the sub menu
        if (isLocationMatch(menus[index].title, locationName)) {
          setSubmenu(false);
        }
      }
    }
  };
  // for second level  menu
  const toggleNested = (subIndex: number) => {
    if (nestedIndex === subIndex) {
      setNestedIndex(null);
    } else {
      setNestedIndex(subIndex);
    }
  };

  // for third level menu
  const toggleMultiNested = (index: number) => {
    if (multiNestedIndex === index) {
      setMultiNestedIndex(null);
    } else {
      setMultiNestedIndex(index);
    }
  };

  function setActiveMenu(menuIndex: number, childMenu: any) {
    setActiveIndex(menuIndex);
    setCurrentSubMenu(childMenu);
    setSubmenu(false);
    setCollapsed(false);
  }
  function setActiveNestedMenu(
    menuIndex: number,
    nestedMenuIndex: number,
    childMenu: any,
  ) {
    setActiveIndex(menuIndex);
    setNestedIndex(nestedMenuIndex);
    setCurrentSubMenu(childMenu);
    setSubmenu(false);
    setCollapsed(false);
  }
  //
  const getMenuTitle = () => {
    if (activeIndex !== null) {
      return menus[activeIndex].title;
    }
    return '';
  };

  useEffect(() => {
    let isMenuMatched = false;
    menus.forEach((item: any, i: number) => {
      if (item?.href) {
        if (isLocationMatch(item.href, locationName)) {
          isMenuMatched = true;
          setSubmenu(true);
          setCollapsed(true);
          setMenuOverlay(false);
        }
      }

      item?.child?.forEach((childItem: any, j: number) => {
        if (isLocationMatch(childItem.href, locationName)) {
          setActiveMenu(i, item.child);
          setMenuOverlay(false);
          isMenuMatched = true;
        }

        if (childItem.nested) {
          childItem.nested.forEach((nestedItem: any) => {
            if (isLocationMatch(nestedItem.href, locationName)) {
              setActiveNestedMenu(i, j, item.child);
              setMenuOverlay(false);
              isMenuMatched = true;
            }
            if (nestedItem.child) {
              nestedItem.child.forEach((multiItem: any, k: number) => {
                if (isLocationMatch(multiItem.href, locationName)) {
                  setActiveNestedMenu(i, j, item.child);
                  setMenuOverlay(false);
                  isMenuMatched = true;
                }
              });
            }
          });
        }
      });
    });
    if (!isMenuMatched) {
      setSubmenu(false);
    }
    if (!isDesktop) {
      setSubmenu(true);
    }
  }, [locationName, isDesktop]);

  return (
    <>
      <div className='main-sidebar pointer-events-none fixed start-0 top-0 z-[60] flex h-full print:hidden xl:z-10'>
        <div
          className={cn(
            'pointer-events-auto relative z-20 flex h-full w-[72px] flex-col border-r border-dashed border-default-200 bg-card transition-all duration-300 dark:border-default-300',
            {
              'ltr:-translate-x-full rtl:translate-x-full ltr:xl:translate-x-0 rtl:xl:translate-x-0':
                !collapsed && subMenu,
              'translate-x-0': collapsed,
            },
          )}
        >
          <div className='pt-4'>
            <Link href='/dashboard'>
              <SiteLogo className='mx-auto h-8 w-8 text-primary' />
            </Link>
          </div>
          {/* end logo */}
          <ScrollArea className='grow pt-6'>
            {menus.map((item, i) => (
              <div
                key={i}
                onClick={() => toggleSubMenu(i)}
                className='mb-3 last:mb-0'
              >
                <SingleIconMenu
                  index={i}
                  activeIndex={activeIndex}
                  item={item}
                  locationName={locationName}
                  trans={trans}
                />
              </div>
            ))}
          </ScrollArea>
          <FooterMenu />
        </div>
        {/* end small menu */}

        <div
          className={cn(
            'pointer-events-auto relative z-10 flex h-full w-[228px] flex-col border-r border-default-200 bg-card transition-all duration-300',
            {
              'translate-x-[calc(-100%_-_72px)] rtl:translate-x-[calc(100%_+_72px)]':
                collapsed || subMenu,
            },
          )}
        >
          {sidebarBg !== 'none' && (
            <div
              className='absolute left-0 top-0 z-[-1] h-full w-full bg-cover bg-center opacity-[0.07]'
              style={{ backgroundImage: `url(${sidebarBg})` }}
            ></div>
          )}
          <h2 className='sticky top-0 z-50 flex items-center gap-4 bg-transparent p-4 text-lg font-semibold capitalize text-default-700'>
            <span className='block'>{translate(getMenuTitle(), trans)}</span>
            {!isDesktop && (
              <Button
                size='icon'
                variant='ghost'
                onClick={() => {
                  setCollapsed(true);
                  setSubmenu(true);
                  setMenuOverlay(false);
                }}
                className='h-8 w-8 rounded-full'
              >
                <ChevronLeft className='h-5 w-5' />
              </Button>
            )}
          </h2>
          <ScrollArea className='h-[calc(100%-40px)] grow'>
            <div className='px-4' dir={isRtl ? 'rtl' : 'ltr'}>
              <ul>
                {currentSubMenu?.map((childItem, j) => (
                  <li key={j} className='mb-1.5 last:mb-0'>
                    <MenuItem
                      trans={trans}
                      childItem={childItem}
                      toggleNested={toggleNested}
                      index={j}
                      nestedIndex={nestedIndex}
                      locationName={locationName}
                    />
                    <NestedMenus
                      index={j}
                      nestedIndex={nestedIndex}
                      nestedMenus={childItem.nested}
                      locationName={locationName}
                      toggleMulti={toggleMultiNested}
                      multiIndex={multiNestedIndex}
                      trans={trans}
                    />
                  </li>
                ))}
              </ul>
            </div>
          </ScrollArea>
          <LogoutFooter />
        </div>
        {/* end main panel */}
      </div>
      {!isDesktop && (
        <MenuOverlayPortal
          isOpen={menuOverlay || collapsed}
          onClose={() => {
            setMenuOverlay(false);
            setSubmenu(true);
            setCollapsed(false);
          }}
        />
      )}
    </>
  );
};

export default ModuleSidebar;
