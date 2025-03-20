'use client';

import SectionHeader from '@/app/[lang]/vsco/components/section-header';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

export default function CommunitySection() {
  return (
    <section className='bg-[#111] px-3 py-10 sm:px-4 sm:py-12 md:px-8 md:py-16'>
      <div className='mx-auto max-w-[1650px]'>
        <div className='grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-4'>
          <div className='relative col-span-1 mt-6 md:col-span-3 md:mt-0'>
            <Image
              className='aspect-3/2 h-full w-full object-cover'
              src='            https://cdn.prod.website-files.com/64e27cdd42db7ecf119d5e61/66b51ee32c3c423ef92c7f5c_community-profile.jpg
              '
              alt='image'
              width={500}
              height={500}
              layout='responsive'
            />
          </div>
          <div className='col-span-1'>
            <SectionHeader title='COMMUNITY' subtitle='PROFILE' />
            <p className='mb-3 text-xs text-white sm:mb-4 sm:text-sm'>
              Connect with the VSCO community and share your creative vision
              with the world.
            </p>
            <p className='mb-3 text-xs text-white sm:mb-4 sm:text-sm'>
              Curate your photography portfolio with Galleries that showcase
              your best work, right on your profile. Tell your stories with
              photography blogs. Collect and share inspiration by reposting
              images, and join VSCO Spaces to connect with photographers who
              share your same interests and style.
            </p>
            <p className='mb-4 text-xs text-white sm:mb-6 sm:text-sm'>
              Expand your creative network and see why VSCO is the home for
              photographers.
            </p>
            <Button
              variant='outline'
              size='sm'
              className='whitespace-normal rounded-full border-white text-xs text-white hover:bg-white hover:text-[#111] sm:whitespace-nowrap'
            >
              EXPLORE THE VSCO COMMUNITY
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
