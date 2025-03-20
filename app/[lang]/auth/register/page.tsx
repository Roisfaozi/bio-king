'use client';
import auth3Dark from '@/public/images/auth/auth3-dark.png';
import auth3Light from '@/public/images/auth/auth3-light.png';
import Image from 'next/image';
import RegForm from './reg-form';
const RegisterPage = () => {
  return (
    <div className='loginwrapper relative flex items-center justify-center overflow-hidden'>
      <Image
        src={auth3Dark}
        alt='background image'
        className='light:hidden absolute left-0 top-0 h-full w-full'
      />
      <Image
        src={auth3Light}
        alt='background image'
        className='absolute left-0 top-0 h-full w-full dark:hidden'
      />
      <div className='relative z-10 m-4 w-full max-w-xl rounded-xl bg-card p-10 xl:p-12 2xl:p-16'>
        <RegForm />
      </div>
    </div>
  );
};

export default RegisterPage;
