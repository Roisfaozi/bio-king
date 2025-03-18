'use client';

import { BarChart3, Globe, Sparkles, Users, Zap } from 'lucide-react';
import { GradientText } from '../partials/gradient-text';

const FeaturesSection = () => {
  const features = [
    {
      title: 'Custom Bio Domains',
      description:
        'Create branded bio pages with your own domain and improve engagement by up to 30%.',
      icon: <Globe className='h-6 w-6 text-white' />,
      gradient: 'bg-gradient-primary',
    },
    {
      title: 'Social Media Hub',
      description:
        'Connect and showcase all your social profiles in one beautiful, centralized location.',
      icon: <Users className='h-6 w-6 text-white' />,
      gradient: 'bg-gradient-cool',
    },
    {
      title: 'Powerful Analytics',
      description:
        'Track visitor engagement, geography, and link clicks with comprehensive analytics.',
      icon: <BarChart3 className='h-6 w-6 text-white' />,
      gradient: 'bg-gradient-warm',
    },
    {
      title: 'Device Optimization',
      description:
        'Your bio page automatically adapts to look perfect on any device or screen size.',
      icon: <Zap className='h-6 w-6 text-white' />,
      gradient: 'bg-gradient-secondary',
    },
  ];

  return (
    <section className='shadow-features relative w-full py-12 md:py-24 lg:py-32'>
      <div className='container px-4 md:px-6'>
        <div className='scroll-fade-in mb-12 flex flex-col items-center justify-center space-y-4 text-center'>
          <div className='bg-gradient-primary/10 inline-flex items-center space-x-2 rounded-full px-3 py-1 text-sm font-medium text-primary'>
            <Sparkles className='mr-1 h-3.5 w-3.5 animate-pulse text-primary' />
            <span>Powerful Features</span>
          </div>
          <h2 className='text-shadow text-3xl font-bold tracking-tighter sm:text-5xl'>
            Everything you need in{' '}
            <GradientText animate className='text-glow'>
              one place
            </GradientText>
          </h2>
          <p className='max-w-[900px] text-muted-foreground md:text-xl/relaxed'>
            Bio King combines powerful link management tools with beautiful
            customization options to help you create the perfect bio link page.
          </p>
        </div>
        <div className='mx-auto grid max-w-5xl gap-8 md:grid-cols-2 lg:grid-cols-4'>
          {features.map((feature, i) => (
            <div
              key={i}
              className='bg-gradient-card shadow-feature feature-card card-shine scroll-fade-in card-3d group flex flex-col space-y-4 rounded-lg border p-6 backdrop-blur-sm transition-all hover:border-primary/20 hover:shadow-md'
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div
                className={`flex h-12 w-12 items-center justify-center rounded-full ${feature.gradient} feature-icon animate-pulse-slow`}
              >
                {feature.icon}
              </div>
              <div className='space-y-2'>
                <h3 className='text-xl font-bold transition-colors group-hover:text-primary'>
                  {feature.title}
                </h3>
                <p className='text-muted-foreground'>{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
