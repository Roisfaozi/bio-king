'use client';

import { FeatureItem } from '@/app/[lang]/vsco/components/features-data';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import Image from 'next/image';
interface Badge {
  text: string;
  color: string;
}

interface CarouselFeatureItemProps {
  features: FeatureItem;
  className?: string;
}

export default function CarouselFeatureItem({
  features,
  className,
}: CarouselFeatureItemProps) {
  console.log(features);
  return (
    <motion.div
      whileHover={{ y: -7, cursor: 'default' }}
      transition={{ duration: 0.2 }}
    >
      <Card className={cn('rounded-none bg-[#111] text-white', className)}>
        <CardContent className='p-0'>
          <div className='w-full max-w-[300px] overflow-hidden rounded-t-md bg-[#111]'>
            <Image
              className='aspect-3/2 h-full w-full object-cover'
              src={features.image}
              alt='image'
              width={200}
              height={200}
              layout='responsive'
            />
          </div>
          <div className='flex items-center gap-2 bg-[#111] p-4'>
            <p className='text-xs font-semibold text-white'>{features.title}</p>
            <motion.svg
              width='10'
              height='10'
              viewBox='0 0 10 10'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
              whileHover={{ x: 5, y: -5 }}
              transition={{ duration: 0.2, delay: 0.2 }}
            >
              <path
                d='M9.203 6.434H7.851V3.34L1.988 9.203L1 8.228L6.902 2.339H3.756V1H9.203V6.434Z'
                fill='currentColor'
              ></path>
            </motion.svg>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
