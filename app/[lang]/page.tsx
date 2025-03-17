'use client';
import { CTASection } from '@/components/landing-page/partials/cta-section';
import { DecorativeElementsOptimized } from '@/components/landing-page/partials/decorative-elements-optimized';
import { GradientText } from '@/components/landing-page/partials/gradient-text';
import { OptimizedBackground } from '@/components/landing-page/partials/optimized-background';
import { StatsCard } from '@/components/landing-page/partials/stats-card';
import logo from '@/public/images/logo/logo-2.png';
import constructionImage from '@/public/images/utility/construction-light.png';
import {
  ArrowRight,
  BarChart3,
  CheckCircle,
  Facebook,
  Globe,
  Instagram,
  Link2,
  Linkedin,
  Shield,
  Sparkles,
  Star,
  Twitter,
  Users,
  Youtube,
  Zap,
} from 'lucide-react';
import { useTheme } from 'next-themes';
import Image from 'next/image';
import Link from 'next/link';

const HomePage = () => {
  const { theme } = useTheme();

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

  const testimonials = [
    {
      quote:
        "Bio King has transformed my online presence. It's become the central hub for all my content and has significantly increased my engagement rates.",
      author: 'Jessica Smith',
      role: 'Content Creator',
      image: 'https://randomuser.me/api/portraits/women/17.jpg',
    },
    {
      quote:
        'The analytics feature helped me understand which content resonates best with my audience. Since using Bio King, my conversion rate has improved by 200%!',
      author: 'Mark Johnson',
      role: 'Digital Marketer',
      image: 'https://randomuser.me/api/portraits/men/32.jpg',
    },
    {
      quote:
        'As an influencer, having a professional bio page is essential. Bio King makes it easy to showcase all my content in one beautiful location.',
      author: 'Alex Rivera',
      role: 'Social Media Influencer',
      image: 'https://randomuser.me/api/portraits/women/63.jpg',
    },
  ];

  const brands = [
    'NETFLIX',
    'SPOTIFY',
    'YOUTUBE',
    'TIKTOK',
    'INSTAGRAM',
    'TWITTER',
    'LINKEDIN',
    'FACEBOOK',
  ];

  const stats = [
    { label: 'Users', value: '20K+' },
    { label: 'Bio Pages Created', value: '100K+' },
    { label: 'Monthly Visitors', value: '5M+' },
  ];

  const socials = [
    {
      link: '/',
      icon: <Twitter />,
    },
    {
      link: '/',
      icon: <Facebook />,
    },
    {
      link: '/',
      icon: <Linkedin />,
    },
    {
      link: '/',
      icon: <Instagram />,
    },
    {
      link: '/',
      icon: <Youtube />,
    },
  ];

  const menu = [
    {
      label: 'Privacy Policy',
      link: '/',
    },
    {
      label: 'Terms of Service',
      link: '/',
    },
    {
      label: 'Contact Us',
      link: '/',
    },
    {
      label: 'Blog',
      link: '/',
    },
  ];

  return (
    <div className='relative flex min-h-screen flex-col'>
      {/* Decorative Elements */}
      <DecorativeElementsOptimized
        variant='mixed'
        color='rainbow'
        density='low'
      />

      {/* Header/Navigation */}
      <header className='shadow-header sticky top-0 z-50 flex h-16 items-center justify-between border-b bg-background/80 px-4 backdrop-blur-sm lg:px-6'>
        <div className='h-[38px] w-[170px]'>
          <Image
            src={logo}
            alt='Bio King'
            className='h-full w-full object-cover'
          />
        </div>
        <nav className='hidden gap-6 md:flex'>
          <Link
            href='/'
            className='text-sm font-medium transition-colors hover:text-primary'
          >
            Home
          </Link>
          <Link
            href='/features'
            className='text-sm font-medium transition-colors hover:text-primary'
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
            href='/auth/login'
            className='btn-outline-gradient btn-hover-effect inline-flex h-9 items-center justify-center rounded-md border border-input px-3 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50'
          >
            Log in
          </Link>
          <Link
            href='/auth/signup'
            className='shadow-button btn-gradient btn-hover-effect inline-flex h-9 items-center justify-center rounded-md bg-gradient-primary px-3 text-sm font-medium text-primary-foreground transition-colors hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50'
          >
            Sign up
          </Link>
        </div>
      </header>

      <main className='flex-1'>
        {/* Hero Section */}
        <section className='relative w-full overflow-hidden py-12 md:py-24 lg:py-32 xl:py-48'>
          <OptimizedBackground
            variant='neon'
            color='rainbow'
            intensity='medium'
          />
          <div className='pointer-events-none absolute inset-0 bg-grid-pattern opacity-[0.03]'></div>
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
                      'https://randomuser.me/api/portraits/women/17.jpg',
                      'https://randomuser.me/api/portraits/men/32.jpg',
                      'https://randomuser.me/api/portraits/women/63.jpg',
                      'https://randomuser.me/api/portraits/men/91.jpg',
                    ].map((avatar, i) => (
                      <div
                        key={i}
                        className='size-8 overflow-hidden rounded-full border-2 border-background shadow-sm'
                      >
                        <img
                          src={avatar}
                          alt={`User ${i + 1}`}
                          width={32}
                          height={32}
                          className='h-full w-full object-cover'
                        />
                      </div>
                    ))}
                  </div>
                  <p className='text-sm text-muted-foreground'>
                    <span className='font-medium text-foreground'>4,920+</span>{' '}
                    bio links created today
                  </p>
                </div>
              </div>
              {/* Hero Section Image */}
              <div className='flex items-center justify-center'>
                <div className='shadow-hero card-3d relative aspect-video w-full max-w-[500px] animate-float overflow-hidden rounded-xl border bg-background transition-all hover:shadow-xl'>
                  <div className='absolute -inset-0.5 rounded-xl bg-gradient-primary opacity-20 blur-sm'></div>
                  <Image
                    src={constructionImage}
                    alt='Bio King preview on mobile and desktop'
                    className='relative z-10 h-full w-full rounded-xl object-cover'
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

        {/* Brands Section */}
        <section className='shadow-brands w-full border-y bg-muted/30 py-8'>
          <DecorativeElementsOptimized
            variant='dots'
            color='purple'
            density='low'
          />
          <div className='container px-4 md:px-6'>
            <div className='flex flex-col items-center justify-center space-y-4 text-center'>
              <p className='text-sm text-muted-foreground'>
                TRUSTED BY LEADING CREATORS AND BRANDS
              </p>
              <div className='flex flex-wrap justify-center gap-8 md:gap-12 lg:gap-16'>
                {brands.map((brand, i) => (
                  <div key={brand} className='flex items-center justify-center'>
                    <span
                      className='animate-fade-in text-xl font-semibold text-muted-foreground/70 transition-colors hover:text-primary'
                      style={{ animationDelay: `${i * 0.1}s` }}
                    >
                      {brand}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className='bg-gradient-to-b from-muted/30 to-transparent py-24'>
          <div className='container mx-auto'>
            <div className='mx-auto grid max-w-4xl grid-cols-1 gap-8 md:grid-cols-3'>
              {stats.map((stat, index) => (
                <StatsCard
                  key={index}
                  number={stat.value}
                  label={stat.label}
                  color={
                    index === 0 ? 'purple' : index === 1 ? 'blue' : 'green'
                  }
                />
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className='shadow-features relative w-full py-12 md:py-24 lg:py-32'>
          <OptimizedBackground
            variant='liquid'
            color='rainbow'
            intensity='medium'
          />
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
                customization options to help you create the perfect bio link
                page.
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
                    <p className='text-muted-foreground'>
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Product Showcase Section */}
        <section className='bg-muted/30 px-6 py-20 lg:px-10'>
          <DecorativeElementsOptimized
            variant='dots'
            color='blue'
            density='low'
          />
          <div className='container mx-auto'>
            <div className='flex flex-col items-center gap-16 lg:flex-row'>
              <div className='w-full lg:w-1/2'>
                <div className='shadow-hero card-3d relative aspect-video w-full max-w-[500px] animate-float overflow-hidden rounded-xl border bg-background transition-all hover:shadow-xl'>
                  <div className='absolute -inset-0.5 rounded-xl bg-gradient-primary opacity-20 blur-sm'></div>
                  <Image
                    src={constructionImage}
                    alt='Bio King Dashboard'
                    className='relative z-10 h-full w-full rounded-xl object-cover'
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
                  perfectly. Choose from dozens of themes, colors, and layouts
                  to create a page that's uniquely yours.
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

        {/* Analytics Section */}
        <section className='relative w-full py-12 md:py-24 lg:py-32'>
          <OptimizedBackground
            variant='particles'
            color='blue'
            intensity='light'
          />
          <div className='container mx-auto px-4 md:px-6'>
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
                  Get deep insights into your audience with comprehensive
                  analytics. Track clicks, geography, devices, and more to
                  optimize your content strategy.
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
                    description:
                      'See which links perform best with your audience',
                    icon: BarChart3,
                  },
                  {
                    title: 'Custom Reports',
                    description:
                      'Build custom reports with flexible date ranges',
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
                    src={constructionImage}
                    alt='Bio King Analytics'
                    className='relative z-10 h-full w-full rounded-xl object-cover'
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className='shadow-testimonials relative w-full py-12 md:py-24 lg:py-32'>
          <OptimizedBackground
            variant='neon'
            color='orange'
            intensity='medium'
          />
          <div className='container px-4 md:px-6'>
            <div className='scroll-fade-in mb-12 flex flex-col items-center justify-center space-y-4 text-center'>
              <div className='inline-flex items-center space-x-2 rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary'>
                <Sparkles className='mr-1 h-3.5 w-3.5 animate-pulse text-primary' />
                <span>Success Stories</span>
              </div>
              <h2 className='text-shadow text-3xl font-bold tracking-tighter sm:text-5xl'>
                What our customers say
              </h2>
              <p className='max-w-[700px] text-muted-foreground md:text-xl/relaxed'>
                Don't just take our word for it. Here's what creators and
                businesses have to say about Bio King.
              </p>
            </div>
            <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
              {testimonials.map((testimonial, i) => (
                <div
                  key={i}
                  className='bg-gradient-card shadow-testimonial testimonial-card card-shine scroll-fade-in card-3d flex flex-col space-y-4 rounded-xl border p-6 backdrop-blur-sm transition-all hover:shadow-md'
                  style={{ animationDelay: `${i * 0.2}s` }}
                >
                  <div className='flex space-x-1'>
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className='h-5 w-5 animate-pulse-slow fill-primary text-primary'
                        style={{ animationDelay: `${star * 0.1}s` }}
                      />
                    ))}
                  </div>
                  <p className='flex-1 text-muted-foreground'>
                    "{testimonial.quote}"
                  </p>
                  <div className='flex items-center space-x-4'>
                    <div className='size-12 border-glow overflow-hidden rounded-full border-2 border-primary/20'>
                      <img
                        src={testimonial.image}
                        alt={testimonial.author}
                        className='h-full w-full object-cover'
                      />
                    </div>
                    <div>
                      <p className='text-sm font-medium'>
                        {testimonial.author}
                      </p>
                      <p className='text-sm text-muted-foreground'>
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <CTASection
          title='Ready to rule your online presence?'
          highlightedWord='rule'
          description='Join thousands of creators and businesses who trust Bio King for their link management needs. Get started for free today.'
          primaryButtonText='Create Your Bio Link'
          primaryButtonLink='/auth/signup'
          secondaryButtonText='Contact Sales'
          secondaryButtonLink='#'
          showEmailForm={true}
          emailPlaceholder='Enter your email'
          emailButtonText='Sign Up Free'
        />
      </main>

      <footer className='shadow-footer w-full border-t bg-background/80 backdrop-blur-sm'>
        <div className='container px-4 py-12 md:px-6'>
          <div className='grid gap-8 md:grid-cols-2 lg:grid-cols-4'>
            <div className='space-y-4'>
              <div className='h-[38px] w-[170px]'>
                <Image
                  src={logo}
                  alt='Bio King'
                  className='h-full w-full object-cover'
                />
              </div>
              <p className='text-sm text-muted-foreground'>
                Powerful bio link platform for creators and businesses. Create,
                customize, and track your bio link page.
              </p>
              <div className='flex space-x-4'>
                {socials.map((social, index) => (
                  <Link
                    key={index}
                    href={social.link}
                    className='text-muted-foreground transition-colors hover:text-primary'
                  >
                    <div className='size-8 border-glow flex items-center justify-center rounded-full border transition-colors hover:border-primary/50'>
                      {social.icon}
                    </div>
                  </Link>
                ))}
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
                      className='text-muted-foreground transition-colors hover:text-primary'
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
                      className='text-muted-foreground transition-colors hover:text-primary'
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
                        className='text-muted-foreground transition-colors hover:text-primary'
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
};

export default HomePage;
