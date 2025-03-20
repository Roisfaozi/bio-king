import SectionHeader from '@/app/[lang]/vsco/components/section-header';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

export default function PhotoToolsSection() {
  return (
    <section className='bg-[#111] px-4 py-16'>
      <div className='mx-auto max-w-[1650px]'>
        <div className='grid grid-cols-1 gap-8 md:grid-cols-4'>
          <div className='col-span-1'>
            <SectionHeader title='PHOTO' subtitle='TOOLS' />
            <p className='mb-4 text-sm text-gray-400'>
              Professional editing tools with easy-to-use controls. Create your
              unique style with our advanced presets and editing features.
            </p>
            <p className='mb-4 text-sm text-gray-400'>
              Adjust exposure, contrast, saturation, and more with precision.
              Apply film-inspired presets to achieve classic looks.
            </p>
            <p className='mb-6 text-sm text-gray-400'>
              Save your favorite edits as recipes to apply to future photos,
              ensuring a consistent style across your portfolio.
            </p>
            <Button variant='outline' size='sm' className='rounded-full'>
              ABOUT PHOTO EDITING TOOLS
            </Button>
          </div>
          <div className='col-span-1 md:col-span-3'>
            <Image
              src='https://images.unsplash.com/photo-1542038784456-1ea8e935640e?q=80&w=2070&auto=format&fit=crop'
              alt='Photo Editing Tools'
              width={600}
              height={500}
              className='w-full rounded-md object-cover'
            />
          </div>
        </div>
      </div>
    </section>
  );
}
