'use client';
import React, { useState } from 'react';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { cn, isLocationMatch, translate } from '@/lib/utils';
import Link from 'next/link';
import LinkButton from './link-or-button';
import MultiNestedMenus from './multi-nested';

const NestedMenus = ({
  nestedIndex,
  index,
  nestedMenus,
  locationName,
  toggleMulti,
  multiIndex,
  trans,
}: {
  nestedIndex: number | null;
  index: number;
  nestedMenus: any;
  locationName: string;
  toggleMulti: any;
  multiIndex: number | null;
  trans: any;
}) => {
  return (
    <Collapsible open={nestedIndex === index}>
      <CollapsibleContent className='CollapsibleContent'>
        <ul className='sub-menu relative space-y-3 before:absolute before:left-4 before:top-0 before:h-[calc(100%-5px)] before:w-[2px] before:rounded before:bg-primary/10 dark:before:bg-primary/20'>
          {nestedMenus?.map((item: any, j: number) => (
            <li
              className={cn(
                'before: relative top-0 ml-[30px] block before:absolute before:-left-[14px] before:h-0 before:w-[2px] before:transition-all before:duration-200 first:pt-4 first:before:top-4',
                {
                  'before:h-full before:bg-primary first:before:h-[calc(100%-16px)]':
                    isLocationMatch(item.href, locationName),
                  'last:pb-1': nestedIndex === index,
                },
              )}
              key={`sub_menu_${j}`}
            >
              <LinkButton
                toggleMulti={toggleMulti}
                item={item}
                index={j}
                multiIndex={multiIndex}
                locationName={locationName}
              >
                <div className={cn('pl-3 text-sm font-normal capitalize')}>
                  {translate(item.title, trans)}
                </div>
              </LinkButton>
              <MultiNestedMenus
                menus={item?.child}
                multiIndex={multiIndex}
                index={j}
                locationName={locationName}
                trans={trans}
              />
            </li>
          ))}
        </ul>
      </CollapsibleContent>
    </Collapsible>
  );
};

export default NestedMenus;
