'use client';
import { useSession, signOut } from 'next-auth/react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Icon } from '@iconify/react';
import Image from 'next/image';
import Link from 'next/link';
import avatar5 from '@/public/images/avatar/avatar-5.jpg';
const ProfileInfo = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className='cursor-pointer'>
        <div className='flex items-center'>
          <Image
            src={avatar5}
            alt=''
            width={36}
            height={36}
            className='rounded-full'
          />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-56 p-0' align='end'>
        <DropdownMenuLabel className='mb-1 flex items-center gap-2 p-3'>
          <Image
            src={avatar5}
            alt=''
            width={36}
            height={36}
            className='rounded-full'
          />
          <div>
            <div className='text-sm font-medium capitalize text-default-800'>
              {'Mcc Callem'}
            </div>
            <Link
              href='/dashboard'
              className='text-xs text-default-600 hover:text-primary'
            >
              @uxuidesigner
            </Link>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuGroup>
          {[
            {
              name: 'profile',
              icon: 'heroicons:user',
              href: '/user-profile',
            },
            {
              name: 'Billing',
              icon: 'heroicons:megaphone',
              href: '/dashboard',
            },
            {
              name: 'Settings',
              icon: 'heroicons:paper-airplane',
              href: '/dashboard',
            },
            {
              name: 'Keyboard shortcuts',
              icon: 'heroicons:language',
              href: '/dashboard',
            },
          ].map((item, index) => (
            <Link
              href={item.href}
              key={`info-menu-${index}`}
              className='cursor-pointer'
            >
              <DropdownMenuItem className='flex cursor-pointer items-center gap-2 px-3 py-1.5 text-sm font-medium capitalize text-default-600 dark:hover:bg-background'>
                <Icon icon={item.icon} className='h-4 w-4' />
                {item.name}
              </DropdownMenuItem>
            </Link>
          ))}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <Link href='/dashboard' className='cursor-pointer'>
            <DropdownMenuItem className='flex cursor-pointer items-center gap-2 px-3 py-1.5 text-sm font-medium capitalize text-default-600 dark:hover:bg-background'>
              <Icon icon='heroicons:user-group' className='h-4 w-4' />
              team
            </DropdownMenuItem>
          </Link>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger className='flex items-center gap-2 px-3 py-1.5 text-sm font-medium capitalize text-default-600 dark:hover:bg-background'>
              <Icon icon='heroicons:user-plus' className='h-4 w-4' />
              Invite user
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                {[
                  {
                    name: 'email',
                  },
                  {
                    name: 'message',
                  },
                  {
                    name: 'facebook',
                  },
                ].map((item, index) => (
                  <Link
                    href='/dashboard'
                    key={`message-sub-${index}`}
                    className='cursor-pointer'
                  >
                    <DropdownMenuItem className='cursor-pointer px-3 py-1.5 text-sm font-medium capitalize text-default-600 dark:hover:bg-background'>
                      {item.name}
                    </DropdownMenuItem>
                  </Link>
                ))}
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
          <Link href='/dashboard'>
            <DropdownMenuItem className='flex cursor-pointer items-center gap-2 px-3 py-1.5 text-sm font-medium capitalize text-default-600 dark:hover:bg-background'>
              <Icon icon='heroicons:variable' className='h-4 w-4' />
              Github
            </DropdownMenuItem>
          </Link>

          <DropdownMenuSub>
            <DropdownMenuSubTrigger className='flex cursor-pointer items-center gap-2 px-3 py-1.5 text-sm font-medium capitalize text-default-600 dark:hover:bg-background'>
              <Icon icon='heroicons:phone' className='h-4 w-4' />
              Support
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                {[
                  {
                    name: 'portal',
                  },
                  {
                    name: 'slack',
                  },
                  {
                    name: 'whatsapp',
                  },
                ].map((item, index) => (
                  <Link href='/dashboard' key={`message-sub-${index}`}>
                    <DropdownMenuItem className='cursor-pointer px-3 py-1.5 text-sm font-medium capitalize text-default-600 dark:hover:bg-background'>
                      {item.name}
                    </DropdownMenuItem>
                  </Link>
                ))}
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
        </DropdownMenuGroup>
        <DropdownMenuSeparator className='mb-0 dark:bg-background' />
        <DropdownMenuItem
          onSelect={() => signOut()}
          className='my-1 flex cursor-pointer items-center gap-2 px-3 text-sm font-medium capitalize text-default-600 dark:hover:bg-background'
        >
          <Icon icon='heroicons:power' className='h-4 w-4' />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
export default ProfileInfo;
