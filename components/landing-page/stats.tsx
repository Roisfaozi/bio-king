// In components/landing-page/stats.tsx

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { StatsCard } from './partials/stats-card';

type Stat = {
  value: string;
  label: string;
  color?: 'primary' | 'secondary' | 'purple' | 'blue' | 'green' | 'pink';
};
const Stats = ({ title, stats }: { title?: string; stats: Stat[] }) => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.3 });

  return (
    <section
      id='stats'
      className='relative bg-gradient-to-b from-slate-50 to-white py-16 dark:from-slate-900 dark:to-slate-800 md:py-24'
    >
      {/* Background effect */}
      <div
        className='bg-grid-slate-100 dark:bg-grid-slate-800/40 pointer-events-none absolute inset-0 bg-[center_-1px]'
        aria-hidden='true'
      ></div>

      <div className='mx-auto max-w-6xl px-4 sm:px-6'>
        <div className='mb-12 text-center'>
          <motion.h2
            className='mb-4 text-3xl font-bold md:text-4xl'
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {title || 'Our Impact in Numbers'}
          </motion.h2>
          <motion.div
            className='mx-auto max-w-3xl'
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <p className='text-xl text-slate-500 dark:text-slate-400'>
              Measurable results that speak volumes about our commitment to
              excellence
            </p>
          </motion.div>
        </div>

        <motion.div
          ref={containerRef}
          className='grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4'
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5 }}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
            >
              <StatsCard {...stat} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Stats;
