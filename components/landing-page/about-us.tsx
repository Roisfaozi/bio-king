'use client';
import { Icon } from '@iconify/react';
import Image from 'next/image';
import label1 from '@/public/images/landing-page/auth-label-1.png';
import label2 from '@/public/images/landing-page/author-label-2.png';
import label3 from '@/public/images/landing-page/label-3.png';
import label4 from '@/public/images/landing-page/label-4.png';
import label5 from '@/public/images/landing-page/label-5.png';
import featured from '@/public/images/landing-page/featured.png';
import { cn } from '@/lib/utils';
const AboutUs = () => {
  const data = [
    {
      title: 'Exclusive Author',
      image: label1,
    },
    {
      title: 'Weekly Top Seller',
      image: label2,
    },
    {
      title: 'Featured Author',
      image: label3,
    },
    {
      title: '6 Years Membership',
      image: label4,
    },
    {
      title: 'Trendsetter',
      image: label5,
    },
  ];
  return (
    <section className='bg-[#F8F4F3] pt-16 dark:bg-card 2xl:pt-[120px]'>
      <div className='mx-auto max-w-[670px] px-3'>
        <h2 className='mb-3 text-center text-xl font-semibold text-default-900 xl:text-3xl xl:leading-[46px]'>
          A Legacy of <span className='text-primary'>Trust</span>
        </h2>
        <p className='text-center text-base text-default-700 xl:leading-7'>
          Premium, budget-friendly solutions for web applications, regardless of
          size, utilizing the most trusted frameworks and familiar tools.
        </p>
      </div>

      <div className='mt-12 flex items-center justify-center gap-3 px-3 lg:gap-16'>
        {data.map((item, index) => (
          <div
            key={`label-image-${index}`}
            className='flex flex-col items-center text-center'
          >
            <div
              className={cn('h-10 w-8 md:h-fit md:w-fit', {
                'h-14 w-10 md:h-fit md:w-fit': index == 2,
              })}
            >
              <Image src={item.image} alt='image' />
            </div>
            <p className='mt-1 text-xs font-medium text-default-700 lg:mt-4 lg:text-base'>
              {item.title}
            </p>
          </div>
        ))}
      </div>
      <div className='mt-12 flex flex-wrap justify-center gap-9 text-center'>
        <div className='rounded border border-primary bg-background px-6 py-5'>
          <span className='block text-lg font-semibold text-default-900 xl:text-2xl'>
            +7 Years
          </span>
          <span className='mt-1 block whitespace-nowrap text-sm font-medium text-default-800'>
            On ThemeForest
          </span>
        </div>
        <div className='rounded border border-primary bg-background px-6 py-5'>
          <span className='block text-lg font-semibold text-default-900 xl:text-2xl'>
            10k+
          </span>
          <span className='mt-1 block whitespace-nowrap text-sm font-medium text-default-800'>
            End Users
          </span>
        </div>
        <div className='rounded border border-primary bg-background px-6 py-5'>
          <span className='block text-lg font-semibold text-default-900 xl:text-2xl'>
            5k+
          </span>
          <span className='mt-1 block whitespace-nowrap text-sm font-medium text-default-800'>
            Love Codeshaper
          </span>
        </div>
        <div className='rounded border border-primary bg-background px-6 py-5'>
          <span className='block text-lg font-semibold text-default-900 xl:text-2xl'>
            200+
          </span>
          <span className='mt-1 flex items-center whitespace-nowrap text-sm font-medium text-default-800'>
            5 <Icon icon='heroicons:star' className='h-4 w-4 text-yellow-400' />{' '}
            Reviews
          </span>
        </div>
      </div>
      <div className='mt-14 h-fit w-full'>
        <Image
          src={featured}
          alt='featured'
          className='h-full w-full object-cover'
        />
      </div>
    </section>
  );
};

export default AboutUs;
