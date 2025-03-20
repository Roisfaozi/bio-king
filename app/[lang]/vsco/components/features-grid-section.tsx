'use client';

import PhotoToolsSection from './photo-tools-section';
import PlansSection from './plans-section';

export default function FeaturesGridSection() {
  return (
    <section className='px-4 py-16 md:px-8'>
      <div className='mx-auto max-w-[1650px]'>
        <div className='grid grid-cols-1 gap-16 md:grid-cols-2'>
          <PlansSection />
          <PhotoToolsSection />
        </div>
      </div>
    </section>
  );
}
