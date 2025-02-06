'use client';

import img5 from '@/public/images/country/bangladesh.png';
import img6 from '@/public/images/country/brazil.png';
import img2 from '@/public/images/country/france.png';
import img3 from '@/public/images/country/india.png';
import img4 from '@/public/images/country/spain.png';
import img1 from '@/public/images/country/usa.png';
import { VectorMap } from '@south-paw/react-vector-maps';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import world from './worldmap.json';
const SelectingLayers = ({ height = 250 }: { height?: number }) => {
  const [selected, setSelected] = useState<number[]>([]);

  const onClick = (event: React.MouseEvent<SVGPathElement>) => {
    const target = event.currentTarget as SVGPathElement;
    const id = target.getAttribute('id');
    if (id) {
      const numericId = parseInt(id, 10);
      setSelected((prevSelected) =>
        prevSelected.includes(numericId)
          ? prevSelected.filter((sid) => sid !== numericId)
          : [...prevSelected, numericId],
      );
    }
  };

  const country = [
    { name: 'United State', image: img1, user: 32900 },
    { name: 'France', image: img2, user: 30456 },
    { name: 'India', image: img3, user: 29703 },
    { name: 'Spain', image: img4, user: 27533 },
    { name: 'Bangladesh', image: img5, user: 27523 },
    { name: 'Brazil', image: img6, user: 23289 },
  ];
  return (
    <div className='grid grid-cols-12 gap-4 sm:gap-6'>
      <div className='col-span-12 md:col-span-8'>
        <div className={`h-[ w-full${height}px]`}>
          <VectorMap
            {...world}
            layerProps={{ onClick }}
            className='dashtail-codeVmapWarning h-full w-full object-cover'
          />
        </div>
        <div className='text-center'>
          <p className='text-sm font-medium text-card-foreground'>Selected:</p>
          <pre className='text-sm font-medium text-card-foreground'>
            {JSON.stringify(selected, null, 2)}
          </pre>
        </div>
      </div>
      <div className='col-span-12 mt-9 md:col-span-4 md:mt-0'>
        <div className='flex items-center justify-between border-b pb-2'>
          <div className='text-base font-semibold text-default-900'>
            Top Countries
          </div>
          <Link
            href='/dashboard'
            className='text-xs font-medium text-primary hover:underline'
          >
            See All
          </Link>
        </div>
        <div className='py-5'>
          {country.map((item, i) => (
            <div
              key={i}
              className='flex flex-wrap items-center justify-between pb-3.5'
            >
              <div className='flex items-center gap-3'>
                <div className='inline-block h-9 w-9 overflow-hidden rounded-full'>
                  <Image
                    className='h-full w-full object-cover'
                    src={item.image}
                    alt='spain'
                  />
                </div>
                <span className='inline-block text-sm font-medium text-default-600'>
                  {item.name}
                </span>
              </div>
              <div className='rounded bg-default-100 p-1.5 text-sm text-default-600 dark:bg-default-50'>
                {item.user}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SelectingLayers;
