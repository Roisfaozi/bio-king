import { cn } from '@/lib/utils';
import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import { ChevronDown } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import { menus } from './../data';
export default function NavMenu() {
  const [offset, setOffset] = React.useState<number | null>(null);
  const [list, setList] = React.useState<HTMLUListElement | null | undefined>();

  const [value, setValue] = React.useState<string | null>();

  const onNodeUpdate = (trigger: any, itemValue: any) => {
    if (trigger && list && value === itemValue) {
      const triggerOffsetLeft = trigger.offsetLeft + trigger.offsetWidth / 6;

      setOffset(Math.round(triggerOffsetLeft));
    } else if (value === '') {
      setOffset(null);
    }
    return trigger;
  };

  return (
    <div>
      <NavigationMenu.Root
        onValueChange={setValue}
        className='group relative z-[9999] justify-start'
      >
        <NavigationMenu.List
          ref={(node) => {
            if (node instanceof HTMLUListElement) {
              setList(node);
            } else {
              setList(null);
            }
          }}
          className='group flex list-none gap-8'
        >
          {menus?.map((item: any, index: number) =>
            item.child ? (
              <NavigationMenu.Item key={`item-${index}`} value={item}>
                <NavigationMenu.Trigger
                  ref={(node) => onNodeUpdate(node, item)}
                  asChild
                  className='flex items-center'
                >
                  <div className='group flex cursor-pointer items-center py-4 data-[state=open]:text-primary'>
                    <span className='text-base font-medium text-default-600'>
                      {item.title}
                    </span>
                    <ChevronDown
                      className='relative top-px ml-1 h-4 w-4 transition duration-200 group-data-[state=open]:rotate-180'
                      aria-hidden='true'
                    />
                  </div>
                </NavigationMenu.Trigger>
                <NavigationMenu.Content
                  className={cn(
                    'w-full rounded-md border bg-popover text-popover-foreground shadow-lg',
                  )}
                >
                  {item.child && (
                    <div className='min-w-[200px] p-4' key={`item-${index}`}>
                      {item.child?.map((childItem: any, index: number) => (
                        <ListItem
                          className='text-base font-medium text-default-600'
                          key={`child-${index}`}
                          title={childItem.title}
                          href={childItem.href}
                          childItem={childItem}
                          target='_blank'
                        ></ListItem>
                      ))}
                    </div>
                  )}
                </NavigationMenu.Content>
              </NavigationMenu.Item>
            ) : (
              <NavigationMenu.Item key={`item-${index}`}>
                <NavigationMenu.Link href={item.href}>
                  <div className='group flex cursor-pointer items-center px-2 py-4 data-[state=open]:text-primary'>
                    <span className='text-base font-medium text-default-600 hover:text-primary'>
                      {item.title}
                    </span>
                  </div>
                </NavigationMenu.Link>
              </NavigationMenu.Item>
            ),
          )}
        </NavigationMenu.List>

        <div className='absolute top-full'>
          <NavigationMenu.Viewport
            style={{
              display: !offset ? 'none' : undefined,
              transform: `translateX(${offset}px)`,
              top: '100%',
              transition: 'all 0.5s ease',
            }}
          />
        </div>
      </NavigationMenu.Root>
    </div>
  );
}

const ListItem = React.forwardRef<HTMLAnchorElement, any>(
  ({ className, children, title, childItem, href, ...props }, forwardedRef) => (
    <NavigationMenu.Link asChild>
      <Link
        href={href}
        className={cn(
          'mb-4 flex select-none items-center gap-2 rounded-md text-base font-medium leading-none text-default-600 no-underline outline-none transition-colors last:mb-0 hover:text-primary focus:text-primary',
          className,
        )}
        {...props}
        ref={forwardedRef}
      >
        <div>{children}</div>
        <div className='capitalize'>{title}</div>
      </Link>
    </NavigationMenu.Link>
  ),
);
ListItem.displayName = 'ListItem';
