'use client';
import { Icon } from '@iconify/react';
import { cn, translate } from '@/lib/utils';
import * as HoverCard from '@radix-ui/react-hover-card';
import { ScrollArea } from '@/components/ui/scroll-area';

import CollapsedHoverMenu from './collapsed-hover-menu';

const SubMenuHandler = ({
  item,
  toggleSubmenu,
  index,
  activeSubmenu,
  collapsed,
  menuTitle,
  trans,
}: {
  item: any;
  toggleSubmenu: any;
  index: number;
  activeSubmenu: number | null;
  collapsed: boolean;
  menuTitle?: string;
  trans: any;
}) => {
  const { title } = item;

  return (
    <>
      {collapsed ? (
        <HoverCard.Root>
          <HoverCard.Trigger asChild>
            <div className='inline-flex h-12 w-12 cursor-pointer items-center justify-center rounded-md data-[state=open]:bg-primary-100 data-[state=open]:text-primary'>
              <item.icon className='h-6 w-6' />
            </div>
          </HoverCard.Trigger>
          <HoverCard.Portal>
            <HoverCard.Content
              collisionPadding={70}
              sideOffset={5}
              side='right'
              className='z-50 w-[300px] rounded-md bg-popover shadow-sm data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade data-[side=right]:animate-slideLeftAndFade data-[side=top]:animate-slideDownAndFade data-[state=open]:transition-all'
            >
              <ScrollArea
                className={cn('p-5', {
                  'h-[250px]':
                    item.child.length > 5 ||
                    item.child.some(
                      (childItem: any) =>
                        childItem.multi_menu && childItem.multi_menu.length > 5,
                    ),
                })}
              >
                <CollapsedHoverMenu
                  item={item}
                  menuTitle={menuTitle}
                  trans={trans}
                />
              </ScrollArea>
            </HoverCard.Content>
          </HoverCard.Portal>
        </HoverCard.Root>
      ) : (
        <div
          onClick={() => toggleSubmenu(index)}
          className={cn(
            'group flex cursor-pointer rounded px-[10px] py-3 text-sm font-medium capitalize text-default-700 transition-all duration-100 hover:bg-primary hover:text-primary-foreground',
            {
              'bg-primary text-primary-foreground': activeSubmenu === index,
            },
          )}
        >
          <div className='flex flex-1 items-start gap-3'>
            <span className='inline-flex items-center text-lg'>
              <item.icon className='h-5 w-5' />
            </span>
            <div className=' '>{translate(title, trans)}</div>
          </div>
          <div className='flex-0'>
            <div
              className={cn(
                'flex items-center justify-center rounded-full text-base transition-all duration-300 group-hover:text-primary-foreground',
                {
                  'rotate-90': activeSubmenu === index,
                  'text-default-500': activeSubmenu !== index,
                },
              )}
            >
              <Icon
                icon='heroicons:chevron-right-20-solid'
                className='h-5 w-5'
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SubMenuHandler;
