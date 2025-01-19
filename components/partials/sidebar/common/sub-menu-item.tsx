'use client';
import { cn, isLocationMatch, translate, getDynamicPath } from '@/lib/utils';
import React from 'react';

import { Badge } from '@/components/ui/badge';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
function LockLink({
  href,
  children,
  subItem,
  trans,
}: {
  href: string;
  children: React.ReactNode;
  subItem: any;
  trans: any;
}) {
  if (subItem.badge) {
    return (
      <span className='flex cursor-not-allowed items-center space-x-3 text-sm opacity-50 transition-all duration-150'>
        <span
          className={`inline-block h-2 w-2 flex-none rounded-full border border-default-600`}
        ></span>
        <div className='flex flex-1 truncate text-default-600'>
          <div className='flex-1 truncate'>
            {translate(subItem.title, trans)}
          </div>
          <Badge className='leading-0 flex-none px-1 text-xs font-normal capitalize'>
            {subItem.badge}
          </Badge>
        </div>
      </span>
    );
  } else {
    return <Link href={href}>{children}</Link>;
  }
}

const SubMenuItem = ({ subItem, trans }: { subItem: any; trans: any }) => {
  const pathname = usePathname();
  const locationName = getDynamicPath(pathname);
  return (
    <LockLink href={subItem.href} subItem={subItem} trans={trans}>
      <div
        className={cn(
          'flex items-center gap-3 rounded text-sm font-normal capitalize transition-all duration-150 dark:hover:text-primary',
          {
            'text-primary': isLocationMatch(subItem.href, locationName),
            'text-default-600 dark:text-default-700': !isLocationMatch(
              subItem.href,
              locationName,
            ),
          },
        )}
      >
        <span className='flex-1 truncate'>
          {translate(subItem.title, trans)}
        </span>
      </div>
    </LockLink>
  );
};

export default SubMenuItem;
