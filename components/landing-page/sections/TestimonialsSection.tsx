'use client';

import { Sparkles, Star } from 'lucide-react';
import { OptimizedBackground } from '../partials/optimized-background';

const TestimonialsSection = () => {
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

  return (
    <section className='shadow-testimonials relative w-full py-12 md:py-24 lg:py-32'>
      <OptimizedBackground
        variant='particles'
        color='blue'
        intensity='medium'
      />

      <div className='container relative z-10 px-4 md:px-6'>
        <div className='scroll-fade-in mb-12 flex flex-col items-center justify-center space-y-4 text-center'>
          <div className='inline-flex items-center space-x-2 rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary'>
            <Sparkles className='mr-1 h-3.5 w-3.5 animate-pulse text-primary' />
            <span>Success Stories</span>
          </div>
          <h2 className='text-shadow text-3xl font-bold tracking-tighter sm:text-5xl'>
            What our customers say
          </h2>
          <p className='max-w-[700px] text-muted-foreground md:text-xl/relaxed'>
            Don't just take our word for it. Here's what creators and businesses
            have to say about Bio King.
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
                  <p className='text-sm font-medium'>{testimonial.author}</p>
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
  );
};

export default TestimonialsSection;
