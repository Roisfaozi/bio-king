'use client';

import { Sparkles } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { GradientText } from '../partials/gradient-text';
import { NeonGlowBackground } from '../partials/neon-glow-background';

const HeroSection = () => {
  return (
    <section className='relative w-full overflow-hidden py-12 md:py-24 lg:py-32 xl:py-48'>
      <NeonGlowBackground variant='rainbow' intensity='medium' speed='medium' />
      <div className='bg-grid-pattern pointer-events-none absolute inset-0 opacity-[0.03]'></div>
      <div className='absolute left-0 right-0 top-0 h-1 bg-gradient-primary'></div>
      <div className='container relative px-4 md:px-6'>
        <div className='grid gap-6 lg:grid-cols-2 lg:gap-12 xl:grid-cols-2'>
          <div className='flex flex-col justify-center space-y-4'>
            <div className='bg-gradient-primary/10 animate-fade-in mb-2 inline-flex items-center space-x-2 rounded-full px-3 py-1 text-sm font-medium text-primary'>
              <Sparkles className='mr-1 h-3.5 w-3.5 animate-pulse text-primary' />
              <span>Trusted by 10,000+ creators worldwide</span>
            </div>
            <div className='space-y-2'>
              <h1 className='text-shadow animate-fade-in text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none'>
                One Link for All Your{' '}
                <GradientText animate className='text-glow'>
                  Content
                </GradientText>
              </h1>
              <p className='animate-fade-in max-w-[600px] text-muted-foreground md:text-xl'>
                Create a stunning bio link page that showcases your content,
                products, and social profiles. The perfect solution for
                creators, influencers, and businesses.
              </p>
            </div>
            <div className='animate-fade-in flex flex-col gap-2 min-[400px]:flex-row'>
              <Link
                href='/auth/signup'
                className='btn-gradient btn-hover-effect inline-flex h-11 items-center justify-center rounded-md bg-gradient-primary px-8 text-sm font-medium text-primary-foreground shadow-lg shadow-primary/20 transition-all hover:shadow-xl hover:shadow-primary/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2'
              >
                Create Your Bio Link
              </Link>
              <Link
                href='/dashboard'
                className='btn-outline-gradient btn-hover-effect inline-flex h-11 items-center justify-center rounded-md border border-input bg-background/80 px-8 text-sm font-medium shadow-sm backdrop-blur-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2'
              >
                View Demo
              </Link>
            </div>
            <div className='animate-fade-in mt-6 flex items-center gap-4'>
              <div className='flex -space-x-2'>
                {[
                  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=faces',
                  'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=faces',
                  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=faces',
                  'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&h=150&fit=crop&crop=faces',
                ].map((avatar, i) => (
                  <div
                    key={i}
                    className='size-8 overflow-hidden rounded-full border-2 border-background shadow-sm'
                  >
                    <Image
                      src={avatar || '/placeholder.svg'}
                      alt={`User ${i + 1}`}
                      width={32}
                      height={32}
                      className='h-full w-full object-cover'
                    />
                  </div>
                ))}
              </div>
              <p className='text-sm text-muted-foreground'>
                <span className='font-medium text-foreground'>4,920+</span> bio
                links created today
              </p>
            </div>
          </div>
          {/* Hero Section Image */}
          <div className='flex items-center justify-center'>
            <div className='shadow-hero card-3d relative aspect-video w-full max-w-[500px] animate-float overflow-hidden rounded-xl border bg-background transition-all hover:shadow-xl'>
              <div className='absolute -inset-0.5 rounded-xl bg-gradient-primary opacity-20 blur-sm'></div>
              <Image
                src='https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=600&h=500&fit=crop'
                alt='Bio King preview on mobile and desktop'
                className='relative z-10 h-full w-full rounded-xl object-cover'
                width={600}
                height={500}
              />
              <div className='absolute inset-0 z-20 bg-gradient-to-t from-black/40 to-transparent'></div>
              <div className='absolute bottom-4 left-4 right-4 z-30 text-white'>
                <p className='text-sm font-medium'>
                  Your personal branded bio link page
                </p>
                <p className='text-xs opacity-80'>bioking.io/yourname</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
