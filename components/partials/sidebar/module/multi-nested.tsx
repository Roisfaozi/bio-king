'use client';
import React, { useState } from 'react';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { cn, isLocationMatch, translate } from '@/lib/utils';
import Link from 'next/link';

const MultiNestedMenus = ({
  multiIndex,
  index,
  menus,
  locationName,
  trans,
}: {
  multiIndex: number | null;
  index: number;
  menus: any;
  locationName: string;
  trans: any;
}) => {
  return (
    <Collapsible open={multiIndex === index}>
      <CollapsibleContent className='CollapsibleContent'>
        <ul className='sub-menu relative space-y-3'>
          {menus?.map((item: any, i: number) => (
            <li
              className={cn('relative ml-2 block first:pt-4')}
              key={`multi_sub_menu_${i}`}
            >
              <Link href={item.href} className=''>
                <div>
                  <div
                    className={cn(
                      'group flex items-center gap-2 pl-2 text-sm font-normal capitalize hover:text-primary',
                      {
                        'text-primary': isLocationMatch(
                          item.href,
                          locationName,
                        ),
                        'text-default-700': !isLocationMatch(
                          item.href,
                          locationName,
                        ),
                      },
                    )}
                  >
                    <span
                      className={cn(
                        'inline-flex h-2 w-2 rounded-full border border-default-500',
                        {
                          'border-primary bg-primary ring-[4px] ring-primary/30':
                            isLocationMatch(item.href, locationName),
                        },
                      )}
                    ></span>
                    <span>{translate(item.title, trans)}</span>
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </CollapsibleContent>
    </Collapsible>
  );
};

export default MultiNestedMenus;
