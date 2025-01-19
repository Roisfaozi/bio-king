'use client';
import React, { useState } from 'react';
import SubMenuItem from '../common/sub-menu-item';
import MultiMenuHandler from '../common/multi-menu-handler';
import MultiNestedMenu from '../common/multi-nested-menu';
import { cn, isLocationMatch, getDynamicPath } from '@/lib/utils';
import { usePathname } from 'next/navigation';

const CollapsedHoverMenu = ({
  item,
  menuTitle,
  trans,
}: {
  item: any;

  menuTitle?: string;
  trans: any;
}) => {
  const [activeMultiMenu, setMultiMenu] = useState<number | null>(null);

  const toggleMultiMenu = (subIndex: number) => {
    if (activeMultiMenu === subIndex) {
      setMultiMenu(null);
    } else {
      setMultiMenu(subIndex);
    }
  };

  const pathname = usePathname();
  const locationName = getDynamicPath(pathname);
  return (
    <>
      {item?.child ? (
        <ul className='relative space-y-2 before:absolute before:left-4 before:top-0 before:h-[calc(100%-5px)] before:w-[2px] before:rounded before:bg-primary/20'>
          <li className='relative flex items-center gap-3 rounded bg-primary p-3 font-medium text-primary-foreground'>
            <item.icon className='h-5 w-5' />
            {menuTitle}
          </li>
          {item.child?.map((subItem: any, j: number) => (
            <li
              className={cn(
                'before: relative top-0 ml-10 block before:absolute before:-left-6 before:h-0 before:w-[2px] before:transition-all before:duration-200 first:pt-4 first:before:top-4',
                {
                  'before:h-full before:bg-primary first:before:h-[calc(100%-16px)]':
                    isLocationMatch(subItem.href, locationName),
                },
              )}
              key={`sub_menu_${j}`}
            >
              {subItem?.multi_menu ? (
                <div>
                  <MultiMenuHandler
                    subItem={subItem}
                    subIndex={j}
                    activeMultiMenu={activeMultiMenu}
                    toggleMultiMenu={toggleMultiMenu}
                    className='before:-left-6'
                    trans={trans}
                  />
                  <div className='pl-3'>
                    <MultiNestedMenu
                      subItem={subItem}
                      subIndex={j}
                      activeMultiMenu={activeMultiMenu}
                      trans={trans}
                    />
                  </div>
                </div>
              ) : (
                <SubMenuItem subItem={subItem} trans={trans} />
              )}
            </li>
          ))}
        </ul>
      ) : (
        <div>no menu</div>
      )}
    </>
  );
};

export default CollapsedHoverMenu;
