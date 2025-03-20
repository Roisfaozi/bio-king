'use client';

import { WaveBackground } from '@/components/landing-page/partials/wave-background';
import Link from 'next/link';

export default function HeroSection() {
  return (
    <section className='bg-colorful-mesh-purple relative w-full overflow-hidden py-12 md:py-24 lg:py-32'>
      <WaveBackground variant='purple' intensity='medium' />
      <div className='bg-grid-pattern pointer-events-none absolute inset-0 opacity-[0.03]'></div>
      <div className='absolute left-0 right-0 top-0 h-1 bg-gradient-primary'></div>
      <div className='absolute -right-40 -top-40 h-80 w-80 animate-pulse-slow rounded-full bg-gradient-radial from-primary/20 to-transparent opacity-30 blur-3xl'></div>
      <div className='absolute -bottom-40 -left-40 h-80 w-80 animate-pulse-slow rounded-full bg-gradient-radial from-purple-500/20 to-transparent opacity-30 blur-3xl'></div>
      <div className='container px-4 md:px-6'>
        <div className='flex flex-col items-center justify-center space-y-4 text-center'>
          <div className='bg-gradient-primary/10 inline-flex items-center space-x-2 rounded-full px-3 py-1 text-sm font-medium text-primary'>
            <span>Powerful Bio Link Platform</span>
          </div>
          <h1 className='max-w-[800px] text-3xl font-bold tracking-tighter sm:text-5xl'>
            Features that transform your{' '}
            <span className='gradient-text'>online presence</span>
          </h1>
          <p className='max-w-[900px] text-muted-foreground md:text-xl/relaxed'>
            Discover all the powerful tools and features that make Bio King the
            preferred choice for creators, influencers, and businesses
            worldwide.
          </p>
          <div className='mt-4 flex flex-col gap-2 min-[400px]:flex-row'>
            <Link
              href='#'
              className='inline-flex h-11 items-center justify-center rounded-md bg-gradient-primary px-8 text-sm font-medium text-primary-foreground shadow-lg shadow-primary/20 transition-all hover:opacity-90 hover:shadow-xl hover:shadow-primary/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2'
            >
              Start Free Trial
            </Link>
            <Link
              href='/pricing'
              className='inline-flex h-11 items-center justify-center rounded-md border border-input bg-background/80 px-8 text-sm font-medium shadow-sm backdrop-blur-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2'
            >
              View Pricing
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
