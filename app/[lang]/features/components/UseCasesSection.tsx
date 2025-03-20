import { BubbleBackground } from '@/components/landing-page/partials/bubble-background';
import {
  ArrowUpRight,
  BarChart3,
  Code,
  Globe,
  Shield,
  Smartphone,
  Users,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function UseCasesSection() {
  const useCases = [
    {
      title: 'Content Creators',
      description:
        'Showcase your content across platforms, grow your audience, and monetize your following with a beautiful bio link page.',
      icon: Smartphone,
      benefits: ['Content showcase', 'Audience growth', 'Monetization tools'],
      image:
        'https://images.unsplash.com/photo-1616469829941-c7200edec809?w=300&h=200&fit=crop',
    },
    {
      title: 'Influencers',
      description:
        'Manage brand partnerships, showcase your portfolio, and track campaign performance all from one central hub.',
      icon: BarChart3,
      benefits: [
        'Brand partnerships',
        'Portfolio showcase',
        'Campaign tracking',
      ],
      image:
        'https://images.unsplash.com/photo-1534008757030-27299c4371b6?w=300&h=200&fit=crop',
    },
    {
      title: 'Musicians & Artists',
      description:
        'Share your music, art, tour dates, and merchandise with fans through a customized bio link page.',
      icon: Globe,
      benefits: ['Music integration', 'Merchandise sales', 'Event promotion'],
      image:
        'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=300&h=200&fit=crop',
    },
    {
      title: 'Small Businesses',
      description:
        'Create a mini storefront, showcase products, and drive sales through your social media profiles.',
      icon: Code,
      benefits: ['Product showcase', 'Direct sales', 'Customer engagement'],
      image:
        'https://images.unsplash.com/photo-1556740738-b6a63e27c4df?w=300&h=200&fit=crop',
    },
    {
      title: 'Podcasters',
      description:
        'Share your episodes across all platforms, grow your subscriber base, and monetize your podcast.',
      icon: Users,
      benefits: [
        'Episode sharing',
        'Subscriber growth',
        'Sponsorship management',
      ],
      image:
        'https://images.unsplash.com/photo-1589903308904-1010c2294adc?w=300&h=200&fit=crop',
    },
    {
      title: 'Nonprofits',
      description:
        'Share your mission, collect donations, and promote events all from your bio link page.',
      icon: Shield,
      benefits: ['Donation collection', 'Event promotion', 'Mission sharing'],
      image:
        'https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=300&h=200&fit=crop',
    },
  ];

  return (
    <section className='bg-colorful-mesh-green relative w-full py-12 md:py-24 lg:py-32'>
      <BubbleBackground variant='green' intensity='light' />
      <div className='bg-dot-pattern pointer-events-none absolute inset-0 opacity-[0.03]'></div>
      <div className='container px-4 md:px-6'>
        <div className='mb-12 flex flex-col items-center justify-center space-y-4 text-center'>
          <div className='inline-flex items-center space-x-2 rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary'>
            <span>Perfect For Everyone</span>
          </div>
          <h2 className='text-3xl font-bold tracking-tighter sm:text-4xl'>
            Bio King for every creator
          </h2>
          <p className='max-w-[700px] text-muted-foreground md:text-xl/relaxed'>
            See how different creators and businesses use Bio King to improve
            their online presence and grow their audience.
          </p>
        </div>

        <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
          {useCases.map((useCase, i) => (
            <div
              key={i}
              className='flex flex-col space-y-4 rounded-xl border bg-background p-6 shadow-sm transition-all hover:border-primary/20 hover:shadow-md'
            >
              <div className='flex h-12 w-12 items-center justify-center rounded-full bg-primary/10'>
                <useCase.icon className='h-6 w-6 text-primary' />
              </div>
              <div className='space-y-2'>
                <h3 className='text-xl font-bold'>{useCase.title}</h3>
                <p className='text-muted-foreground'>{useCase.description}</p>
              </div>
              <div className='relative h-40 w-full overflow-hidden rounded-lg'>
                <Image
                  src={useCase.image || '/placeholder.svg'}
                  alt={useCase.title}
                  fill
                  className='object-cover'
                />
              </div>
              <ul className='grid gap-2 pt-2'>
                {useCase.benefits.map((benefit, j) => (
                  <li key={j} className='flex items-center gap-2'>
                    <div className='h-1.5 w-1.5 rounded-full bg-primary'></div>
                    <span className='text-sm'>{benefit}</span>
                  </li>
                ))}
              </ul>
              <div className='mt-auto pt-2'>
                <Link
                  href='#'
                  className='inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline'
                >
                  Learn more <ArrowUpRight className='h-3 w-3' />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
