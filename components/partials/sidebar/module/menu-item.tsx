import React from 'react';
import { cn, isLocationMatch, translate } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import { useThemeStore } from '@/store';

function NavLink({
  childItem,
  locationName,
  trans,
}: {
  childItem: any;
  locationName: string;
  trans: any;
}) {
  const { href, icon, title, badge } = childItem;
  return (
    <Link
      href={href}
      className={cn(
        'flex cursor-pointer gap-3 rounded-md px-[10px] py-3 text-sm font-medium capitalize',
        {
          'bg-primary text-primary-foreground': isLocationMatch(
            href,
            locationName,
          ),
          'text-default-600': !isLocationMatch(href, locationName),
        },
      )}
    >
      {icon && (
        <span className='inline-flex grow-0 items-center'>
          <childItem.icon className='h-5 w-5' />
        </span>
      )}
      <div className='grow truncate'>{translate(title, trans)}</div>
      {badge && <Badge className='h-min rounded'>{badge}</Badge>}
    </Link>
  );
}

const MenuItem = ({
  childItem,
  toggleNested,
  nestedIndex,
  index,
  locationName,
  trans,
}: {
  childItem: any;
  toggleNested: (subIndex: number) => void;
  nestedIndex: number | null;
  index: number;
  locationName: string;
  trans: any;
}) => {
  const { icon, title } = childItem;
  const { isRtl } = useThemeStore();
  return (
    <div>
      {childItem?.nested ? (
        <div
          className={cn('flex items-center gap-3 rounded-md px-[10px] py-3', {
            'bg-primary text-primary-foreground': nestedIndex === index,
            'text-default-600': nestedIndex !== index,
          })}
        >
          <div
            className={cn(
              'flex flex-1 cursor-pointer gap-3 text-sm font-medium capitalize',
            )}
            onClick={() => toggleNested(index)}
          >
            <span className='inline-flex grow-0 items-center'>
              <childItem.icon className='h-5 w-5' />
            </span>
            <span className='grow truncate'>{translate(title, trans)}</span>
          </div>
          {childItem.nested && (
            <div
              className={cn(
                'flex-none text-default-500 transition-all duration-200',
                {
                  'rotate-90 transform text-primary-foreground':
                    nestedIndex === index,
                },
              )}
            >
              {isRtl ? (
                <ChevronLeft className='h-3.5 w-3.5' />
              ) : (
                <ChevronRight className='h-3.5 w-3.5' />
              )}
            </div>
          )}
        </div>
      ) : (
        <div className='flex-1'>
          <NavLink
            childItem={childItem}
            locationName={locationName}
            trans={trans}
          />
        </div>
      )}
    </div>
  );
};

export default MenuItem;
