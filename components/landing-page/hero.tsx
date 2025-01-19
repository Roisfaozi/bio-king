import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import ScreenShot from '@/public/images/landing-page/screenshot.png';
import DashboardSceenshot from '@/public/images/landing-page/dashboard-screenshot.png';
import ProfileScreenShot from '@/public/images/landing-page/profile-screenshot.png';
import CalenderScreenshot from '@/public/images/landing-page/calender-screenshot.png';

const Hero = () => {
  return (
    <section
      className='relative bg-[url(https://dashboi-one.vercel.app/images/home/hero-bg.png)] bg-cover bg-no-repeat'
      id='home'
    >
      <div className='bg-gradient-to-b from-primary/30 to-[#fff] dark:from-primary/20 dark:to-[#0F172A]'>
        <div className='container'>
          <div className='relative z-10'>
            <div className='pt-32 md:pt-48'>
              <h1 className='mx-auto max-w-[600px] text-center text-xl font-semibold text-default-900 md:text-2xl xl:text-4xl xl:leading-[52px]'>
                <span className='text-primary'>DashTail</span> - Tailwind, React
                Next Admin Dashboard Template
              </h1>
              <p className='mx-auto mt-5 max-w-[800px] text-center text-base leading-7 text-default-700 md:text-lg md:leading-8'>
                DashTail is a developer-friendly, ready-to-use admin template
                designed for building attractive, scalable, and high-performing
                web applications, powered by the cutting-edge technologies of
                Next.js and Tailwind CSS.
              </p>
              <div className='mt-9 flex justify-center gap-4 lg:gap-8'>
                <Button asChild size='xl'>
                  <Link href='/dashboard'> View Demo </Link>
                </Button>
                <Button asChild variant='outline' size='xl'>
                  <Link
                    href='https://dash-tail.vercel.app/docs/introduction'
                    target='_blank'
                  >
                    Documentation
                  </Link>
                </Button>
              </div>
            </div>
          </div>
          <Image
            src={DashboardSceenshot}
            className='relative mt-10 lg:hidden'
            alt='screenshot'
          />
          <div className='relative -mt-20 hidden lg:block'>
            <Image src={ScreenShot} alt='screenshot' />
            <motion.div
              className='absolute left-[11%] lg:bottom-2 lg:w-[200px] xl:bottom-10 xl:w-[250px] 2xl:bottom-5 2xl:w-[280px]'
              animate={{
                y: [0, 5, 0],
              }}
              transition={{
                duration: 3,
                ease: 'linear',
                repeat: Infinity,
                repeatDelay: 0,
              }}
            >
              <Image
                src={ProfileScreenShot}
                alt='screenshot'
                className='h-full max-w-full'
              />
            </motion.div>
            <motion.div
              className='absolute right-0 top-[220px] w-[280px] xl:top-[296px] xl:w-[340px] 2xl:top-[320px] 2xl:w-[370px]'
              animate={{
                y: [0, 7, 0],
              }}
              transition={{
                duration: 3,
                ease: 'linear',
                repeat: Infinity,
                repeatDelay: 0,
              }}
            >
              <Image
                src={CalenderScreenshot}
                alt='screenshot'
                className='h-full max-w-full'
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
