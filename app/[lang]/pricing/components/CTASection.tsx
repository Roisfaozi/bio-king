'use client';

import Link from 'next/link';

export default function CTASection() {
  return (
    <section className='relative w-full overflow-hidden bg-gradient-to-b from-background to-muted/50 py-12 md:py-24 lg:py-32'>
      <div className='absolute -left-40 -top-40 h-80 w-80 rounded-full bg-gradient-radial from-primary/10 to-transparent blur-3xl'></div>
      <div className='absolute -bottom-40 -right-40 h-80 w-80 rounded-full bg-gradient-radial from-purple-500/10 to-transparent blur-3xl'></div>
      <div className='container relative px-4 md:px-6'>
        <div className='flex flex-col items-center justify-center space-y-4 text-center'>
          <div className='max-w-[800px] space-y-2'>
            <h2 className='text-3xl font-bold tracking-tighter sm:text-5xl'>
              Ready to <span className='gradient-text'>rule</span> your online
              presence?
            </h2>
            <p className='text-muted-foreground md:text-xl/relaxed'>
              Join thousands of creators and businesses who trust Bio King for
              their bio link needs.
            </p>
          </div>
          <div className='mt-6 flex flex-col gap-2 min-[400px]:flex-row'>
            <Link
              href='#'
              className='inline-flex h-11 items-center justify-center rounded-md bg-gradient-primary px-8 text-sm font-medium text-primary-foreground shadow-lg shadow-primary/20 transition-all hover:opacity-90 hover:shadow-xl hover:shadow-primary/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2'
            >
              Start Free Trial
            </Link>
            <Link
              href='#'
              className='inline-flex h-11 items-center justify-center rounded-md border border-input bg-background px-8 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2'
            >
              Contact Sales
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
