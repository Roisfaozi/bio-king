import { motion } from 'framer-motion';
import Image from 'next/image';
import { MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ProfileCardSectionProps {
  profileVisible: boolean;
  titleOpacity: any;
  buttonOpacity: any;
  onLoginClick: () => void;
}

export default function ProfileCardSection({
  profileVisible,
  titleOpacity,
  buttonOpacity,
  onLoginClick,
}: ProfileCardSectionProps) {
  return (
    <section className='relative flex min-h-screen flex-col items-center justify-center px-4 py-20 sm:py-32 md:px-8 lg:px-16'>
      <div className='flex w-full max-w-5xl flex-col items-center'>
        {/* Main heading */}
        <motion.h1
          style={{ opacity: titleOpacity }}
          className='mb-6 text-center text-4xl font-bold text-white sm:text-5xl md:text-6xl lg:text-7xl'
        >
          Swipe Right®
        </motion.h1>

        {/* Description */}
        <motion.p
          style={{ opacity: titleOpacity }}
          className='mb-10 max-w-2xl text-center text-lg text-white sm:text-xl'
        >
          Match. Chat. Date. Millions of people are finding their perfect match
          on Tinder. Start your story today.
        </motion.p>

        {/* Profile cards - only shown if profile is visible */}
        {profileVisible && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ opacity: titleOpacity }}
            className='relative h-[450px] w-full max-w-lg'
          >
            <div className='absolute left-0 right-0 m-auto h-[450px] w-full max-w-md'>
              {/* Tinder-like card stack */}
              <div className='relative h-full w-full overflow-hidden rounded-2xl bg-white shadow-2xl'>
                {/* Profile image */}
                <Image
                  src='/placeholder.svg?height=450&width=350'
                  alt='Profile'
                  width={350}
                  height={450}
                  className='absolute h-full w-full object-cover'
                />

                {/* Gradient overlay */}
                <div className='absolute bottom-0 h-2/5 w-full bg-gradient-to-t from-black/80 to-transparent' />

                {/* Profile info */}
                <div className='absolute bottom-0 w-full p-6'>
                  <h2 className='text-3xl font-bold text-white'>Jessica, 23</h2>
                  <div className='flex items-center text-white'>
                    <MapPin className='mr-1 h-4 w-4' />
                    <span>2 miles away</span>
                  </div>
                  <p className='mt-2 text-sm text-white/80'>
                    Coffee enthusiast. Dog lover. Adventure seeker.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* CTA Buttons */}
        <motion.div
          style={{ opacity: buttonOpacity }}
          className='mt-8 flex w-full max-w-md flex-col items-center space-y-4'
        >
          <Button
            className='w-full rounded-full bg-gradient-to-r from-pink-500 to-rose-500 py-6 text-xl font-semibold text-white hover:from-pink-600 hover:to-rose-600'
            onClick={onLoginClick}
          >
            Create Account
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
