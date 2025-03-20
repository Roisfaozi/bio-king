'use client';

import { ArrowRight, CheckCircle, Link2, Sparkles, Zap } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { GradientText } from '../partials/gradient-text';

const ProductShowcaseSection = () => {
  const brandFeatures = [
    {
      title: 'Custom Themes',
      description:
        'Choose from dozens of beautiful themes or create your own to match your brand perfectly.',
      icon: <Zap />,
    },
    {
      title: 'Content Scheduling',
      description:
        'Schedule when your links appear and disappear - perfect for limited-time promotions.',
      icon: <CheckCircle />,
    },
    {
      title: 'Advanced Customization',
      description:
        'Change colors, fonts, buttons, layouts and create a truly unique experience for your audience.',
      icon: <Link2 />,
    },
  ];

  return (
    <section className='relative bg-muted/30 px-6 py-20 lg:px-10'>
      <div className='container relative z-10 mx-auto'>
        <div className='flex flex-col items-center gap-16 lg:flex-row'>
          <div className='w-full lg:w-1/2'>
            <div className='shadow-hero card-3d relative aspect-video w-full max-w-[500px] animate-float overflow-hidden rounded-xl border bg-background transition-all hover:shadow-xl'>
              <div className='absolute -inset-0.5 rounded-xl bg-gradient-primary opacity-20 blur-sm'></div>
              <Image
                src='https://images.unsplash.com/photo-1611162618071-b39a2ec055fb?w=600&h=500&fit=crop'
                alt='Bio King Dashboard'
                className='relative z-10 h-full w-full rounded-xl object-cover'
                width={600}
                height={500}
              />
            </div>
          </div>
          <div className='w-full lg:w-1/2'>
            <div className='bg-gradient-primary/10 animate-fade-in mb-2 inline-flex items-center space-x-2 rounded-full px-3 py-1 text-sm font-medium text-primary'>
              <Sparkles className='mr-1 h-3.5 w-3.5 animate-pulse text-primary' />
              <span>Custom Branding</span>
            </div>
            <h2 className='text-shadow mb-6 text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl'>
              Stand out with{' '}
              <GradientText animate className='text-glow'>
                custom branding
              </GradientText>
            </h2>
            <p className='mb-8 text-lg text-muted-foreground'>
              Customize every aspect of your bio page to match your brand
              perfectly. Choose from dozens of themes, colors, and layouts to
              create a page that's uniquely yours.
            </p>
            <div className='space-y-6'>
              {brandFeatures.map((feature, index) => (
                <div key={index} className='group flex items-start gap-4'>
                  <div className='rounded-full bg-primary/10 p-2 text-primary'>
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className='text-lg font-semibold text-default-900 transition-colors group-hover:text-primary'>
                      {feature.title}
                    </h3>
                    <p className='text-muted-foreground'>
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <Link
              href='#'
              className='group mt-8 inline-flex items-center gap-1 font-medium text-primary underline-offset-4 hover:underline'
            >
              Learn more about customization{' '}
              <ArrowRight className='h-4 w-4 transition-transform group-hover:translate-x-1' />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductShowcaseSection;
