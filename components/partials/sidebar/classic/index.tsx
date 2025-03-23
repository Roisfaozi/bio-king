'use client';
import SingleMenuItem from '@/components/partials/sidebar/classic/single-menu-item';
import AddBlock from '@/components/partials/sidebar/common/add-block';
import MenuLabel from '@/components/partials/sidebar/common/menu-label';
import { ScrollArea } from '@/components/ui/scroll-area';
import { menusConfig } from '@/config/menus';
import { cn, getDynamicPath, isLocationMatch, isUserAdmin } from '@/lib/utils';
import { useSidebar, useThemeStore } from '@/store';
import { usePathname, useParams } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import SidebarLogo from '../common/logo';
import { useSession } from 'next-auth/react';
import { Users } from 'lucide-react';

const ClassicSidebar = ({ trans }: { trans: string }) => {
  const { sidebarBg } = useSidebar();
  const [activeSubmenu, setActiveSubmenu] = useState<number | null>(null);
  const [activeMultiMenu, setMultiMenu] = useState<number | null>(null);
  const menus = menusConfig?.sidebarNav?.classic || [];
  const { collapsed, setCollapsed } = useSidebar();
  const { isRtl } = useThemeStore();
  const [hovered, setHovered] = useState<boolean>(false);
  const { data: session } = useSession();
  const params = useParams();
  const lang = (params?.lang as string) || 'id';
  const [adminMenus, setAdminMenus] = useState<any[]>([]);

  const isAdmin = session?.user ? isUserAdmin(session.user) : false;

  useEffect(() => {
    // Tambahkan menu admin jika user adalah admin
    if (isAdmin) {
      setAdminMenus([
        {
          isHeader: true,
          title: 'admin',
        },
        {
          title: 'Manajemen Pengguna',
          href: `/${lang}/users`,
          icon: Users,
        },
      ]);
    } else {
      setAdminMenus([]);
    }
  }, [isAdmin, lang]);

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

  const pathname = usePathname();
  const locationName = getDynamicPath(pathname);

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
  }, [locationName]);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={cn(
        'fixed top-0 z-[999] h-full border-r bg-card hover:!w-[248px]',
        {
          'w-[248px]': !collapsed,
          'w-[72px]': collapsed,
          'shadow-md': collapsed || hovered,
        },
      )}
    >
      {sidebarBg !== 'none' && (
        <div
          className='absolute left-0 top-0 z-[-1] h-full w-full bg-cover bg-center opacity-[0.07]'
          style={{ backgroundImage: `url(${sidebarBg})` }}
        ></div>
      )}

      <SidebarLogo hovered={hovered} />
      <ScrollArea
        className={cn('sidebar-menu h-[calc(100%-80px)]', {
          'px-4': !collapsed || hovered,
        })}
      >
        <ul
          dir={isRtl ? 'rtl' : 'ltr'}
          className={cn('space-y-1', {
            'space-y-2 text-center': collapsed,
            'text-start': collapsed && hovered,
          })}
        >
          {menus.map((item, i) => (
            <li key={`menu_key_${i}`}>
              {/* single menu  */}

              {item && !item.isHeader && (
                <SingleMenuItem
                  item={item}
                  collapsed={collapsed}
                  hovered={hovered}
                  trans={trans}
                />
              )}

              {/* menu label */}
              {item.isHeader && (!collapsed || hovered) && (
                <MenuLabel item={item} trans={trans} />
              )}
            </li>
          ))}

          {/* Menu admin */}
          {adminMenus.length > 0 &&
            adminMenus.map((item, i) => (
              <li key={`admin_menu_key_${i}`}>
                {item && !item.isHeader && (
                  <SingleMenuItem
                    item={item}
                    collapsed={collapsed}
                    hovered={hovered}
                    trans={trans}
                  />
                )}

                {item.isHeader && (!collapsed || hovered) && (
                  <MenuLabel item={item} trans={trans} />
                )}
              </li>
            ))}
        </ul>
        {!collapsed && (
          <div className='-mx-2'>
            <AddBlock />
          </div>
        )}
      </ScrollArea>
    </div>
  );
};

export default ClassicSidebar;
