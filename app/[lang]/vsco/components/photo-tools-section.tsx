import SectionHeader from '@/app/[lang]/vsco/components/section-header';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

export default function PhotoToolsSection() {
  return (
    <section className='bg-[#111] px-3 py-10 sm:px-4 sm:py-12 md:px-8 md:py-16'>
      <div className='mx-auto max-w-[1650px]'>
        <div className='grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-4'>
          <div className='col-span-1'>
            <SectionHeader title='PHOTO EDITING' subtitle='TOOLS' />
            <p className='mb-3 text-xs text-white sm:mb-4 sm:text-sm'>
              Professional editing tools with easy-to-use controls. Create your
              unique style with our advanced presets and editing features.
            </p>
            <p className='mb-3 text-xs text-white sm:mb-4 sm:text-sm'>
              Adjust exposure, contrast, saturation, and more with precision.
              Apply film-inspired presets to achieve classic looks.
            </p>
            <p className='mb-4 text-xs text-white sm:mb-6 sm:text-sm'>
              Save your favorite edits as recipes to apply to future photos,
              ensuring a consistent style across your portfolio.
            </p>
            <Button
              variant='outline'
              size='sm'
              className='whitespace-normal rounded-full border-white text-xs text-white hover:bg-white hover:text-[#111] sm:whitespace-nowrap'
            >
              ABOUT PHOTO EDITING TOOLS
            </Button>
          </div>
          <div className='relative col-span-1 mt-6 md:col-span-3 md:mt-0'>
            <Image
              className='aspect-3/2 h-full w-full object-cover'
              src='https://images.unsplash.com/photo-1542038784456-1ea8e935640e?q=80&w=2070&auto=format&fit=crop'
              alt='image'
              width={500}
              height={500}
              layout='responsive'
            />
          </div>
        </div>
      </div>
    </section>
  );
}
