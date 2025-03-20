'use client';

import SectionHeader from '@/app/[lang]/vsco/components/section-header';
import Link from 'next/link';

type Plan = {
  id: string;
  type: string;
  badgeStyle: string;
  badgeTextColor: string;
  description: string;
  buttonText: string;
  hasBorder?: boolean;
};

const plans: Plan[] = [
  {
    id: 'starter',
    type: 'STARTER',
    badgeStyle: 'bg-[#C0C0C0]',
    badgeTextColor: 'text-black',
    description: 'For beginners looking to explore VSCO tools and community',
    buttonText: 'TRY FOR FREE',
  },
  {
    id: 'plus',
    type: 'PLUS',
    badgeStyle: 'bg-[#789db8]',
    badgeTextColor: 'text-black',
    description:
      'For photographers looking to easily edit and share their photography',
    buttonText: 'TRY FOR FREE',
  },
  {
    id: 'pro',
    type: 'PRO',
    badgeStyle: 'bg-[#f1a900]',
    badgeTextColor: 'text-black',
    description:
      'For professionals looking to work with brands and promote their work',
    buttonText: 'TRY FOR FREE',
  },
  {
    id: 'vsco-hub',
    type: 'VSCO HUB',
    badgeStyle: 'bg-[#000] text-white',
    badgeTextColor: 'text-white',
    description:
      'For anyone looking to build a creative team and hire the best photographers',
    buttonText: 'ABOUT VSCO HUB',
    hasBorder: true,
  },
];

export default function PlansSection() {
  return (
    <div className='bg-black px-3 py-10 sm:px-4 sm:py-12 md:px-8 md:py-16'>
      <div className='mx-auto max-w-[1650px]'>
        <div className='mb-8 sm:mb-10 md:mb-12'>
          <div>
            <SectionHeader title='PLANS' subtitle='FOR EVERYONE' />
            <p className='max-w-md text-xs text-muted-foreground sm:text-sm'>
              <span className='font-semibold'>VSCO Membership</span> gives every
              photographer ways to find inspiration, develop a unique style, and
              discover new creative and professional opportunities.
            </p>
          </div>
        </div>

        <div className='grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4'>
          {plans.map((plan) => (
            <div key={plan.id} className='bg-[#1f1f1f] p-5 sm:p-6 md:p-8'>
              <div className='mb-6 sm:mb-8'>
                <div
                  className={`mb-4 inline-block px-4 py-1 sm:mb-6 sm:px-6 sm:py-1.5 ${plan.badgeStyle} ${plan.badgeTextColor} text-xs font-bold sm:text-sm ${plan.hasBorder ? '-2 border border-white' : ''}`}
                >
                  {plan.type}
                </div>
                <p className='text-xs sm:text-sm'>{plan.description}</p>
              </div>
              <Link
                href='#'
                className='inline-block rounded-full border border-white px-6 py-2 text-center text-xs font-bold uppercase text-white transition-colors hover:bg-white hover:text-black sm:px-8 sm:py-2.5'
              >
                {plan.buttonText}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
