import React from 'react';
import { Icon } from '@iconify/react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Settings } from '@/components/svg';
import { useSession, signIn, signOut } from 'next-auth/react';
import Image from 'next/image';
import avatar5 from '@/public/images/avatar/avatar-5.jpg';
const FooterMenu = () => {
  return (
    <div className='flex flex-col items-center justify-center space-y-5 pb-6'>
      <button className='mx-auto flex h-11 w-11 items-center justify-center rounded-md text-default-500 transition-all duration-200 hover:bg-primary hover:text-primary-foreground'>
        <Settings className='h-8 w-8' />
      </button>
      <div>
        <Image
          src={avatar5}
          alt=''
          width={36}
          height={36}
          className='rounded-full'
        />
      </div>
    </div>
  );
};
export default FooterMenu;
