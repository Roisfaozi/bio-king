'use client';

import { motion } from 'framer-motion';

const BrandsSection = () => {
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

  return (
    <section className='relative overflow-hidden py-24 sm:py-32'>
      {/* Animated background elements */}
      <div className='absolute inset-0 -z-10 bg-[radial-gradient(circle_at_30%_20%,rgba(120,119,198,0.05),transparent_25%),radial-gradient(circle_at_70%_60%,rgba(120,119,198,0.1),transparent_25%)]' />
      <div className='absolute -right-40 -top-40 h-80 w-80 rounded-full bg-purple-200/20 blur-3xl' />
      <div className='absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-blue-200/20 blur-3xl' />

      <div className='container relative px-4 md:px-6'>
        <div className='flex flex-col items-center justify-center space-y-16'>
          {/* Header with animated underline */}
          <div className='relative text-center'>
            <motion.span
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className='text-sm font-medium tracking-widest text-muted-foreground'
            >
              POWERING INNOVATION ACROSS THE GLOBE
            </motion.span>
            <motion.h2
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className='mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl'
            >
              Trusted by Industry Leaders
            </motion.h2>
            <motion.div
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{ duration: 1, delay: 0.5 }}
              className='mx-auto mt-4 h-1 w-24 bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-500'
            />
          </div>

          {/* 3D rotating brand carousel */}
          <div className='mx-auto w-full max-w-6xl'>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
              className='relative py-10'
            >
              <motion.div
                animate={{ x: [0, -1500] }}
                transition={{
                  duration: 40,
                  repeat: Infinity,
                  repeatType: 'loop',
                  ease: 'linear',
                }}
                className='flex space-x-16'
              >
                {/* First set of brands */}
                {brands.concat(brands).map((brand, i) => (
                  <motion.div
                    key={`brand-${i}`}
                    whileHover={{ scale: 1.1, y: -5 }}
                    className='group flex-shrink-0'
                  >
                    <div className='relative flex h-20 w-40 items-center justify-center overflow-hidden rounded-xl border border-foreground/5 bg-background/50 px-6 shadow-lg backdrop-blur-sm transition-all duration-300 hover:border-primary/20 hover:shadow-primary/10'>
                      <span className='bg-gradient-to-r from-foreground to-foreground bg-clip-text text-xl font-bold text-transparent transition-all duration-300 group-hover:from-primary group-hover:to-blue-500'>
                        {brand}
                      </span>
                      <div className='absolute inset-0 rounded-xl ring-1 ring-inset ring-foreground/5 group-hover:ring-primary/20' />
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BrandsSection;
