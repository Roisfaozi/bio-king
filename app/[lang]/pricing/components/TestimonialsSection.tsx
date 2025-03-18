'use client';

import { ArrowRight, Star } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function TestimonialsSection() {
  const testimonials = [
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
  ];

  return (
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
            See what our customers have to say about their experience with Bio
            King.
          </p>
        </div>

        <div className='grid gap-8 md:grid-cols-2 lg:grid-cols-3'>
          {testimonials.map((testimonial, i) => (
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
                  <p className='text-sm font-medium'>{testimonial.author}</p>
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
  );
}
