import { PatternBackground } from '@/components/landing-page/partials/pattern-background';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CheckCircle } from 'lucide-react';
import Image from 'next/image';

export default function FeatureTabsSection() {
  return (
    <section className='bg-gradient-overlay-blue w-full py-12 md:py-24 lg:py-32'>
      <PatternBackground variant='triangles' color='blue' intensity='light' />
      <div className='container px-4 md:px-6'>
        <div className='mb-12 flex flex-col items-center justify-center space-y-4 text-center'>
          <div className='bg-gradient-primary/10 inline-flex items-center space-x-2 rounded-full px-3 py-1 text-sm font-medium text-primary'>
            <span>Core Features</span>
          </div>
          <h2 className='text-3xl font-bold tracking-tighter sm:text-4xl'>
            Everything you need in{' '}
            <span className='gradient-text'>one platform</span>
          </h2>
          <p className='max-w-[700px] text-muted-foreground md:text-xl/relaxed'>
            Bio King combines powerful link management with beautiful
            customization to help you make the perfect bio link page.
          </p>
        </div>

        <Tabs defaultValue='customization' className='mx-auto w-full max-w-4xl'>
          <TabsList className='mb-12 grid h-auto grid-cols-3 bg-gradient-to-r from-primary/5 via-purple-500/5 to-primary/5 p-1 md:grid-cols-5'>
            <TabsTrigger
              value='customization'
              className='data-[state=active]:bg-gradient-primary/10 py-2 text-xs data-[state=active]:text-primary md:text-sm'
            >
              Customization
            </TabsTrigger>
            <TabsTrigger
              value='analytics'
              className='data-[state=active]:bg-gradient-primary/10 py-2 text-xs data-[state=active]:text-primary md:text-sm'
            >
              Analytics
            </TabsTrigger>
            <TabsTrigger
              value='blocks'
              className='data-[state=active]:bg-gradient-primary/10 py-2 text-xs data-[state=active]:text-primary md:text-sm'
            >
              Content Blocks
            </TabsTrigger>
            <TabsTrigger
              value='security'
              className='data-[state=active]:bg-gradient-primary/10 py-2 text-xs data-[state=active]:text-primary md:text-sm'
            >
              Security
            </TabsTrigger>
            <TabsTrigger
              value='monetization'
              className='data-[state=active]:bg-gradient-primary/10 py-2 text-xs data-[state=active]:text-primary md:text-sm'
            >
              Monetization
            </TabsTrigger>
          </TabsList>

          <TabsContent value='customization' className='mt-0'>
            <div className='grid items-center gap-6 lg:grid-cols-2 lg:gap-12'>
              <div className='flex flex-col justify-center space-y-4'>
                <div className='space-y-2'>
                  <h3 className='text-2xl font-bold tracking-tighter sm:text-3xl'>
                    Create <span className='gradient-text'>stunning</span>{' '}
                    branded pages
                  </h3>
                  <p className='text-muted-foreground md:text-lg'>
                    Customize every aspect of your bio link page to match your
                    brand perfectly. Choose colors, fonts, layouts, and more.
                  </p>
                </div>
                <ul className='grid gap-3'>
                  <li className='flex items-start gap-2'>
                    <CheckCircle className='mt-0.5 h-5 w-5 shrink-0 text-primary' />
                    <span>Custom colors and themes to match your brand</span>
                  </li>
                  <li className='flex items-start gap-2'>
                    <CheckCircle className='mt-0.5 h-5 w-5 shrink-0 text-primary' />
                    <span>Multiple layout options and button styles</span>
                  </li>
                  <li className='flex items-start gap-2'>
                    <CheckCircle className='mt-0.5 h-5 w-5 shrink-0 text-primary' />
                    <span>Custom fonts and typography settings</span>
                  </li>
                  <li className='flex items-start gap-2'>
                    <CheckCircle className='mt-0.5 h-5 w-5 shrink-0 text-primary' />
                    <span>Animated backgrounds and effects</span>
                  </li>
                </ul>
              </div>
              <div className='flex items-center justify-center'>
                <div className='relative'>
                  <div className='absolute -inset-1 rounded-xl bg-gradient-primary opacity-30 blur-xl'></div>
                  <Image
                    src='https://images.unsplash.com/photo-1559028012-481c04fa702d?w=600&h=400&fit=crop'
                    width={600}
                    height={400}
                    alt='Bio page customization interface'
                    className='relative rounded-xl border object-cover shadow-xl'
                  />
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value='analytics' className='mt-0'>
            <div className='grid items-center gap-6 lg:grid-cols-2 lg:gap-12'>
              <div className='order-last flex items-center justify-center lg:order-first'>
                <div className='relative'>
                  <div className='absolute -inset-1 rounded-xl bg-gradient-to-r from-primary/20 via-primary/30 to-purple-500/20 opacity-70 blur-xl'></div>
                  <Image
                    src='https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop'
                    width={600}
                    height={400}
                    alt='Analytics dashboard'
                    className='relative rounded-xl border object-cover shadow-xl'
                  />
                </div>
              </div>
              <div className='flex flex-col justify-center space-y-4'>
                <div className='space-y-2'>
                  <h3 className='text-2xl font-bold tracking-tighter sm:text-3xl'>
                    Gain insights from every click
                  </h3>
                  <p className='text-muted-foreground md:text-lg'>
                    Track performance with real-time analytics. Understand your
                    audience better with detailed metrics on clicks, geographic
                    locations, devices, and referrers.
                  </p>
                </div>
                <ul className='grid gap-3'>
                  <li className='flex items-start gap-2'>
                    <CheckCircle className='mt-0.5 h-5 w-5 shrink-0 text-primary' />
                    <span>Real-time click tracking and visualization</span>
                  </li>
                  <li className='flex items-start gap-2'>
                    <CheckCircle className='mt-0.5 h-5 w-5 shrink-0 text-primary' />
                    <span>Geographic data with city-level precision</span>
                  </li>
                  <li className='flex items-start gap-2'>
                    <CheckCircle className='mt-0.5 h-5 w-5 shrink-0 text-primary' />
                    <span>Device, browser, and OS insights</span>
                  </li>
                  <li className='flex items-start gap-2'>
                    <CheckCircle className='mt-0.5 h-5 w-5 shrink-0 text-primary' />
                    <span>Custom reports and data export options</span>
                  </li>
                </ul>
              </div>
            </div>
          </TabsContent>

          <TabsContent value='blocks' className='mt-0'>
            <div className='grid items-center gap-6 lg:grid-cols-2 lg:gap-12'>
              <div className='flex flex-col justify-center space-y-4'>
                <div className='space-y-2'>
                  <h3 className='text-2xl font-bold tracking-tighter sm:text-3xl'>
                    Specialized content blocks for everything
                  </h3>
                  <p className='text-muted-foreground md:text-lg'>
                    Add any type of content to your bio link page with our
                    specialized content blocks. From videos to products, we've
                    got you covered.
                  </p>
                </div>
                <ul className='grid gap-3'>
                  <li className='flex items-start gap-2'>
                    <CheckCircle className='mt-0.5 h-5 w-5 shrink-0 text-primary' />
                    <span>Video embeds from YouTube, TikTok, and more</span>
                  </li>
                  <li className='flex items-start gap-2'>
                    <CheckCircle className='mt-0.5 h-5 w-5 shrink-0 text-primary' />
                    <span>
                      Music players for Spotify, Apple Music, and SoundCloud
                    </span>
                  </li>
                  <li className='flex items-start gap-2'>
                    <CheckCircle className='mt-0.5 h-5 w-5 shrink-0 text-primary' />
                    <span>Product showcases with images and buy buttons</span>
                  </li>
                  <li className='flex items-start gap-2'>
                    <CheckCircle className='mt-0.5 h-5 w-5 shrink-0 text-primary' />
                    <span>Newsletter signup forms and contact forms</span>
                  </li>
                </ul>
              </div>
              <div className='flex items-center justify-center'>
                <div className='relative'>
                  <div className='absolute -inset-1 rounded-xl bg-gradient-to-r from-primary/20 via-primary/30 to-purple-500/20 opacity-70 blur-xl'></div>
                  <Image
                    src='https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=600&h=400&fit=crop'
                    width={600}
                    height={400}
                    alt='Content blocks interface'
                    className='relative rounded-xl border object-cover shadow-xl'
                  />
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value='security' className='mt-0'>
            <div className='grid items-center gap-6 lg:grid-cols-2 lg:gap-12'>
              <div className='order-last flex items-center justify-center lg:order-first'>
                <div className='relative'>
                  <div className='absolute -inset-1 rounded-xl bg-gradient-to-r from-primary/20 via-primary/30 to-purple-500/20 opacity-70 blur-xl'></div>
                  <Image
                    src='https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=600&h=400&fit=crop'
                    width={600}
                    height={400}
                    alt='Security settings interface'
                    className='relative rounded-xl border object-cover shadow-xl'
                  />
                </div>
              </div>
              <div className='flex flex-col justify-center space-y-4'>
                <div className='space-y-2'>
                  <h3 className='text-2xl font-bold tracking-tighter sm:text-3xl'>
                    Enterprise-grade security for your content
                  </h3>
                  <p className='text-muted-foreground md:text-lg'>
                    Take control of your bio link page with advanced security
                    features. Protect your content and verify your identity.
                  </p>
                </div>
                <ul className='grid gap-3'>
                  <li className='flex items-start gap-2'>
                    <CheckCircle className='mt-0.5 h-5 w-5 shrink-0 text-primary' />
                    <span>Verified badge to prove your authenticity</span>
                  </li>
                  <li className='flex items-start gap-2'>
                    <CheckCircle className='mt-0.5 h-5 w-5 shrink-0 text-primary' />
                    <span>Password protection for exclusive content</span>
                  </li>
                  <li className='flex items-start gap-2'>
                    <CheckCircle className='mt-0.5 h-5 w-5 shrink-0 text-primary' />
                    <span>Two-factor authentication for account security</span>
                  </li>
                  <li className='flex items-start gap-2'>
                    <CheckCircle className='mt-0.5 h-5 w-5 shrink-0 text-primary' />
                    <span>GDPR compliance and data protection</span>
                  </li>
                </ul>
              </div>
            </div>
          </TabsContent>

          <TabsContent value='monetization' className='mt-0'>
            <div className='grid items-center gap-6 lg:grid-cols-2 lg:gap-12'>
              <div className='flex flex-col justify-center space-y-4'>
                <div className='space-y-2'>
                  <h3 className='text-2xl font-bold tracking-tighter sm:text-3xl'>
                    Turn your audience into revenue
                  </h3>
                  <p className='text-muted-foreground md:text-lg'>
                    Monetize your bio link page with integrated e-commerce,
                    donations, and affiliate marketing tools.
                  </p>
                </div>
                <ul className='grid gap-3'>
                  <li className='flex items-start gap-2'>
                    <CheckCircle className='mt-0.5 h-5 w-5 shrink-0 text-primary' />
                    <span>
                      Integrated product showcases with direct checkout
                    </span>
                  </li>
                  <li className='flex items-start gap-2'>
                    <CheckCircle className='mt-0.5 h-5 w-5 shrink-0 text-primary' />
                    <span>Donation and tip jar functionality</span>
                  </li>
                  <li className='flex items-start gap-2'>
                    <CheckCircle className='mt-0.5 h-5 w-5 shrink-0 text-primary' />
                    <span>Affiliate link management and tracking</span>
                  </li>
                  <li className='flex items-start gap-2'>
                    <CheckCircle className='mt-0.5 h-5 w-5 shrink-0 text-primary' />
                    <span>Subscription and membership options</span>
                  </li>
                </ul>
              </div>
              <div className='flex items-center justify-center'>
                <div className='relative'>
                  <div className='absolute -inset-1 rounded-xl bg-gradient-to-r from-primary/20 via-primary/30 to-purple-500/20 opacity-70 blur-xl'></div>
                  <Image
                    src='https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop'
                    width={600}
                    height={400}
                    alt='Monetization interface'
                    className='relative rounded-xl border object-cover shadow-xl'
                  />
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}
