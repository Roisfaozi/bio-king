'use client';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LoginModal({ isOpen, onClose }: LoginModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <AnimatePresence>
        {isOpen && (
          <DialogContent className='w-full max-w-[400px] rounded-none border-none bg-[#0d0d0d] p-6 sm:rounded-xl'>
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -10 }}
              animate={{
                opacity: 1,
                scale: 1,
                y: 0,
                transition: {
                  duration: 0.5,
                  ease: [0.16, 1, 0.3, 1], // Custom spring-like easing
                },
              }}
              exit={{
                opacity: 0,
                scale: 0.95,
                y: 10,
                transition: {
                  duration: 0.4,
                  ease: [0.4, 0, 0.2, 1],
                },
              }}
              className='relative'
            >
              {/* Close button */}
              <button
                onClick={onClose}
                className='absolute right-0 top-0 text-gray-400 transition-colors hover:text-white'
              >
                <X className='h-6 w-6' />
              </button>

              {/* Tinder Logo */}
              <div className='mb-6 flex justify-center'>
                <svg
                  viewBox='0 0 24 24'
                  className='h-10 w-10 fill-current text-[#fe3c72]'
                >
                  <path d='M16.5 11.5c0 2.5-1.5 4.5-4.5 4.5-2 0-4.5-2-4.5-4.5C7.5 9 9.5 7 12 7s4.5 2 4.5 4.5zm-4.5 6c3.5 0 6.5-2 6.5-6.5S15.5 5 12 5 5.5 7 5.5 11.5 9 17.5 12 17.5z' />
                  <path d='M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.6 0 12 0zm0 22.5C6.2 22.5 1.5 17.8 1.5 12S6.2 1.5 12 1.5 22.5 6.2 22.5 12 17.8 22.5 12 22.5z' />
                </svg>
              </div>

              {/* Heading */}
              <h2 className='mb-4 text-center text-[28px] font-bold text-white'>
                Get started
              </h2>

              {/* Terms text */}
              <p className='mb-6 text-center text-[13px] leading-5 text-gray-400'>
                By tapping Log in or Continue, you agree to our{' '}
                <Link href='#' className='text-[#3991f1] hover:underline'>
                  Terms
                </Link>
                . Learn how we process your data in our{' '}
                <Link href='#' className='text-[#3991f1] hover:underline'>
                  Privacy Policy
                </Link>{' '}
                and{' '}
                <Link href='#' className='text-[#3991f1] hover:underline'>
                  Cookie Policy
                </Link>
                .
              </p>

              {/* Login buttons */}
              <div className='space-y-3'>
                <Button
                  variant='outline'
                  className='h-[52px] w-full rounded-[4px] border-none bg-[#4285f4] text-base font-medium text-white hover:bg-[#4285f4]/90'
                >
                  <Image
                    src='https://authjs.dev/img/providers/google.svg'
                    alt='Google'
                    width={20}
                    height={20}
                    className='mr-2'
                  />
                  Lanjutkan dengan Google
                </Button>

                <Button
                  variant='outline'
                  className='h-[52px] w-full rounded-[4px] border-none bg-[#00b900] text-base font-medium text-white hover:bg-[#00b900]/90'
                >
                  <Image
                    src='https://authjs.dev/img/providers/line.svg'
                    alt='LINE'
                    width={20}
                    height={20}
                    className='mr-2'
                  />
                  Log in with LINE
                </Button>

                <Button
                  variant='outline'
                  className='h-[52px] w-full rounded-[4px] border-none bg-[#1877f2] text-base font-medium text-white hover:bg-[#1877f2]/90'
                >
                  <Image
                    src='https://authjs.dev/img/providers/facebook.svg'
                    alt='Facebook'
                    width={20}
                    height={20}
                    className='mr-2'
                  />
                  Login with Facebook
                </Button>

                <Button
                  variant='outline'
                  className='h-[52px] w-full rounded-[4px] border border-white/20 bg-transparent text-base font-medium text-white hover:bg-white/5'
                >
                  <svg
                    viewBox='0 0 24 24'
                    className='mr-2 h-5 w-5 fill-current'
                  >
                    <path d='M16.5 11.5c0 2.5-1.5 4.5-4.5 4.5-2 0-4.5-2-4.5-4.5C7.5 9 9.5 7 12 7s4.5 2 4.5 4.5zm-4.5 6c3.5 0 6.5-2 6.5-6.5S15.5 5 12 5 5.5 7 5.5 11.5 9 17.5 12 17.5z' />
                  </svg>
                  Log in with phone number
                </Button>
              </div>

              {/* Trouble logging in */}
              <div className='mt-6 text-center'>
                <Link
                  href='#'
                  className='text-sm text-[#3991f1] hover:underline'
                >
                  Trouble logging in?
                </Link>
              </div>

              {/* Get the app */}
              <div className='mt-8'>
                <h3 className='mb-4 text-center font-semibold text-white'>
                  Get the app!
                </h3>
                <div className='flex justify-center space-x-4'>
                  <Link href='#' className='relative block h-[40px] w-[130px]'>
                    <Image
                      src='https://tinder.com/static/build/d256a5b510a685030be375c63a9010e1.webp'
                      alt='Download on the App Store'
                      fill
                      className='object-contain'
                    />
                  </Link>
                  <Link href='#' className='relative block h-[40px] w-[130px]'>
                    <Image
                      src='https://tinder.com/static/build/03adb6c1e6325a1c4b404d29927a8fe0.webp'
                      alt='Get it on Google Play'
                      fill
                      className='object-contain'
                    />
                  </Link>
                </div>
              </div>
            </motion.div>
          </DialogContent>
        )}
      </AnimatePresence>
    </Dialog>
  );
}
