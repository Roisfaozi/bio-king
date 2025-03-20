'use client';
import MenuLabel from '@/components/partials/sidebar/common/menu-label';
import SingleMenuItem from '@/components/partials/sidebar/mobile-sidebar/single-menu-item';
import { ScrollArea } from '@/components/ui/scroll-area';
import { menusConfig } from '@/config/menus';
import { cn, isLocationMatch } from '@/lib/utils';
import { useSidebar } from '@/store';
import { usePathname } from 'next/navigation';
import React, { useState } from 'react';
import SidebarLogo from '../common/logo';
const MobileSidebar = ({
  className,
  trans,
}: {
  className?: string;
  trans: any;
}) => {
  const { sidebarBg, mobileMenu, setMobileMenu } = useSidebar();
  const [activeSubmenu, setActiveSubmenu] = useState<number | null>(null);
  const [activeMultiMenu, setMultiMenu] = useState<number | null>(null);
  const menus = menusConfig?.sidebarNav?.classic || [];
  const { collapsed } = useSidebar();

  const toggleSubmenu = (i: number) => {
    if (activeSubmenu === i) {
      setActiveSubmenu(null);
    } else {
      setActiveSubmenu(i);
    }
  };

  const toggleMultiMenu = (subIndex: number) => {
    if (activeMultiMenu === subIndex) {
      setMultiMenu(null);
    } else {
      setMultiMenu(subIndex);
    }
  };
  const locationName = usePathname();

  React.useEffect(() => {
    let subMenuIndex = null;
    let multiMenuIndex = null;
    menus?.map((item: any, i: number) => {
      if (item?.child) {
        item.child.map((childItem: any, j: number) => {
          if (isLocationMatch(childItem.href, locationName)) {
            subMenuIndex = i;
          }
          if (childItem?.multi_menu) {
            childItem.multi_menu.map((multiItem: any, k: number) => {
              if (isLocationMatch(multiItem.href, locationName)) {
                subMenuIndex = i;
                multiMenuIndex = j;
              }
            });
          }
        });
      }
    });
    setActiveSubmenu(subMenuIndex);
    setMultiMenu(multiMenuIndex);
    if (mobileMenu) {
      setMobileMenu(false);
    }
  }, [locationName]);

  return (
    <>
      <div
        className={cn(
          'fixed top-0 z-[9999] h-full w-[248px] bg-card',
          className,
          {
            'invisible -left-[300px] opacity-0': !mobileMenu,
            'visible left-0 opacity-100': mobileMenu,
          },
        )}
      >
        {sidebarBg !== 'none' && (
          <div
            className='absolute left-0 top-0 z-[-1] h-full w-full bg-cover bg-center opacity-[0.07]'
            style={{ backgroundImage: `url(${sidebarBg})` }}
          ></div>
        )}
        <SidebarLogo hovered={collapsed} />
        <ScrollArea
          className={cn('sidebar-menu h-[calc(100%-80px)]', {
            'px-4': !collapsed,
          })}
        >
          <ul
            className={cn('', {
              'space-y-2 text-center': collapsed,
            })}
          >
            {menus.map((item, i) => (
              <li key={`menu_key_${i}`}>
                {/* single menu  */}

                {!item.isHeader && (
                  <SingleMenuItem item={item} collapsed={collapsed} />
                )}

                {/* menu label */}
                {item.isHeader && !collapsed && (
                  <MenuLabel item={item} trans={trans} />
                )}

                {/* sub menu */}
              </li>
            ))}
          </ul>
        </ScrollArea>
      </div>
      {mobileMenu && (
        <div
          onClick={() => setMobileMenu(false)}
          className='overlay fixed inset-0 z-[999] bg-black/60 opacity-100 backdrop-blur-sm'
        ></div>
      )}
    </>
  );
};

export default MobileSidebar;
