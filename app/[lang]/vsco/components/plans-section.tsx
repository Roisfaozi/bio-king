'use client';

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
    <div className='bg-black px-4 py-16 md:px-8'>
      <div className='mx-auto max-w-[1650px]'>
        <div className='mb-12'>
          <h2 className='mb-6 text-5xl font-bold'>
            PLANS
            <br />
            FOR
            <br />
            EVERYONE
          </h2>
          <div className='max-w-2xl'>
            <p className='text-base'>
              <Link href='#' className='font-bold hover:underline'>
                VSCO Membership
              </Link>{' '}
              gives every photographer ways to find inspiration, develop a
              unique style, and discover new creative and professional
              opportunities.
            </p>
          </div>
        </div>

        <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4'>
          {plans.map((plan) => (
            <div key={plan.id} className='bg-[#1f1f1f] p-8'>
              <div className='mb-8'>
                <div
                  className={`mb-6 inline-block px-6 py-1.5 ${plan.badgeStyle} ${plan.badgeTextColor} font-bold ${plan.hasBorder ? '-2 border border-white' : ''}`}
                >
                  {plan.type}
                </div>
                <p className='text-sm'>{plan.description}</p>
              </div>
              <Link
                href='#'
                className='inline-block rounded-full border border-white px-8 py-2.5 text-center text-xs font-bold uppercase text-white transition-colors hover:bg-white hover:text-black'
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
