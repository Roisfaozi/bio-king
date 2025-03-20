'use client';

import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function PriceHeroSection() {
  return (
    <section className='relative w-full overflow-hidden bg-muted/30 py-12 md:py-24 lg:py-32'>
      <div className='bg-grid-pattern pointer-events-none absolute inset-0 opacity-[0.03]'></div>
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
  );
}
