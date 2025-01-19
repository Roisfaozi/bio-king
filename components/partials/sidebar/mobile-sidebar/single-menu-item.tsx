import React from 'react';

import { Badge } from '@/components/ui/badge';
import { cn, isLocationMatch } from '@/lib/utils';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
const SingleMenuItem = ({
  item,
  collapsed,
}: {
  item: any;
  collapsed: boolean;
}) => {
  const { badge, href, title } = item;
  const locationName = usePathname();
  return (
    <Link href={href}>
      <>
        {collapsed ? (
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
        ) : (
          <div
            className={cn(
              'flex cursor-pointer gap-3 rounded px-[10px] py-3 text-sm capitalize text-default-700 hover:bg-primary hover:text-primary-foreground',
              {
                'bg-primary text-primary-foreground': isLocationMatch(
                  href,
                  locationName,
                ),
              },
            )}
          >
            <span className='grow-0'>
              <item.icon className='h-5 w-5' />
            </span>
            <div className='text-box grow'>{title}</div>
            {badge && <Badge className='rounded'>{item.badge}</Badge>}
          </div>
        )}
      </>
    </Link>
  );
};

export default SingleMenuItem;
