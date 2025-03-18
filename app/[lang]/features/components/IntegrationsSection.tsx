import { PatternBackground } from '@/components/landing-page/partials/pattern-background';
import { CheckCircle } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function IntegrationsSection() {
  const integrations = [
    {
      name: 'Instagram',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Instagram_logo_2016.svg/132px-Instagram_logo_2016.svg.png',
    },
    {
      name: 'TikTok',
      logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/a/a9/TikTok_logo.svg/150px-TikTok_logo.svg.png',
    },
    {
      name: 'YouTube',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/YouTube_full-color_icon_%282017%29.svg/159px-YouTube_full-color_icon_%282017%29.svg.png',
    },
    {
      name: 'Spotify',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Spotify_logo_without_text.svg/168px-Spotify_logo_without_text.svg.png',
    },
    {
      name: 'Shopify',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Shopify_logo_2018.svg/147px-Shopify_logo_2018.svg.png',
    },
    {
      name: 'Twitter',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Logo_of_Twitter.svg/150px-Logo_of_Twitter.svg.png',
    },
    {
      name: 'PayPal',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/PayPal.svg/124px-PayPal.svg.png',
    },
    {
      name: 'Twitch',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/26/Twitch_logo.svg/144px-Twitch_logo.svg.png',
    },
    {
      name: 'Discord',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/Discord_Mark.svg/120px-Discord_Mark.svg.png',
    },
  ];

  return (
    <section className='w-full py-12 md:py-24 lg:py-32'>
      <PatternBackground variant='circles' color='blue' intensity='light' />
      <div className='container px-4 md:px-6'>
        <div className='grid items-center gap-6 lg:grid-cols-2 lg:gap-12'>
          <div className='flex flex-col justify-center space-y-4'>
            <div className='inline-flex items-center space-x-2 rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary'>
              <span>Seamless Integrations</span>
            </div>
            <div className='space-y-2'>
              <h2 className='text-3xl font-bold tracking-tighter sm:text-4xl'>
                Works with your favorite platforms
              </h2>
              <p className='max-w-[600px] text-muted-foreground md:text-xl/relaxed'>
                Bio King integrates with the platforms you already use, making
                it easy to showcase all your content in one place.
              </p>
            </div>
            <ul className='grid gap-3'>
              <li className='flex items-start gap-2'>
                <CheckCircle className='mt-0.5 h-5 w-5 shrink-0 text-primary' />
                <span>
                  Social media platforms: Instagram, TikTok, YouTube, Twitter
                </span>
              </li>
              <li className='flex items-start gap-2'>
                <CheckCircle className='mt-0.5 h-5 w-5 shrink-0 text-primary' />
                <span>Music platforms: Spotify, Apple Music, SoundCloud</span>
              </li>
              <li className='flex items-start gap-2'>
                <CheckCircle className='mt-0.5 h-5 w-5 shrink-0 text-primary' />
                <span>E-commerce: Shopify, Etsy, Amazon</span>
              </li>
              <li className='flex items-start gap-2'>
                <CheckCircle className='mt-0.5 h-5 w-5 shrink-0 text-primary' />
                <span>Payment platforms: PayPal, Stripe, Ko-fi</span>
              </li>
            </ul>
            <div className='pt-4'>
              <Link
                href='#'
                className='inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2'
              >
                View all integrations
              </Link>
            </div>
          </div>
          <div className='grid grid-cols-3 gap-4'>
            {integrations.map((integration, i) => (
              <div
                key={i}
                className='flex flex-col items-center justify-center rounded-xl border bg-background p-4 shadow-sm'
              >
                <div className='relative mb-2 h-12 w-12'>
                  <Image
                    src={integration.logo || '/placeholder.svg'}
                    alt={integration.name}
                    fill
                    className='object-contain'
                  />
                </div>
                <span className='text-xs font-medium'>{integration.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
