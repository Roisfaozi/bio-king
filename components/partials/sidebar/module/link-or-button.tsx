import React from 'react';
import Link from 'next/link';
import { cn, isLocationMatch } from '@/lib/utils';
import { ChevronRight } from 'lucide-react';
const LinkButton = ({
  children,
  item,
  toggleMulti,
  index,
  locationName,
  multiIndex,
}: {
  children: React.ReactNode;
  item: any;
  toggleMulti: any;
  index: number;
  locationName: string;
  multiIndex: number | null;
}) => {
  return (
    <>
      {item.child ? (
        <button
          type='button'
          onClick={() => toggleMulti(index)}
          className={cn(
            'before: relative top-0 flex w-full items-center justify-between before:absolute before:-left-[14px] before:h-0 before:w-[2px] before:transition-all before:duration-200',
            {
              'rounded text-primary before:h-full before:bg-primary':
                multiIndex === index,
            },
          )}
        >
          <span>{children}</span>
          <span
            className={cn(
              'flex-none text-default-500 transition-all duration-200',
              {
                'rotate-90 transform text-primary': multiIndex === index,
              },
            )}
          >
            <ChevronRight className='h-3.5 w-3.5' />
          </span>
        </button>
      ) : (
        <Link
          href={item?.href}
          className={cn('', {
            'rounded text-primary': isLocationMatch(item.href, locationName),
            'text-default-700 hover:text-primary': !isLocationMatch(
              item.href,
              locationName,
            ),
          })}
        >
          {children}
        </Link>
      )}
    </>
  );
};

export default LinkButton;
