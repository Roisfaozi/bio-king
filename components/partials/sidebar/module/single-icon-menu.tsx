import React from 'react';
import { cn } from '@/lib/utils';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
  TooltipArrow,
} from '@/components/ui/tooltip';
import Link from 'next/link';
import { translate } from '@/lib/utils';
const SingleIconMenu = ({
  index,
  activeIndex,
  item,
  locationName,
  trans,
}: {
  index: number;
  activeIndex: number | null;
  item: any;
  locationName: string;
  trans: any;
}) => {
  const { icon, title, href } = item;
  return (
    <>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            {href ? (
              <Link
                href={href}
                className={cn(
                  'relative mx-auto flex h-12 w-12 cursor-pointer flex-col items-center justify-center rounded-md transition-all duration-300',
                  {
                    'bg-primary/10 text-primary': locationName === href,
                    'text-default-500 hover:bg-primary/10 hover:text-primary dark:text-default-400':
                      locationName !== href,
                  },
                )}
              >
                <item.icon className='h-8 w-8' />
              </Link>
            ) : (
              <button
                className={cn(
                  'relative mx-auto flex h-12 w-12 cursor-pointer flex-col items-center justify-center rounded-md transition-all duration-300',
                  {
                    'bg-primary/10 text-primary data-[state=delayed-open]:bg-primary/10 dark:bg-primary dark:text-primary-foreground':
                      activeIndex === index,
                    'text-default-500 data-[state=delayed-open]:bg-primary/10 data-[state=delayed-open]:text-primary dark:text-default-400':
                      activeIndex !== index,
                  },
                )}
              >
                <item.icon className='h-6 w-6' />
              </button>
            )}
          </TooltipTrigger>
          <TooltipContent side='right' className='capitalize'>
            {translate(title, trans)}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </>
  );
};

export default SingleIconMenu;
