import LogInForm from '@/components/auth/login-form';
import auth3Dark from '@/public/images/auth/auth3-dark.png';
import auth3Light from '@/public/images/auth/auth3-light.png';
import Image from 'next/image';
const LoginPage = () => {
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
      <div className='relative z-10 m-4 w-full max-w-xl rounded-xl bg-background p-10 py-5 xl:p-12 2xl:p-16'>
        <LogInForm />
      </div>
    </div>
  );
};

export default LoginPage;
