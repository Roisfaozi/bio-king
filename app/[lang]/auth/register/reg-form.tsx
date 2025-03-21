'use client';
import { addUser } from '@/action/auth-action';
import { SiteLogo } from '@/components/svg';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useMediaQuery } from '@/hooks/use-media-query';
import { cn } from '@/lib/utils';
import apple from '@/public/images/auth/apple.png';
import facebook from '@/public/images/auth/facebook.png';
import googleIcon from '@/public/images/auth/google.png';
import twitter from '@/public/images/auth/twitter.png';
import {
  CreateUserInput,
  createUserSchema,
} from '@/validation/auth-validation';
import { zodResolver } from '@hookform/resolvers/zod';
import { Icon } from '@iconify/react';
import { Loader2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

const RegForm = () => {
  const [isPending, startTransition] = React.useTransition();
  const [passwordType, setPasswordType] = useState('password');
  const isDesktop2xl = useMediaQuery('(max-width: 1530px)');
  const [confirmPasswordType, setConfirmPasswordType] =
    useState<boolean>(false);

  const togglePasswordType = () => {
    if (passwordType === 'text') {
      setPasswordType('password');
    } else if (passwordType === 'password') {
      setPasswordType('text');
    }
  };
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateUserInput>({
    resolver: zodResolver(createUserSchema),
    mode: 'all',
  });
  const [isVisible, setIsVisible] = React.useState<boolean>(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  const onSubmit = (data: any) => {
    startTransition(async () => {
      let response = await addUser(data);
      if (response?.status === 201) {
        toast.success(response?.message);
        reset();
        router.push('/dashboard');
      } else {
        toast.error(response?.message);
      }
    });
  };
  return (
    <div className='w-full'>
      <Link href='/' className='inline-block'>
        <SiteLogo className='h-10 w-10 text-primary 2xl:h-14 2xl:w-14' />
      </Link>
      <div className='mt-6 text-2xl font-bold text-default-900 2xl:mt-8 2xl:text-3xl'>
        Hey, Hello 👋
      </div>
      <div className='mt-2 text-base leading-6 text-default-600 2xl:text-lg'>
        Create account to start using DashTail
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className='mt-5 xl:mt-7'>
        <div className='relative'>
          <Input
            removeWrapper
            type='text'
            id='name'
            size={!isDesktop2xl ? 'xl' : 'lg'}
            placeholder=' '
            disabled={isPending}
            {...register('name')}
            className={cn('peer', {
              'border-destructive': errors.name,
            })}
          />
          <Label
            htmlFor='name'
            className='absolute start-1 top-2 z-10 origin-[0] -translate-y-5 scale-75 transform bg-background px-2 text-base text-default-600 duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4'
          >
            Full Name
          </Label>
        </div>
        <div
          className='mt-2 h-5 text-destructive'
          style={{ visibility: errors.password ? 'visible' : 'hidden' }}
        >
          {errors?.name?.message as string}
        </div>
        <div className='relative mt-4'>
          <Input
            removeWrapper
            type='email'
            id='email'
            size={!isDesktop2xl ? 'xl' : 'lg'}
            placeholder=' '
            disabled={isPending}
            {...register('email')}
            className={cn('peer', {
              'border-destructive': errors.email,
            })}
          />
          <Label
            htmlFor='email'
            className='absolute start-1 top-2 z-10 origin-[0] -translate-y-5 scale-75 transform bg-background px-2 text-base text-default-600 duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4'
          >
            Email
          </Label>
        </div>
        <div
          className='mt-2 h-5 text-destructive'
          style={{ visibility: errors.password ? 'visible' : 'hidden' }}
        >
          {errors?.email?.message as string}
        </div>
        <div className='relative mt-4'>
          <Input
            removeWrapper
            type={passwordType}
            id='password'
            size={!isDesktop2xl ? 'xl' : 'lg'}
            placeholder=' '
            disabled={isPending}
            {...register('password')}
            className={cn('peer', {
              'border-destructive': errors.password,
            })}
          />
          <Label
            htmlFor='password'
            className='absolute start-1 top-2 z-10 origin-[0] -translate-y-5 scale-75 transform bg-background px-2 text-base text-default-600 duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4'
          >
            Password
          </Label>
          <div
            className='absolute top-1/2 -translate-y-1/2 cursor-pointer ltr:right-4 rtl:left-4'
            onClick={togglePasswordType}
          >
            {passwordType === 'password' ? (
              <Icon icon='heroicons:eye' className='h-5 w-5 text-default-400' />
            ) : (
              <Icon
                icon='heroicons:eye-slash'
                className='h-5 w-5 text-default-400'
              />
            )}
          </div>
        </div>
        <div
          className='mt-2 h-5 text-destructive'
          style={{ visibility: errors.password ? 'visible' : 'hidden' }}
        >
          {errors.password?.message as string}
        </div>

        <div className='relative mt-4'>
          <Input
            removeWrapper
            type={confirmPasswordType ? 'text' : 'password'}
            id='confirmPassword'
            size={!isDesktop2xl ? 'xl' : 'lg'}
            placeholder=' '
            disabled={isPending}
            {...register('passwordConfirm')}
            className={cn('peer', {
              'border-destructive': errors.passwordConfirm,
            })}
          />
          <Label
            htmlFor='confirmPassword'
            className='absolute start-1 top-2 z-10 origin-[0] -translate-y-5 scale-75 transform bg-background px-2 text-base text-default-600 duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4'
          >
            Confirm Password
          </Label>
          <div
            className='absolute top-1/2 -translate-y-1/2 cursor-pointer ltr:right-4 rtl:left-4'
            onClick={() => setConfirmPasswordType(!confirmPasswordType)}
          >
            {confirmPasswordType ? (
              <Icon icon='heroicons:eye' className='h-5 w-5 text-default-400' />
            ) : (
              <Icon
                icon='heroicons:eye-slash'
                className='h-5 w-5 text-default-400'
              />
            )}
          </div>
        </div>

        <div
          className='mt-2 h-5 text-destructive'
          style={{ visibility: errors.passwordConfirm ? 'visible' : 'hidden' }}
        >
          {errors['passwordConfirm']?.message as string}
        </div>

        <div className='mb-8 mt-5 flex items-center gap-3'>
          <Checkbox id='terms' className='border-default-300' />
          <Label
            htmlFor='terms'
            className='text-base font-medium text-default-600'
          >
            You accept our Terms & Conditions
          </Label>
        </div>

        <Button
          className='w-full'
          disabled={isPending}
          size={!isDesktop2xl ? 'lg' : 'md'}
        >
          {isPending && <Loader2 className='mr-2 h-4 w-4 animate-spin' />}
          {isPending ? 'Registering...' : 'Create an Account'}
        </Button>
      </form>
      <div className='mt-8 flex flex-wrap justify-center gap-4'>
        <Button
          type='button'
          size='icon'
          variant='outline'
          className='rounded-full border-default-300 hover:bg-transparent'
        >
          <Image
            src={googleIcon}
            alt='google icon'
            className='h-5 w-5'
            priority={true}
          />
        </Button>
        <Button
          type='button'
          size='icon'
          variant='outline'
          className='rounded-full border-default-300 hover:bg-transparent'
        >
          <Image
            src={facebook}
            alt='google icon'
            className='h-5 w-5'
            priority={true}
          />
        </Button>
        <Button
          type='button'
          size='icon'
          variant='outline'
          className='rounded-full border-default-300 hover:bg-transparent'
        >
          <Image
            src={apple}
            alt='google icon'
            className='h-5 w-5'
            priority={true}
          />
        </Button>
        <Button
          type='button'
          size='icon'
          variant='outline'
          className='rounded-full border-default-300 hover:bg-transparent'
        >
          <Image
            src={twitter}
            alt='google icon'
            className='h-5 w-5'
            priority={true}
          />
        </Button>
      </div>
      <div className='mt-5 text-center text-base text-default-600 2xl:mt-8'>
        Already Registered?{' '}
        <Link href='/auth/login' className='text-primary'>
          Sign In
        </Link>
      </div>
    </div>
  );
};

export default RegForm;
