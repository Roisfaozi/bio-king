import { BubbleBackground } from '@/components/landing-page/partials/bubble-background';
import { GradientBackground } from '@/components/landing-page/partials/gradient-background';
import { Logo } from '@/components/landing-page/partials/logo';
import { PatternBackground } from '@/components/landing-page/partials/pattern-background';
import { WaveBackground } from '@/components/landing-page/partials/wave-background';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  ArrowUpRight,
  BarChart3,
  CheckCircle,
  Code,
  Crown,
  Globe,
  Shield,
  Smartphone,
  Users,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function MarketingPage() {
  return (
    <div className='flex min-h-screen flex-col bg-gradient-to-b from-background to-background/60'>
      <header className='sticky top-0 z-50 flex h-16 items-center justify-between border-b bg-background/80 px-4 backdrop-blur-sm lg:px-6'>
        <Logo />
        <nav className='hidden gap-6 md:flex'>
          <Link
            href='/'
            className='text-sm font-medium transition-colors hover:text-primary'
          >
            Home
          </Link>
          <Link
            href='/marketing'
            className='text-sm font-medium text-primary transition-colors hover:text-primary'
          >
            Features
          </Link>
          <Link
            href='/pricing'
            className='text-sm font-medium transition-colors hover:text-primary'
          >
            Pricing
          </Link>
          <Link
            href='#'
            className='text-sm font-medium transition-colors hover:text-primary'
          >
            Blog
          </Link>
        </nav>
        <div className='flex gap-4'>
          <Link
            href='#'
            className='inline-flex h-9 items-center justify-center rounded-md border border-input px-3 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50'
          >
            Log in
          </Link>
          <Link
            href='#'
            className='inline-flex h-9 items-center justify-center rounded-md bg-gradient-primary px-3 text-sm font-medium text-primary-foreground transition-colors hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50'
          >
            Sign up
          </Link>
        </div>
      </header>
      <main className='flex-1'>
        {/* Add the animated background component to the hero section */}
        <section className='bg-colorful-mesh-purple relative w-full overflow-hidden py-12 md:py-24 lg:py-32'>
          <WaveBackground variant='purple' intensity='medium' />
          <div className='pointer-events-none absolute inset-0 bg-grid-pattern opacity-[0.03]'></div>
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
                Discover all the powerful tools and features that make Bio King
                the preferred choice for creators, influencers, and businesses
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

        {/* Feature Tabs Section */}
        <section className='bg-gradient-overlay-blue w-full py-12 md:py-24 lg:py-32'>
          <PatternBackground
            variant='triangles'
            color='blue'
            intensity='light'
          />
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

            <Tabs
              defaultValue='customization'
              className='mx-auto w-full max-w-4xl'
            >
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
                        Customize every aspect of your bio link page to match
                        your brand perfectly. Choose colors, fonts, layouts, and
                        more.
                      </p>
                    </div>
                    <ul className='grid gap-3'>
                      <li className='flex items-start gap-2'>
                        <CheckCircle className='mt-0.5 h-5 w-5 shrink-0 text-primary' />
                        <span>
                          Custom colors and themes to match your brand
                        </span>
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
                        Track performance with real-time analytics. Understand
                        your audience better with detailed metrics on clicks,
                        geographic locations, devices, and referrers.
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
                        specialized content blocks. From videos to products,
                        we've got you covered.
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
                        <span>
                          Product showcases with images and buy buttons
                        </span>
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
                        Take control of your bio link page with advanced
                        security features. Protect your content and verify your
                        identity.
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
                        <span>
                          Two-factor authentication for account security
                        </span>
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

        {/* Use Cases Section */}
        <section className='bg-colorful-mesh-green relative w-full py-12 md:py-24 lg:py-32'>
          <BubbleBackground variant='green' intensity='light' />
          <div className='pointer-events-none absolute inset-0 bg-dot-pattern opacity-[0.03]'></div>
          <div className='container px-4 md:px-6'>
            <div className='mb-12 flex flex-col items-center justify-center space-y-4 text-center'>
              <div className='inline-flex items-center space-x-2 rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary'>
                <span>Perfect For Everyone</span>
              </div>
              <h2 className='text-3xl font-bold tracking-tighter sm:text-4xl'>
                Bio King for every creator
              </h2>
              <p className='max-w-[700px] text-muted-foreground md:text-xl/relaxed'>
                See how different creators and businesses use Bio King to
                improve their online presence and grow their audience.
              </p>
            </div>

            <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
              {[
                {
                  title: 'Content Creators',
                  description:
                    'Showcase your content across platforms, grow your audience, and monetize your following with a beautiful bio link page.',
                  icon: Smartphone,
                  benefits: [
                    'Content showcase',
                    'Audience growth',
                    'Monetization tools',
                  ],
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
                  benefits: [
                    'Music integration',
                    'Merchandise sales',
                    'Event promotion',
                  ],
                  image:
                    'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=300&h=200&fit=crop',
                },
                {
                  title: 'Small Businesses',
                  description:
                    'Create a mini storefront, showcase products, and drive sales through your social media profiles.',
                  icon: Code,
                  benefits: [
                    'Product showcase',
                    'Direct sales',
                    'Customer engagement',
                  ],
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
                  benefits: [
                    'Donation collection',
                    'Event promotion',
                    'Mission sharing',
                  ],
                  image:
                    'https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=300&h=200&fit=crop',
                },
              ].map((useCase, i) => (
                <div
                  key={i}
                  className='flex flex-col space-y-4 rounded-xl border bg-background p-6 shadow-sm transition-all hover:border-primary/20 hover:shadow-md'
                >
                  <div className='flex h-12 w-12 items-center justify-center rounded-full bg-primary/10'>
                    <useCase.icon className='h-6 w-6 text-primary' />
                  </div>
                  <div className='space-y-2'>
                    <h3 className='text-xl font-bold'>{useCase.title}</h3>
                    <p className='text-muted-foreground'>
                      {useCase.description}
                    </p>
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

        {/* Integrations Section */}
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
                    Bio King integrates with the platforms you already use,
                    making it easy to showcase all your content in one place.
                  </p>
                </div>
                <ul className='grid gap-3'>
                  <li className='flex items-start gap-2'>
                    <CheckCircle className='mt-0.5 h-5 w-5 shrink-0 text-primary' />
                    <span>
                      Social media platforms: Instagram, TikTok, YouTube,
                      Twitter
                    </span>
                  </li>
                  <li className='flex items-start gap-2'>
                    <CheckCircle className='mt-0.5 h-5 w-5 shrink-0 text-primary' />
                    <span>
                      Music platforms: Spotify, Apple Music, SoundCloud
                    </span>
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
                {[
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
                ].map((integration, i) => (
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
                    <span className='text-xs font-medium'>
                      {integration.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Comparison Section */}
        <section className='bg-grid-pattern-purple relative w-full py-12 md:py-24 lg:py-32'>
          <PatternBackground variant='grid' color='purple' intensity='medium' />
          <div className='pointer-events-none absolute inset-0 bg-grid-pattern opacity-[0.03]'></div>
          <div className='container px-4 md:px-6'>
            <div className='mb-12 flex flex-col items-center justify-center space-y-4 text-center'>
              <div className='inline-flex items-center space-x-2 rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary'>
                <span>Why Choose Bio King</span>
              </div>
              <h2 className='text-3xl font-bold tracking-tighter sm:text-4xl'>
                How we compare
              </h2>
              <p className='max-w-[700px] text-muted-foreground md:text-xl/relaxed'>
                See how Bio King stacks up against other bio link tools in the
                market.
              </p>
            </div>

            <div className='overflow-x-auto'>
              <table className='w-full border-collapse rounded-lg border bg-background'>
                <thead>
                  <tr className='border-b'>
                    <th className='p-4 text-left font-medium'>Features</th>
                    <th className='p-4 text-center font-medium'>
                      <div className='flex flex-col items-center'>
                        <div className='size-8 mb-2 flex items-center justify-center rounded-full bg-gradient-primary'>
                          <Crown className='h-5 w-5 text-white' />
                        </div>
                        <span>Bio King</span>
                      </div>
                    </th>
                    <th className='p-4 text-center font-medium'>
                      Competitor A
                    </th>
                    <th className='p-4 text-center font-medium'>
                      Competitor B
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    {
                      feature: 'Custom themes',
                      bioking: true,
                      compA: true,
                      compB: false,
                    },
                    {
                      feature: 'Advanced analytics',
                      bioking: true,
                      compA: false,
                      compB: true,
                    },
                    {
                      feature: 'Content blocks',
                      bioking: true,
                      compA: false,
                      compB: false,
                    },
                    {
                      feature: 'E-commerce integration',
                      bioking: true,
                      compA: true,
                      compB: false,
                    },
                    {
                      feature: 'Verified badge',
                      bioking: true,
                      compA: false,
                      compB: true,
                    },
                    {
                      feature: 'Custom domains',
                      bioking: true,
                      compA: true,
                      compB: false,
                    },
                    {
                      feature: 'Monetization tools',
                      bioking: true,
                      compA: false,
                      compB: false,
                    },
                  ].map((row, i) => (
                    <tr key={i} className={i !== 6 ? 'border-b' : ''}>
                      <td className='p-4 font-medium'>{row.feature}</td>
                      <td className='p-4 text-center'>
                        {row.bioking ? (
                          <CheckCircle className='mx-auto h-5 w-5 text-primary' />
                        ) : (
                          <span>—</span>
                        )}
                      </td>
                      <td className='p-4 text-center'>
                        {row.compA ? (
                          <CheckCircle className='mx-auto h-5 w-5 text-muted-foreground' />
                        ) : (
                          <span>—</span>
                        )}
                      </td>
                      <td className='p-4 text-center'>
                        {row.compB ? (
                          <CheckCircle className='mx-auto h-5 w-5 text-muted-foreground' />
                        ) : (
                          <span>—</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        {/* Add the animated background to the CTA section */}
        <section className='bg-animated-gradient-purple relative w-full overflow-hidden py-12 md:py-24 lg:py-32'>
          <GradientBackground
            variant='rainbow'
            intensity='medium'
            speed='slow'
          />
          <div className='absolute -left-40 -top-40 h-80 w-80 rounded-full bg-gradient-radial from-primary/10 to-transparent blur-3xl'></div>
          <div className='absolute -bottom-40 -right-40 h-80 w-80 rounded-full bg-gradient-radial from-purple-500/10 to-transparent blur-3xl'></div>
          <div className='container relative px-4 md:px-6'>
            <div className='flex flex-col items-center justify-center space-y-4 text-center'>
              <div className='max-w-[800px] space-y-2'>
                <h2 className='text-3xl font-bold tracking-tighter sm:text-5xl'>
                  Ready to <span className='gradient-text'>rule</span> your
                  online presence?
                </h2>
                <p className='text-muted-foreground md:text-xl/relaxed'>
                  Join thousands of creators and businesses who trust Bio King
                  for their bio link needs.
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
                  href='/pricing'
                  className='inline-flex h-11 items-center justify-center rounded-md border border-input bg-background px-8 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2'
                >
                  View Pricing
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className='w-full border-t bg-background/80 backdrop-blur-sm'>
        <div className='container px-4 py-12 md:px-6'>
          <div className='grid gap-8 md:grid-cols-2 lg:grid-cols-4'>
            <div className='space-y-4'>
              <Logo />
              <p className='text-sm text-muted-foreground'>
                Powerful bio link platform for creators and businesses. Create,
                customize, and track your bio link page.
              </p>
              <div className='flex space-x-4'>
                {['twitter', 'facebook', 'instagram', 'linkedin'].map(
                  (social) => (
                    <Link
                      key={social}
                      href='#'
                      className='text-muted-foreground hover:text-foreground'
                    >
                      <span className='sr-only'>{social}</span>
                      <div className='size-8 flex items-center justify-center rounded-full border'>
                        <span className='text-xs'>
                          {social.charAt(0).toUpperCase()}
                        </span>
                      </div>
                    </Link>
                  ),
                )}
              </div>
            </div>
            <div className='space-y-4'>
              <h3 className='text-sm font-medium'>Product</h3>
              <ul className='space-y-2 text-sm'>
                {[
                  'Features',
                  'Pricing',
                  'Integrations',
                  'Enterprise',
                  'Security',
                ].map((item) => (
                  <li key={item}>
                    <Link
                      href='#'
                      className='text-muted-foreground hover:text-foreground'
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className='space-y-4'>
              <h3 className='text-sm font-medium'>Resources</h3>
              <ul className='space-y-2 text-sm'>
                {[
                  'Blog',
                  'Documentation',
                  'Guides',
                  'API Reference',
                  'Status',
                ].map((item) => (
                  <li key={item}>
                    <Link
                      href='#'
                      className='text-muted-foreground hover:text-foreground'
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className='space-y-4'>
              <h3 className='text-sm font-medium'>Company</h3>
              <ul className='space-y-2 text-sm'>
                {['About', 'Careers', 'Contact', 'Terms', 'Privacy'].map(
                  (item) => (
                    <li key={item}>
                      <Link
                        href='#'
                        className='text-muted-foreground hover:text-foreground'
                      >
                        {item}
                      </Link>
                    </li>
                  ),
                )}
              </ul>
            </div>
          </div>
          <div className='mt-8 flex flex-col items-center gap-2 border-t py-6 sm:flex-row'>
            <p className='text-xs text-muted-foreground'>
              © {new Date().getFullYear()} Bio King. All rights reserved.
            </p>
            <nav className='flex gap-4 sm:ml-auto sm:gap-6'>
              <Link
                href='#'
                className='text-xs underline-offset-4 hover:underline'
              >
                Terms of Service
              </Link>
              <Link
                href='#'
                className='text-xs underline-offset-4 hover:underline'
              >
                Privacy Policy
              </Link>
              <Link
                href='#'
                className='text-xs underline-offset-4 hover:underline'
              >
                Cookie Policy
              </Link>
            </nav>
          </div>
        </div>
      </footer>
    </div>
  );
}
