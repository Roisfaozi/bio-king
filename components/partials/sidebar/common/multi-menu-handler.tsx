'use client';
import { Icon } from '@iconify/react';
import { cn, translate } from '@/lib/utils';
import React from 'react';

const MultiMenuHandler = ({
  subItem,
  subIndex,
  activeMultiMenu,
  toggleMultiMenu,
  className,
  trans,
}: {
  subItem: any;
  subIndex: number;
  activeMultiMenu: number | null;
  toggleMultiMenu: (subIndex: number) => void;
  className?: string;
  trans: any;
}) => {
  return (
    <div
      onClick={() => toggleMultiMenu(subIndex)}
      className={cn(
        'before: relative top-0 flex cursor-pointer items-center gap-3 rounded text-sm transition-all duration-150 before:absolute before:-left-5 before:h-0 before:w-[3px] before:transition-all before:duration-200',
        className,
        {
          'text-primary before:h-full before:bg-primary':
            activeMultiMenu === subIndex,
          'text-default-700 hover:text-primary': activeMultiMenu !== subIndex,
        },
      )}
    >
      <span className='flex-1'>{translate(subItem.title, trans)}</span>
      <div className='flex-none'>
        <span
          className={cn(
            '[&>*]:transform [&>*]:transition-all [&>*]:duration-300',
            {
              '[&>*]:rotate-90': activeMultiMenu === subIndex,
            },
          )}
        >
          <Icon icon='heroicons:chevron-right-20-solid' className='h-5 w-5' />
        </span>
      </div>
    </div>
  );
};

export default MultiMenuHandler;
