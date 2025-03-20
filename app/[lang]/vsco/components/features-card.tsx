import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';

const featureCards = [
  {
    title: 'VIDEO EDITOR',
    image:
      'https://images.unsplash.com/photo-1536240478700-b869070f9279?q=80&w=2000&auto=format&fit=crop',
    alt: 'Video editing interface',
    icons: [
      { label: '[]', tooltip: 'Crop' },
      { label: '≡', tooltip: 'Filters' },
      { label: 'FX', tooltip: 'Effects' },
    ],
  },
  {
    title: 'FILM FX',
    image:
      'https://images.unsplash.com/photo-1606041008023-472dfb5e530f?q=80&w=2000&auto=format&fit=crop',
    alt: 'Film effects showcase',
    icons: [],
  },
  {
    title: 'A.I. REMOVE',
    image:
      'https://images.unsplash.com/photo-1535350356005-fd52b3b524fb?q=80&w=2000&auto=format&fit=crop',
    alt: 'AI object removal',
    icons: [],
  },
  {
    title: 'PHOTOGRAPHY JOBS',
    image:
      'https://images.unsplash.com/photo-1452421822248-d4c2b47f0c81?q=80&w=2000&auto=format&fit=crop',
    alt: 'Professional photography',
    badge: 'Available for professional work',
  },
  {
    title: 'ALL FEATURES',
    image:
      'https://images.unsplash.com/photo-1507146426996-ef05306b995a?q=80&w=2000&auto=format&fit=crop',
    alt: 'Photography features',
    icons: [],
  },
];

const secondRowCards = [
  {
    title: 'PHOTO EDITOR',
    image:
      'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=2000&auto=format&fit=crop',
    alt: 'Photo editing interface',
    icons: [
      { icon: '□', tooltip: 'Crop' },
      { icon: '≡', tooltip: 'Adjust' },
      { icon: 'FX', tooltip: 'Effects' },
    ],
  },
  {
    title: 'VSCO CANVAS',
    image:
      'https://images.unsplash.com/photo-1526406915894-7bcd65f60845?q=80&w=2000&auto=format&fit=crop',
    alt: 'VSCO Canvas interface',
    badge: null,
  },
  {
    title: 'VSCO SITES',
    image:
      'https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?q=80&w=2000&auto=format&fit=crop',
    alt: 'Website building',
    button: 'BUILD SITE',
  },
  {
    title: 'PHOTO PRESETS',
    image:
      'https://images.unsplash.com/photo-1516035645781-9f126e774e9e?q=80&w=2000&auto=format&fit=crop',
    alt: 'Photo presets',
    badge: 'C1 PRO',
  },
  {
    title: 'BLOGS',
    image:
      'https://images.unsplash.com/photo-1512486130939-2c4f79935e4f?q=80&w=2000&auto=format&fit=crop',
    alt: 'Blog content',
    icons: [],
  },
];

interface FeatureCardsProps {
  features: {
    title: string;
    image: string;
    alt: string;
  };
}

export default function FeatureCards() {
  return (
    <div className='w-full bg-black'>
      <div className='relative overflow-hidden'>
        <div className='hide-scrollbar flex overflow-x-auto pb-4'>
          <div className='flex gap-4 px-6 py-8 md:px-10 lg:px-16'>
            {featureCards.map((card, index) => (
              <Card
                key={index}
                className='min-w-[300px] flex-shrink-0 overflow-hidden border-0 bg-black'
              >
                <CardContent className='relative p-0'>
                  <div className='relative h-[300px] w-[300px]'>
                    <Image
                      src={card.image || '/placeholder.svg'}
                      alt={card.alt}
                      fill
                      className='object-cover'
                    />
                    <div className='absolute inset-0 flex flex-col justify-between bg-gradient-to-t from-black/70 to-transparent p-4'>
                      {card.icons && card.icons.length > 0 && (
                        <div className='flex gap-2'>
                          {card.icons.map((icon, i) => (
                            <div
                              key={i}
                              className='flex h-8 w-8 items-center justify-center border border-white/50'
                            >
                              <span className='text-xs'>{icon.label}</span>
                            </div>
                          ))}
                        </div>
                      )}
                      {card.badge && (
                        <div className='absolute right-4 top-4 rounded-md bg-white/20 px-3 py-1 backdrop-blur-sm'>
                          <span className='text-xs text-white'>
                            {card.badge}
                          </span>
                        </div>
                      )}
                      <div className='flex items-center justify-between'>
                        <span className='font-semibold text-white'>
                          {card.title}
                        </span>
                        <ArrowRight size={16} className='text-white' />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className='absolute bottom-0 left-0 top-0 z-10 w-16 bg-gradient-to-r from-black to-transparent' />
        <div className='absolute bottom-0 right-0 top-0 z-10 w-16 bg-gradient-to-l from-black to-transparent' />
      </div>

      <div className='relative mt-4 overflow-hidden'>
        <div className='hide-scrollbar flex overflow-x-auto pb-4'>
          <div className='flex gap-4 px-6 py-8 md:px-10 lg:px-16'>
            {secondRowCards.map((card, index) => (
              <Card
                key={index}
                className='min-w-[300px] flex-shrink-0 overflow-hidden border-0 bg-black'
              >
                <CardContent className='relative p-0'>
                  <div className='relative h-[300px] w-[300px]'>
                    <Image
                      src={card.image || '/placeholder.svg'}
                      alt={card.alt}
                      fill
                      className='object-cover'
                    />
                    <div className='absolute inset-0 flex flex-col justify-between bg-gradient-to-t from-black/70 to-transparent p-4'>
                      {card.icons && card.icons.length > 0 && (
                        <div className='flex gap-2'>
                          {card.icons.map((icon, i) => (
                            <div
                              key={i}
                              className='flex h-8 w-8 items-center justify-center border border-white/50'
                            >
                              <span className='text-xs'>{icon.icon}</span>
                            </div>
                          ))}
                        </div>
                      )}
                      {card.badge && (
                        <div className='absolute right-4 top-4 bg-orange-500 px-3 py-1 text-xs text-white'>
                          {card.badge}
                        </div>
                      )}
                      {card.button && (
                        <div className='flex h-full items-center justify-center gap-2'>
                          <button className='flex items-center gap-2 rounded-full border border-white/70 px-4 py-2 text-xs text-white'>
                            <span className='mr-2'>🌐</span> {card.button}
                          </button>
                        </div>
                      )}
                      <div className='flex items-center justify-between'>
                        <span className='font-semibold text-white'>
                          {card.title}
                        </span>
                        <ArrowRight size={16} className='text-white' />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className='absolute bottom-0 left-0 top-0 z-10 w-16 bg-gradient-to-r from-black to-transparent' />
        <div className='absolute bottom-0 right-0 top-0 z-10 w-16 bg-gradient-to-l from-black to-transparent' />
      </div>
    </div>
  );
}
