import SectionHeader from '@/app/[lang]/vsco/components/section-header';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

export default function PhotoToolsSection() {
  return (
    <section className='bg-black px-4 py-10 text-white sm:px-6 sm:py-12 md:px-10 md:py-16 lg:px-16'>
      <div className='mx-auto max-w-5xl'>
        <div className='grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8'>
          <div>
            <SectionHeader title='PHOTO EDITING' subtitle='TOOLS' />
            <p className='mb-3 text-xs text-gray-400 sm:mb-4 sm:text-sm'>
              Professional editing tools with easy-to-use controls. Create your
              unique style with our advanced presets and editing features.
            </p>
            <p className='mb-3 text-xs text-gray-400 sm:mb-4 sm:text-sm'>
              Adjust exposure, contrast, saturation, and more with precision.
              Apply film-inspired presets to achieve classic looks.
            </p>
            <p className='mb-4 text-xs text-gray-400 sm:mb-6 sm:text-sm'>
              Save your favorite edits as recipes to apply to future photos,
              ensuring a consistent style across your portfolio.
            </p>
            <Button
              variant='outline'
              size='sm'
              className='h-9 rounded-full border-white bg-white px-3 text-xs text-[#111] sm:h-10 sm:px-4 sm:text-sm'
            >
              ABOUT PHOTO EDITING TOOLS
            </Button>
          </div>
          <div className='mt-6 md:mt-0'>
            <div className='xs:h-[200px] relative h-[180px] w-full sm:h-[300px] md:h-[350px] lg:h-[400px]'>
              <Image
                src='https://images.unsplash.com/photo-1542038784456-1ea8e935640e?q=80&w=2070&auto=format&fit=crop'
                alt='Photo Editing Tools'
                fill
                className='rounded-md object-cover'
                sizes='(max-width: 480px) 100vw, (max-width: 640px) 100vw, (max-width: 768px) 600px, 500px'
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
