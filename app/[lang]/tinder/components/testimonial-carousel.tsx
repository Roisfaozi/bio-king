'use client';

import { motion } from 'framer-motion';

const testimonials = [
  {
    id: 1,
    names: 'Kenneth and Elliot',
    text: 'I honestly had been on many Tinder dates and was absolutely sure I was meeting a fling to get a free meal and have some fun ... 3 years and sooo many dates and memories later, I am married to my Tinder guy, Kenny!',
  },
  {
    id: 2,
    names: 'Victoria & Louise ❤️',
    text: 'THANK YOU for making it possible for me to meet my soulmate. Five minutes into our first conversation, my now-wife mentioned how we would have an amazing wedding.',
  },
  {
    id: 3,
    names: 'Ryan & Lindsey',
    text: '... just had a bad break-up and created a Tinder account to keep my mind off the break-up. After about a week of talking, we decided to meet up at a local bar for drinks ... we decided to tie the knot in an 18-person ceremony in New Jersey on 27 June 2020.',
  },
  {
    id: 4,
    names: 'Sarah & Michael',
    text: "Who knew a simple swipe right would lead to the love of my life? After countless coffee dates and shared laughs, we're now planning our dream wedding. Thank you, Tinder!",
  },
  {
    id: 5,
    names: 'David & James',
    text: "As a same-sex couple, we found it challenging to meet someone special. Tinder made it possible for us to connect, and now we're celebrating our 2nd anniversary!",
  },
  {
    id: 6,
    names: 'Emma & Alex',
    text: "From matching during lockdown to virtual dates, and finally meeting in person - our love story is truly a modern romance. We're now living together and couldn't be happier.",
  },
  {
    id: 7,
    names: 'Maria & John',
    text: "I was skeptical about dating apps, but my best friend convinced me to try Tinder. Three months later, I matched with John, and it was like we'd known each other forever.",
  },
  {
    id: 8,
    names: 'Priya & Raj',
    text: "Our families were thrilled when they found out we met on Tinder! Breaking cultural barriers and finding love - who would've thought an app could change our lives so much?",
  },
  {
    id: 9,
    names: 'Sophie & Thomas',
    text: "From our first coffee date to traveling the world together, every moment has been an adventure. We're proof that true love can start with a simple swipe!",
  },
];

export default function TestimonialCarousel() {
  return (
    <div className='relative overflow-hidden py-16'>
      <motion.div
        className='flex gap-6 whitespace-nowrap'
        animate={{
          x: ['0%', '-50%'],
        }}
        transition={{
          duration: 20,
          repeat: Number.POSITIVE_INFINITY,
          ease: 'linear',
        }}
      >
        {/* First set of testimonials */}
        {testimonials.map((testimonial) => (
          <div
            key={testimonial.id}
            className='min-w-[350px] max-w-[350px] rounded-lg bg-gray-800 p-6'
          >
            <div className='mb-4 flex items-center'>
              <h3 className='text-lg font-semibold text-white'>
                {testimonial.names}
              </h3>
            </div>
            <div className='text-sm text-gray-300'>
              <span className='font-serif text-4xl text-gray-600'>"</span>
              <p className='mt-2'>{testimonial.text}</p>
            </div>
          </div>
        ))}

        {/* Duplicate set for seamless loop */}
        {testimonials.map((testimonial) => (
          <div
            key={`${testimonial.id}-duplicate`}
            className='min-w-[350px] max-w-[350px] rounded-lg bg-gray-800 p-6'
          >
            <div className='mb-4 flex items-center'>
              <h3 className='text-lg font-semibold text-white'>
                {testimonial.names}
              </h3>
            </div>
            <div className='text-sm text-gray-300'>
              <span className='font-serif text-4xl text-gray-600'>"</span>
              <p className='mt-2'>{testimonial.text}</p>
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
