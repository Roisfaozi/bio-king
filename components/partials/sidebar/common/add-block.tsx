'use client';
import React, { useState } from 'react';
import { cn } from '@/lib/utils';

import { X } from 'lucide-react';
import { Icon } from '@iconify/react';
import Image from 'next/image';
import thumbnail from '@/public/images/all-img/thumbnail.png';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent } from '@/components/ui/dialog';
const AddBlock = ({
  className,
  image = thumbnail,
  title = 'Storage capacity',
  desc = ' Out of your total storage on Premium Plan, you have used up 40%.',
}: {
  className?: string;
  image?: any;
  title?: string;
  desc?: string;
}) => {
  const [openVideo, setOpenVideo] = useState(false);
  return (
    <>
      <div
        className={cn(
          'm-3 hidden rounded bg-primary px-4 pb-4 pt-5 text-primary-foreground dark:bg-default-400 xl:block',
          className,
        )}
      >
        <div className={cn('text-base font-semibold text-primary-foreground')}>
          {' '}
          {title}
        </div>
        <div className={cn('text-sm text-primary-foreground')}>{desc}</div>
        <div className='relative mt-4'>
          <Image src={image} alt='footer-thumbnail' className='h-full w-full' />
          <Button
            size='icon'
            type='button'
            color='secondary'
            className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-40'
            onClick={() => setOpenVideo(true)}
          >
            <Icon
              icon='heroicons:play-16-solid'
              className='h-5 w-5 text-white'
            />
          </Button>
        </div>
        <div className='mt-4 flex items-center gap-2 text-sm font-semibold text-primary-foreground'>
          Upgrade Now
          <Icon icon='heroicons:arrow-long-right' className='h-5 w-5' />{' '}
        </div>
      </div>
      <Dialog open={openVideo}>
        <DialogContent size='lg' className='p-0' hiddenCloseIcon>
          <Button
            size='icon'
            onClick={() => setOpenVideo(false)}
            className='absolute -right-4 -top-4 bg-default-900'
          >
            <X className='h-6 w-6' />
          </Button>
          <iframe
            width='100%'
            height='315'
            src='https://www.youtube.com/embed/8D6b3McyhhU?si=zGOlY311c21dR70j'
            title='YouTube video player'
            frameBorder='0'
            allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
            allowFullScreen
          ></iframe>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AddBlock;
