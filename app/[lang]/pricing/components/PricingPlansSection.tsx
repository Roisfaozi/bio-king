'use client';

import { Button } from '@/components/ui/button';
import { Check, X } from 'lucide-react';

export default function PricingPlansSection() {
  return (
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
                For individuals and creators looking to get started with a bio
                link page.
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
                For serious creators and businesses that need premium features
                and support.
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
                    <span>Enterprise-grade analytics with custom reports</span>
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
                    <span>Priority support with dedicated account manager</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
