'use client';

import { CheckCircle } from 'lucide-react';
import Image from 'next/image';

export default function GuaranteeSection() {
  return (
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
                We're confident you'll love Bio King. If you're not completely
                satisfied within the first 30 days, we'll refund your payment in
                full—no questions asked.
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
  );
}
