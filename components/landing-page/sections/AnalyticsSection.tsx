'use client';

import { BarChart3, Globe, Shield, Sparkles, Users } from 'lucide-react';
import Image from 'next/image';
import { GradientText } from '../partials/gradient-text';

const AnalyticsSection = () => {
  return (
    <section className='relative w-full py-12 md:py-24 lg:py-32'>
      <div className='container relative z-10 mx-auto px-4 md:px-6'>
        <div className='scroll-fade-in-left flex flex-col justify-center space-y-4'>
          <div className='inline-flex items-center space-x-2 rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary'>
            <Sparkles className='mr-1 h-3.5 w-3.5 animate-pulse text-primary' />
            <span>Advanced Analytics</span>
          </div>
          <div className='space-y-2'>
            <h2 className='text-shadow text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl'>
              Powerful analytics at{' '}
              <GradientText animate className='text-glow'>
                a glance
              </GradientText>
            </h2>
            <p className='mb-8 max-w-[900px] text-muted-foreground md:text-xl/relaxed'>
              Get deep insights into your audience with comprehensive analytics.
              Track clicks, geography, devices, and more to optimize your
              content strategy.
            </p>
          </div>
        </div>
        <div className='mt-10 grid grid-cols-1 gap-8 lg:grid-cols-2'>
          <div className='grid grid-cols-1 gap-6 sm:grid-cols-2'>
            {[
              {
                title: 'Visitor Insights',
                description:
                  'Understand your audience with detailed demographic data',
                icon: Users,
              },
              {
                title: 'Click Tracking',
                description: 'See which links perform best with your audience',
                icon: BarChart3,
              },
              {
                title: 'Custom Reports',
                description: 'Build custom reports with flexible date ranges',
                icon: Globe,
              },
              {
                title: 'Data Export',
                description: 'Export your data for further analysis',
                icon: Shield,
              },
            ].map((item, i) => (
              <div
                key={i}
                className='bg-gradient-card shadow-feature scroll-fade-in feature-card group flex flex-col space-y-4 rounded-lg border p-6 backdrop-blur-sm transition-all hover:border-primary/20 hover:shadow-md'
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className='w-fit rounded-full bg-primary/10 p-2 text-primary'>
                  <item.icon className='h-5 w-5' />
                </div>
                <h3 className='text-xl font-semibold text-default-900 transition-colors group-hover:text-primary'>
                  {item.title}
                </h3>
                <p className='text-muted-foreground'>{item.description}</p>
              </div>
            ))}
          </div>
          <div className='scroll-fade-in-right flex items-center justify-center'>
            <div className='shadow-hero card-3d relative aspect-video w-full max-w-[500px] animate-float overflow-hidden rounded-xl border bg-background transition-all hover:shadow-xl'>
              <div className='absolute -inset-0.5 rounded-xl bg-gradient-primary opacity-20 blur-sm'></div>
              <Image
                src='https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=600&h=500&fit=crop'
                alt='Bio King Analytics'
                className='relative z-10 h-full w-full rounded-xl object-cover'
                width={600}
                height={500}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AnalyticsSection;
