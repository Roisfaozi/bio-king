'use client';
import type React from 'react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowLeft, Loader2, Mail, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (emailError) setEmailError(null);
    if (error) setError(null);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    if (passwordError) setPasswordError(null);
    if (error) setError(null);
  };

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    // Reset errors
    setEmailError(null);
    setPasswordError(null);
    setError(null);

    // Validate inputs
    let isValid = true;

    if (!email) {
      setEmailError('Email is required');
      isValid = false;
    } else if (!validateEmail(email)) {
      setEmailError('Please enter a valid email address');
      isValid = false;
    }

    if (!password) {
      setPasswordError('Password is required');
      isValid = false;
    } else if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters');
      isValid = false;
    }

    if (!isValid) return;

    // Simulate login
    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // For demo purposes, always succeed
      console.log('Login successful with:', { email, password });

      // Close modal after successful login
      onClose();
    } catch (err) {
      setError('Login failed. Please check your credentials and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setEmail('');
    setPassword('');
    setEmailError(null);
    setPasswordError(null);
    setError(null);
    setIsLoading(false);
  };

  const handleBackToOptions = () => {
    resetForm();
    setShowEmailForm(false);
  };

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

              {showEmailForm ? (
                <>
                  {/* Back button */}
                  <button
                    onClick={handleBackToOptions}
                    className='absolute left-0 top-0 text-gray-400 transition-colors hover:text-white'
                  >
                    <ArrowLeft className='h-6 w-6' />
                  </button>

                  {/* Email login form */}
                  <div className='mt-8'>
                    <h2 className='mb-6 text-center text-[28px] font-bold text-white'>
                      Log in with email
                    </h2>

                    {error && (
                      <div className='mb-4 rounded-md bg-red-900/30 p-3'>
                        <p className='text-sm text-red-300'>{error}</p>
                      </div>
                    )}

                    <form onSubmit={handleEmailLogin} className='space-y-4'>
                      <div>
                        <label
                          htmlFor='email'
                          className='mb-1 block text-sm text-gray-400'
                        >
                          Email
                        </label>
                        <input
                          type='email'
                          id='email'
                          value={email}
                          onChange={handleEmailChange}
                          className={`w-full border bg-[#1a1a1a] ${
                            emailError ? 'border-red-500' : 'border-gray-700'
                          } rounded-md px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#fe3c72]`}
                          placeholder='your.email@example.com'
                          disabled={isLoading}
                        />
                        {emailError && (
                          <p className='mt-1 text-xs text-red-500'>
                            {emailError}
                          </p>
                        )}
                      </div>

                      <div>
                        <label
                          htmlFor='password'
                          className='mb-1 block text-sm text-gray-400'
                        >
                          Password
                        </label>
                        <input
                          type='password'
                          id='password'
                          value={password}
                          onChange={handlePasswordChange}
                          className={`w-full border bg-[#1a1a1a] ${
                            passwordError ? 'border-red-500' : 'border-gray-700'
                          } rounded-md px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#fe3c72]`}
                          placeholder='••••••••'
                          disabled={isLoading}
                        />
                        {passwordError && (
                          <p className='mt-1 text-xs text-red-500'>
                            {passwordError}
                          </p>
                        )}
                      </div>

                      <Button
                        type='submit'
                        className='h-[52px] w-full rounded-[4px] bg-gradient-to-r from-pink-500 to-rose-500 py-6 text-base font-semibold text-white hover:from-pink-600 hover:to-rose-600'
                        disabled={isLoading}
                      >
                        {isLoading ? (
                          <span className='flex items-center justify-center'>
                            <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                            Logging in...
                          </span>
                        ) : (
                          'Log in'
                        )}
                      </Button>
                    </form>

                    <div className='mt-4 text-center'>
                      <Link
                        href='#'
                        className='text-sm text-[#3991f1] hover:underline'
                      >
                        Forgot password?
                      </Link>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  {/* Tinder Logo */}
                  <div className='mb-6 flex justify-center'>
                    <svg
                      viewBox='0 0 24 24'
                      className='h-10 w-10 fill-current text-[#fe3c72]'
                    >
                      <path d='M16.5 11.5c0 2.5-1.5 4.5-4.5 4.5-2 0-4.5-2-4.5-4.5C7.5 9 9.5 7 12 7s4.5 2 4.5 4.5zm-4.5 6c3.5 0 6.5-2 6.5-6.5S15.5 5 12 5 5.5 7 5.5 11.5 9 17.5 12 17.5z' />
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

                    <Button
                      variant='outline'
                      className='h-[52px] w-full rounded-[4px] border border-white/20 bg-transparent text-base font-medium text-white hover:bg-white/5'
                      onClick={() => setShowEmailForm(true)}
                    >
                      <Mail className='mr-2 h-5 w-5' />
                      Log in with email
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
                      <Link
                        href='#'
                        className='relative block h-[40px] w-[130px]'
                      >
                        <Image
                          src='https://tinder.com/static/build/d256a5b510a685030be375c63a9010e1.webp'
                          alt='Download on the App Store'
                          fill
                          className='object-contain'
                        />
                      </Link>
                      <Link
                        href='#'
                        className='relative block h-[40px] w-[130px]'
                      >
                        <Image
                          src='https://tinder.com/static/build/03adb6c1e6325a1c4b404d29927a8fe0.webp'
                          alt='Get it on Google Play'
                          fill
                          className='object-contain'
                        />
                      </Link>
                    </div>
                  </div>
                </>
              )}
            </motion.div>
          </DialogContent>
        )}
      </AnimatePresence>
    </Dialog>
  );
}
