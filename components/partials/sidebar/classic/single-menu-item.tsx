import React from 'react';

import { Badge } from '@/components/ui/badge';
import { cn, isLocationMatch, translate, getDynamicPath } from '@/lib/utils';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
const SingleMenuItem = ({
  item,
  collapsed,
  hovered,
  trans,
}: {
  item: any;
  collapsed: boolean;
  hovered: boolean;
  trans: any;
}) => {
  const { badge, href, title } = item;

  const pathname = usePathname();
  const locationName = getDynamicPath(pathname);
  return (
    <Link href={href}>
      <>
        {!collapsed || hovered ? (
          <div
            className={cn(
              'group flex cursor-pointer gap-3 rounded px-[10px] py-3 text-sm font-medium capitalize text-default-700 hover:bg-primary hover:text-primary-foreground dark:text-default-950',
              {
                'bg-primary text-primary-foreground': isLocationMatch(
                  href,
                  locationName,
                ),
              },
            )}
          >
            <span className='flex-grow-0'>
              <item.icon className='h-5 w-5' />
            </span>
            <div className='text-box flex-grow'>{translate(title, trans)}</div>
            {badge && <Badge className='rounded'>{item.badge}</Badge>}
          </div>
        ) : (
          <div>
            <span
              className={cn(
                'relative mx-auto inline-flex h-12 w-12 flex-col items-center justify-center rounded-md transition-all duration-300',
                {
                  'bg-primary text-primary-foreground': isLocationMatch(
                    href,
                    locationName,
                  ),
                  'text-default-600': !isLocationMatch(href, locationName),
                },
              )}
            >
              <item.icon className='h-6 w-6' />
            </span>
          </div>
        )}
      </>
    </Link>
  );
};

export default SingleMenuItem;
