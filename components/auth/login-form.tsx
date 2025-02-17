'use client';
import { SiteLogo } from '@/components/svg';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { Icon } from '@iconify/react';
import { Loader2 } from 'lucide-react';
import { signIn } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { z } from 'zod';

import { useMediaQuery } from '@/hooks/use-media-query';
import facebook from '@/public/images/auth/facebook.png';
import GithubIcon from '@/public/images/auth/github.png';
import googleIcon from '@/public/images/auth/google.png';
import twitter from '@/public/images/auth/twitter.png';

const schema = z.object({
  email: z.string().email({ message: 'Your email is invalid.' }),
  password: z.string().min(4),
});

const LogInForm = () => {
  const [isPending, startTransition] = React.useTransition();
  const [passwordType, setPasswordType] = React.useState('password');
  const isDesktop2xl = useMediaQuery('(max-width: 1530px)');

  const togglePasswordType = () => {
    if (passwordType === 'text') {
      setPasswordType('password');
    } else if (passwordType === 'password') {
      setPasswordType('text');
    }
  };
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    mode: 'all',
    defaultValues: {
      email: 'admin@kingbyt.com',
      password: 'password',
    },
  });
  const [isVisible, setIsVisible] = React.useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  const onSubmit = (data: { email: string; password: string }) => {
    startTransition(async () => {
      let response = await signIn('credentials', {
        email: data.email,
        password: data.password,
        redirect: false,
      });
      if (response?.ok) {
        toast.success('Login Successful');
        window.location.assign('/dashboard');
        reset();
      } else if (response?.error) {
        toast.error(response?.error);
      }
    });
  };
  return (
    <div className='w-full py-10'>
      <Link href='/' className='inline-block'>
        <SiteLogo className='h-10 w-10 text-primary 2xl:h-14 2xl:w-14' />
      </Link>
      <div className='mt-6 text-2xl font-bold text-default-900 2xl:mt-8 2xl:text-3xl'>
        Hey, Hello 👋
      </div>
      <div className='text-base leading-6 text-default-600 2xl:mt-2 2xl:text-lg'>
        Enter the information you entered while registering.
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className='mt-5 2xl:mt-7'>
        <div>
          <Label htmlFor='email' className='mb-2 font-medium text-default-600'>
            Email{' '}
          </Label>
          <Input
            disabled={isPending}
            {...register('email')}
            type='email'
            id='email'
            className={cn('', {
              'border-destructive': errors.email,
            })}
            size={!isDesktop2xl ? 'xl' : 'lg'}
          />
        </div>
        {errors.email && (
          <div className='mt-2 text-destructive'>{errors.email.message}</div>
        )}

        <div className='mt-3.5'>
          <Label
            htmlFor='password'
            className='mb-2 font-medium text-default-600'
          >
            Password{' '}
          </Label>
          <div className='relative'>
            <Input
              disabled={isPending}
              {...register('password')}
              type={passwordType}
              id='password'
              className='peer'
              size={!isDesktop2xl ? 'xl' : 'lg'}
              placeholder=' '
            />

            <div
              className='absolute top-1/2 -translate-y-1/2 cursor-pointer ltr:right-4 rtl:left-4'
              onClick={togglePasswordType}
            >
              {passwordType === 'password' ? (
                <Icon
                  icon='heroicons:eye'
                  className='h-5 w-5 text-default-400'
                />
              ) : (
                <Icon
                  icon='heroicons:eye-slash'
                  className='h-5 w-5 text-default-400'
                />
              )}
            </div>
          </div>
        </div>
        {errors.password && (
          <div className='mt-2 text-destructive'>{errors.password.message}</div>
        )}

        <div className='mb-8 mt-5 flex flex-wrap gap-2'>
          <div className='flex flex-1 items-center gap-1.5'>
            <Checkbox
              size='sm'
              className='mt-[1px] border-default-300'
              id='isRemebered'
            />
            <Label
              htmlFor='isRemebered'
              className='cursor-pointer whitespace-nowrap text-sm text-default-600'
            >
              Remember me
            </Label>
          </div>
          <Link href='/auth/forgot' className='flex-none text-sm text-primary'>
            Forget Password?
          </Link>
        </div>
        <Button
          className='w-full'
          disabled={isPending}
          size={!isDesktop2xl ? 'lg' : 'md'}
        >
          {isPending && <Loader2 className='mr-2 h-4 w-4 animate-spin' />}
          {isPending ? 'Loading...' : 'Sign In'}
        </Button>
      </form>
      <div className='mt-6 flex flex-wrap justify-center gap-4 xl:mt-8'>
        <Button
          type='button'
          size='icon'
          variant='outline'
          className='rounded-full border-default-300 hover:bg-transparent'
          disabled={isPending}
          onClick={() =>
            signIn('google', {
              callbackUrl: '/dashboard',
            })
          }
        >
          <Image src={googleIcon} alt='google' className='h-5 w-5' />
        </Button>
        <Button
          type='button'
          size='icon'
          variant='outline'
          className='rounded-full border-default-300 hover:bg-transparent'
          disabled={isPending}
          onClick={() =>
            signIn('github', {
              callbackUrl: '/dashboard',
              redirect: false,
            })
          }
        >
          <Image src={GithubIcon} alt='google' className='h-5 w-5' />
        </Button>
        <Button
          type='button'
          size='icon'
          variant='outline'
          className='rounded-full border-default-300 hover:bg-transparent'
        >
          <Image src={facebook} alt='google' className='h-5 w-5' />
        </Button>
        <Button
          type='button'
          size='icon'
          variant='outline'
          className='rounded-full border-default-300 hover:bg-transparent'
        >
          <Image src={twitter} alt='google' className='h-5 w-5' />
        </Button>
      </div>
      <div className='mt-5 text-center text-base text-default-600 2xl:mt-8'>
        Don't have an account?{' '}
        <Link href='/auth/register' className='text-primary'>
          {' '}
          Sign Up{' '}
        </Link>
      </div>
    </div>
  );
};

export default LogInForm;
