import {
  ArrowRight,
  Check,
  CheckCircle,
  HelpCircle,
  Star,
  X,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import { Logo } from '@/components/landing-page/partials/logo';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function PricingPage() {
  return (
    <div className='flex min-h-screen flex-col bg-gradient-to-b from-background to-background/60'>
      {/* Update the header with gradient */}
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
            className='text-sm font-medium transition-colors hover:text-primary'
          >
            Features
          </Link>
          <Link
            href='/pricing'
            className='text-sm font-medium text-primary transition-colors hover:text-primary'
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
        {/* Update hero section with gradients */}
        <section className='relative w-full overflow-hidden bg-muted/30 py-12 md:py-24 lg:py-32'>
          <div className='pointer-events-none absolute inset-0 bg-grid-pattern opacity-[0.03]'></div>
          <div className='absolute left-0 right-0 top-0 h-1 bg-gradient-primary'></div>
          <div className='absolute -right-40 -top-40 h-80 w-80 animate-pulse-slow rounded-full bg-gradient-radial from-primary/20 to-transparent opacity-30 blur-3xl'></div>
          <div className='absolute -bottom-40 -left-40 h-80 w-80 animate-pulse-slow rounded-full bg-gradient-radial from-purple-500/20 to-transparent opacity-30 blur-3xl'></div>
          <div className='container px-4 md:px-6'>
            <div className='flex flex-col items-center justify-center space-y-4 text-center'>
              <div className='bg-gradient-primary/10 inline-flex items-center space-x-2 rounded-full px-3 py-1 text-sm font-medium text-primary'>
                <span>Transparent Pricing</span>
              </div>
              <h1 className='max-w-[800px] text-3xl font-bold tracking-tighter sm:text-5xl'>
                Simple pricing for{' '}
                <span className='gradient-text'>powerful bio links</span>
              </h1>
              <p className='max-w-[700px] text-muted-foreground md:text-xl/relaxed'>
                Choose the plan that's right for you. All plans include a 14-day
                free trial with no credit card required.
              </p>
              <Tabs defaultValue='monthly' className='w-full max-w-md'>
                <TabsList className='grid w-full grid-cols-2 bg-gradient-to-r from-primary/5 via-purple-500/5 to-primary/5'>
                  <TabsTrigger
                    value='monthly'
                    className='data-[state=active]:bg-gradient-primary/10 data-[state=active]:text-primary'
                  >
                    Monthly
                  </TabsTrigger>
                  <TabsTrigger
                    value='annual'
                    className='data-[state=active]:bg-gradient-primary/10 data-[state=active]:text-primary'
                  >
                    Annual
                    <Badge
                      variant='outline'
                      className='bg-gradient-primary/10 ml-2 border-0 text-primary'
                    >
                      Save 20%
                    </Badge>
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </div>
        </section>

        {/* Update pricing cards with gradients */}
        <section className='w-full py-12 md:py-24 lg:py-32'>
          <div className='container px-4 md:px-6'>
            <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-12'>
              {/* Free Plan */}
              <div className='group flex flex-col rounded-xl border bg-card text-card-foreground shadow-sm transition-all hover:shadow-md'>
                <div className='space-y-2 p-6'>
                  <h3 className='text-2xl font-bold'>Free</h3>
                  <p className='text-muted-foreground'>
                    Perfect for individuals and small projects
                  </p>
                </div>
                <div className='space-y-4 p-6 pt-0'>
                  <div className='flex items-baseline gap-1'>
                    <span className='text-4xl font-bold'>$0</span>
                    <span className='text-muted-foreground'>/month</span>
                  </div>
                  <p className='text-sm text-muted-foreground'>
                    For individuals and creators looking to get started with a
                    bio link page.
                  </p>
                  <Button
                    className='w-full transition-all duration-300 group-hover:bg-gradient-primary group-hover:text-white'
                    variant='outline'
                  >
                    Get Started
                  </Button>
                </div>
                <div className='mt-6 space-y-4 border-t p-6 pt-0'>
                  <div className='space-y-2'>
                    <h4 className='text-sm font-medium'>What's included:</h4>
                    <ul className='grid gap-2 text-sm'>
                      <li className='flex items-center gap-2'>
                        <Check className='h-4 w-4 text-primary' />
                        <span>1 bio link page</span>
                      </li>
                      <li className='flex items-center gap-2'>
                        <Check className='h-4 w-4 text-primary' />
                        <span>Basic analytics</span>
                      </li>
                      <li className='flex items-center gap-2'>
                        <Check className='h-4 w-4 text-primary' />
                        <span>Bio King branded domain</span>
                      </li>
                      <li className='flex items-center gap-2'>
                        <Check className='h-4 w-4 text-primary' />
                        <span>5 social media links</span>
                      </li>
                      <li className='flex items-center gap-2'>
                        <X className='h-4 w-4 text-muted-foreground' />
                        <span className='text-muted-foreground'>
                          Custom domains
                        </span>
                      </li>
                      <li className='flex items-center gap-2'>
                        <X className='h-4 w-4 text-muted-foreground' />
                        <span className='text-muted-foreground'>
                          Advanced content blocks
                        </span>
                      </li>
                      <li className='flex items-center gap-2'>
                        <X className='h-4 w-4 text-muted-foreground' />
                        <span className='text-muted-foreground'>
                          Monetization tools
                        </span>
                      </li>
                      <li className='flex items-center gap-2'>
                        <X className='h-4 w-4 text-muted-foreground' />
                        <span className='text-muted-foreground'>
                          Verified badge
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Pro Plan */}
              <div className='group relative flex flex-col rounded-xl border bg-card text-card-foreground shadow-sm transition-all hover:shadow-md'>
                <div className='absolute right-0 top-0 m-2'>
                  <div className='inline-flex items-center rounded-full border border-transparent bg-gradient-primary px-2.5 py-0.5 text-xs font-semibold text-primary-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2'>
                    Most Popular
                  </div>
                </div>
                <div className='space-y-2 p-6'>
                  <h3 className='text-2xl font-bold'>Pro</h3>
                  <p className='text-muted-foreground'>
                    For professionals and growing creators
                  </p>
                </div>
                <div className='space-y-4 p-6 pt-0'>
                  <div className='flex items-baseline gap-1'>
                    <span className='text-4xl font-bold'>$9</span>
                    <span className='text-muted-foreground'>/month</span>
                  </div>
                  <p className='text-sm text-muted-foreground'>
                    For creators and businesses that need advanced features and
                    customization.
                  </p>
                  <Button className='w-full bg-gradient-primary hover:opacity-90'>
                    Start 14-Day Free Trial
                  </Button>
                </div>
                <div className='mt-6 space-y-4 border-t p-6 pt-0'>
                  <div className='space-y-2'>
                    <h4 className='text-sm font-medium'>
                      Everything in Free, plus:
                    </h4>
                    <ul className='grid gap-2 text-sm'>
                      <li className='flex items-center gap-2'>
                        <Check className='h-4 w-4 text-primary' />
                        <span>Unlimited links</span>
                      </li>
                      <li className='flex items-center gap-2'>
                        <Check className='h-4 w-4 text-primary' />
                        <span>Advanced analytics with geographic data</span>
                      </li>
                      <li className='flex items-center gap-2'>
                        <Check className='h-4 w-4 text-primary' />
                        <span>1 custom domain</span>
                      </li>
                      <li className='flex items-center gap-2'>
                        <Check className='h-4 w-4 text-primary' />
                        <span>All content blocks</span>
                      </li>
                      <li className='flex items-center gap-2'>
                        <Check className='h-4 w-4 text-primary' />
                        <span>Custom themes and branding</span>
                      </li>
                      <li className='flex items-center gap-2'>
                        <Check className='h-4 w-4 text-primary' />
                        <span>Basic monetization tools</span>
                      </li>
                      <li className='flex items-center gap-2'>
                        <Check className='h-4 w-4 text-primary' />
                        <span>Scheduled content</span>
                      </li>
                      <li className='flex items-center gap-2'>
                        <Check className='h-4 w-4 text-primary' />
                        <span>Bio King branding removed</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Business Plan */}
              <div className='group flex flex-col rounded-xl border bg-card text-card-foreground shadow-sm transition-all hover:shadow-md'>
                <div className='space-y-2 p-6'>
                  <h3 className='text-2xl font-bold'>Business</h3>
                  <p className='text-muted-foreground'>
                    For established creators and businesses
                  </p>
                </div>
                <div className='space-y-4 p-6 pt-0'>
                  <div className='flex items-baseline gap-1'>
                    <span className='text-4xl font-bold'>$29</span>
                    <span className='text-muted-foreground'>/month</span>
                  </div>
                  <p className='text-sm text-muted-foreground'>
                    For serious creators and businesses that need premium
                    features and support.
                  </p>
                  <Button
                    className='w-full transition-all duration-300 group-hover:bg-gradient-primary group-hover:text-white'
                    variant='outline'
                  >
                    Contact Sales
                  </Button>
                </div>
                <div className='mt-6 space-y-4 border-t p-6 pt-0'>
                  <div className='space-y-2'>
                    <h4 className='text-sm font-medium'>
                      Everything in Pro, plus:
                    </h4>
                    <ul className='grid gap-2 text-sm'>
                      <li className='flex items-center gap-2'>
                        <Check className='h-4 w-4 text-primary' />
                        <span>Multiple bio link pages</span>
                      </li>
                      <li className='flex items-center gap-2'>
                        <Check className='h-4 w-4 text-primary' />
                        <span>
                          Enterprise-grade analytics with custom reports
                        </span>
                      </li>
                      <li className='flex items-center gap-2'>
                        <Check className='h-4 w-4 text-primary' />
                        <span>Multiple custom domains</span>
                      </li>
                      <li className='flex items-center gap-2'>
                        <Check className='h-4 w-4 text-primary' />
                        <span>Team member access</span>
                      </li>
                      <li className='flex items-center gap-2'>
                        <Check className='h-4 w-4 text-primary' />
                        <span>Advanced security features</span>
                      </li>
                      <li className='flex items-center gap-2'>
                        <Check className='h-4 w-4 text-primary' />
                        <span>Verified badge</span>
                      </li>
                      <li className='flex items-center gap-2'>
                        <Check className='h-4 w-4 text-primary' />
                        <span>Advanced monetization tools</span>
                      </li>
                      <li className='flex items-center gap-2'>
                        <Check className='h-4 w-4 text-primary' />
                        <span>
                          Priority support with dedicated account manager
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Feature Comparison */}
        <section className='relative w-full bg-muted/30 py-12 md:py-24 lg:py-32'>
          <div className='pointer-events-none absolute inset-0 bg-dot-pattern opacity-[0.03]'></div>
          <div className='container px-4 md:px-6'>
            <div className='mb-12 flex flex-col items-center justify-center space-y-4 text-center'>
              <h2 className='text-3xl font-bold tracking-tighter sm:text-4xl'>
                Compare features
              </h2>
              <p className='max-w-[700px] text-muted-foreground md:text-xl/relaxed'>
                Find the plan that's right for your needs. All plans include
                core features to help you create the perfect bio link page.
              </p>
            </div>

            <div className='overflow-x-auto'>
              <table className='w-full border-collapse rounded-lg border bg-background'>
                <thead>
                  <tr className='border-b'>
                    <th className='p-4 text-left font-medium'>Features</th>
                    <th className='p-4 text-center font-medium'>Free</th>
                    <th className='p-4 text-center font-medium'>Pro</th>
                    <th className='p-4 text-center font-medium'>Business</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className='border-b'>
                    <td className='p-4 font-medium' colSpan={4}>
                      Bio Link Management
                    </td>
                  </tr>
                  {[
                    {
                      feature: 'Bio link pages',
                      free: '1',
                      pro: '1',
                      business: 'Multiple',
                    },
                    {
                      feature: 'Social media links',
                      free: '5',
                      pro: 'Unlimited',
                      business: 'Unlimited',
                    },
                    {
                      feature: 'Content blocks',
                      free: 'Basic',
                      pro: 'All',
                      business: 'All',
                    },
                    {
                      feature: 'Custom themes',
                      free: 'Limited',
                      pro: '✓',
                      business: '✓',
                    },
                    {
                      feature: 'Custom domains',
                      free: '—',
                      pro: '1',
                      business: 'Multiple',
                    },
                    {
                      feature: 'Bio King branding',
                      free: '✓',
                      pro: 'Removed',
                      business: 'Removed',
                    },
                  ].map((row, i) => (
                    <tr key={i} className='border-b'>
                      <td className='p-4'>{row.feature}</td>
                      <td className='p-4 text-center'>{row.free}</td>
                      <td className='p-4 text-center'>{row.pro}</td>
                      <td className='p-4 text-center'>{row.business}</td>
                    </tr>
                  ))}

                  <tr className='border-b'>
                    <td className='p-4 font-medium' colSpan={4}>
                      Analytics
                    </td>
                  </tr>
                  {[
                    {
                      feature: 'Click tracking',
                      free: 'Basic',
                      pro: 'Advanced',
                      business: 'Enterprise',
                    },
                    {
                      feature: 'Geographic data',
                      free: 'Country',
                      pro: 'City',
                      business: 'Detailed',
                    },
                    {
                      feature: 'Device & browser',
                      free: 'Basic',
                      pro: 'Detailed',
                      business: 'Detailed',
                    },
                    {
                      feature: 'Referrer tracking',
                      free: '—',
                      pro: '✓',
                      business: '✓',
                    },
                    {
                      feature: 'Custom reports',
                      free: '—',
                      pro: 'Limited',
                      business: 'Unlimited',
                    },
                    {
                      feature: 'Data retention',
                      free: '30 days',
                      pro: '1 year',
                      business: 'Unlimited',
                    },
                  ].map((row, i) => (
                    <tr key={i} className='border-b'>
                      <td className='p-4'>{row.feature}</td>
                      <td className='p-4 text-center'>{row.free}</td>
                      <td className='p-4 text-center'>{row.pro}</td>
                      <td className='p-4 text-center'>{row.business}</td>
                    </tr>
                  ))}

                  <tr className='border-b'>
                    <td className='p-4 font-medium' colSpan={4}>
                      Monetization & Advanced Features
                    </td>
                  </tr>
                  {[
                    {
                      feature: 'Product showcases',
                      free: '—',
                      pro: 'Limited',
                      business: 'Unlimited',
                    },
                    {
                      feature: 'Donation tools',
                      free: '—',
                      pro: 'Basic',
                      business: 'Advanced',
                    },
                    {
                      feature: 'Verified badge',
                      free: '—',
                      pro: '—',
                      business: '✓',
                    },
                    {
                      feature: 'Team access',
                      free: '—',
                      pro: '—',
                      business: '✓',
                    },
                    {
                      feature: 'Scheduled content',
                      free: '—',
                      pro: '✓',
                      business: '✓',
                    },
                    {
                      feature: 'Priority support',
                      free: '—',
                      pro: '—',
                      business: '✓',
                    },
                  ].map((row, i) => (
                    <tr key={i} className={i !== 5 ? 'border-b' : ''}>
                      <td className='p-4'>{row.feature}</td>
                      <td className='p-4 text-center'>{row.free}</td>
                      <td className='p-4 text-center'>{row.pro}</td>
                      <td className='p-4 text-center'>{row.business}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className='w-full py-12 md:py-24 lg:py-32'>
          <div className='container px-4 md:px-6'>
            <div className='mb-12 flex flex-col items-center justify-center space-y-4 text-center'>
              <div className='inline-flex items-center space-x-2 rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary'>
                <span>Customer Success</span>
              </div>
              <h2 className='text-3xl font-bold tracking-tighter sm:text-4xl'>
                Trusted by thousands of creators
              </h2>
              <p className='max-w-[700px] text-muted-foreground md:text-xl/relaxed'>
                See what our customers have to say about their experience with
                Bio King.
              </p>
            </div>

            <div className='grid gap-8 md:grid-cols-2 lg:grid-cols-3'>
              {[
                {
                  quote:
                    'Bio King has transformed my online presence. The customization options are incredible, and the analytics help me understand what content my audience wants.',
                  author: 'Sarah Johnson',
                  role: 'Content Creator',
                  plan: 'Pro Plan',
                  avatar:
                    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=faces',
                },
                {
                  quote:
                    'As a small business owner, I needed a simple way to showcase my products on social media. Bio King delivers that and more with their e-commerce features.',
                  author: 'Michael Chen',
                  role: 'Small Business Owner',
                  plan: 'Business Plan',
                  avatar:
                    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=faces',
                },
                {
                  quote:
                    'The team collaboration features are game-changing. We can now manage all our bio links in one place with proper access controls.',
                  author: 'Emma Rodriguez',
                  role: 'Digital Marketing Manager',
                  plan: 'Business Plan',
                  avatar:
                    'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&h=100&fit=crop&crop=faces',
                },
              ].map((testimonial, i) => (
                <div
                  key={i}
                  className='flex flex-col space-y-4 rounded-xl border bg-background p-6 shadow-sm'
                >
                  <div className='flex space-x-1'>
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className='h-5 w-5 fill-primary text-primary'
                      />
                    ))}
                  </div>
                  <p className='flex-1 text-muted-foreground'>
                    "{testimonial.quote}"
                  </p>
                  <div className='flex items-center space-x-4'>
                    <div className='size-12 overflow-hidden rounded-full'>
                      <Image
                        src={testimonial.avatar || '/placeholder.svg'}
                        width={48}
                        height={48}
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
                      <p className='mt-1 text-xs text-primary'>
                        {testimonial.plan}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className='mt-12 flex justify-center'>
              <Link
                href='#'
                className='inline-flex items-center gap-1 font-medium text-primary underline-offset-4 hover:underline'
              >
                Read more customer stories <ArrowRight className='h-4 w-4' />
              </Link>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className='relative w-full bg-muted/30 py-12 md:py-24 lg:py-32'>
          <div className='pointer-events-none absolute inset-0 bg-grid-pattern opacity-[0.03]'></div>
          <div className='container px-4 md:px-6'>
            <div className='grid gap-10 md:gap-16 lg:grid-cols-2'>
              <div className='space-y-4'>
                <div className='inline-flex items-center space-x-2 rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary'>
                  <span>FAQ</span>
                </div>
                <h2 className='text-3xl font-bold tracking-tighter md:text-4xl/tight'>
                  Frequently Asked Questions
                </h2>
                <p className='max-w-[600px] text-muted-foreground md:text-xl/relaxed'>
                  Find answers to common questions about our service and
                  pricing. If you don't see your question here, feel free to
                  contact us.
                </p>
                <div className='pt-4'>
                  <Link
                    href='#'
                    className='inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2'
                  >
                    Contact Support
                  </Link>
                </div>
              </div>
              <div className='grid gap-4 md:gap-8'>
                {[
                  {
                    question:
                      'Can I try Bio King before committing to a paid plan?',
                    answer:
                      'Yes! Our Free plan allows you to try out the core features of Bio King without any commitment. We also offer a 14-day free trial on our Pro plan with no credit card required. You can upgrade to a paid plan anytime.',
                  },
                  {
                    question: 'How do custom domains work?',
                    answer:
                      "Custom domains allow you to use your own branded domain for your bio link page. You'll need to own the domain and configure it to work with Bio King. Our Pro and Business plans include custom domain support. We provide step-by-step instructions to help you set up your domain.",
                  },
                  {
                    question: 'Can I upgrade or downgrade my plan later?',
                    answer:
                      "You can upgrade or downgrade your plan at any time. When upgrading, you'll be prorated for the remainder of your billing cycle. When downgrading, the new rate will apply at the start of your next billing cycle.",
                  },
                  {
                    question:
                      'Do you offer discounts for nonprofits or educational institutions?',
                    answer:
                      "Yes, we offer special pricing for nonprofits, educational institutions, and open-source projects. Please contact our sales team for more information and to verify your organization's status.",
                  },
                  {
                    question: 'How do I get the verified badge?',
                    answer:
                      'The verified badge is available exclusively on our Business plan. Once you subscribe to the Business plan, you can apply for verification through your account settings. Our team will review your application and verify your identity.',
                  },
                  {
                    question: 'Can I have multiple bio link pages?',
                    answer:
                      'Users on our Free and Pro plans can create one bio link page. Business plan subscribers can create multiple bio link pages, which is perfect for managing different brands or projects.',
                  },
                  {
                    question: 'How secure is Bio King?',
                    answer:
                      'Bio King takes security seriously. All pages are served over HTTPS, and we offer additional security features like password protection on our paid plans. Our Business plan includes advanced security features like two-factor authentication and detailed access controls.',
                  },
                ].map((faq, i) => (
                  <div key={i} className='space-y-2'>
                    <h3 className='flex items-center gap-2 text-xl font-bold'>
                      <HelpCircle className='h-5 w-5 text-primary' />
                      {faq.question}
                    </h3>
                    <p className='text-muted-foreground'>{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Guarantee Section */}
        <section className='w-full border-y py-12 md:py-24 lg:py-32'>
          <div className='container px-4 md:px-6'>
            <div className='grid items-center gap-6 lg:grid-cols-2 lg:gap-12'>
              <div className='flex flex-col justify-center space-y-4'>
                <div className='inline-flex items-center space-x-2 rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary'>
                  <span>Our Promise</span>
                </div>
                <div className='space-y-2'>
                  <h2 className='text-3xl font-bold tracking-tighter sm:text-4xl'>
                    100% satisfaction guarantee
                  </h2>
                  <p className='max-w-[600px] text-muted-foreground md:text-xl/relaxed'>
                    We're confident you'll love Bio King. If you're not
                    completely satisfied within the first 30 days, we'll refund
                    your payment in full—no questions asked.
                  </p>
                </div>
                <ul className='grid gap-3'>
                  <li className='flex items-start gap-2'>
                    <CheckCircle className='mt-0.5 h-5 w-5 shrink-0 text-primary' />
                    <span>30-day money-back guarantee</span>
                  </li>
                  <li className='flex items-start gap-2'>
                    <CheckCircle className='mt-0.5 h-5 w-5 shrink-0 text-primary' />
                    <span>No long-term contracts required</span>
                  </li>
                  <li className='flex items-start gap-2'>
                    <CheckCircle className='mt-0.5 h-5 w-5 shrink-0 text-primary' />
                    <span>Cancel anytime with no cancellation fees</span>
                  </li>
                  <li className='flex items-start gap-2'>
                    <CheckCircle className='mt-0.5 h-5 w-5 shrink-0 text-primary' />
                    <span>Dedicated support to ensure your success</span>
                  </li>
                </ul>
              </div>
              <div className='flex items-center justify-center'>
                <div className='relative'>
                  <div className='absolute -inset-1 rounded-xl bg-gradient-to-r from-primary/20 via-primary/30 to-purple-500/20 opacity-70 blur-xl'></div>
                  <Image
                    src='https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600&h=400&fit=crop'
                    width={600}
                    height={400}
                    alt='Customer support team'
                    className='relative rounded-xl border object-cover shadow-xl'
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Update CTA section with gradients */}
        <section className='relative w-full overflow-hidden bg-gradient-to-b from-background to-muted/50 py-12 md:py-24 lg:py-32'>
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
                  href='#'
                  className='inline-flex h-11 items-center justify-center rounded-md border border-input bg-background px-8 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2'
                >
                  Contact Sales
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
