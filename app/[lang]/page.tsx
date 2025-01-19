'use client';
import { Button } from '@/components/ui/button';
import logo from '@/public/images/logo/logo-2.png';
import DarkImage from '@/public/images/utility/construction-dark.png';
import LightImage from '@/public/images/utility/construction-light.png';
import { Facebook, Instagram, Linkedin, Twitter } from 'lucide-react';
import { useTheme } from 'next-themes';
import Image from 'next/image';
import Link from 'next/link';
const CommingSoonPage = () => {
  const { theme } = useTheme();
  const socials = [
    {
      link: '/',
      icon: <Twitter />,
    },
    {
      link: '/',
      icon: <Facebook />,
    },
    {
      link: '/',
      icon: <Linkedin />,
    },
    {
      link: '/',
      icon: <Instagram />,
    },
  ];
  const menu = [
    {
      label: 'Privacy Policy',
      link: '/',
    },
    {
      label: 'FAQ',
      link: '/',
    },
    {
      label: 'Email Us',
      link: '/',
    },
  ];
  return (
    <div className='flex min-h-screen flex-col'>
      {/* header */}
      <div className='flex flex-none flex-wrap justify-between gap-4 p-10'>
        <div className='h-[38px] w-[170px]'>
          <Image src={logo} alt='logo' className='h-full w-full object-cover' />
        </div>
        <Button asChild variant='outline' size='lg'>
          <Link href='/dashboard'>Contact Us</Link>
        </Button>
      </div>
      {/* main */}
      <div className='flex flex-1 flex-col justify-center'>
        <div className='container flex flex-col items-center'>
          <div className='h-full w-full lg:h-[432px] lg:w-[700px]'>
            <Image
              src={theme === 'dark' ? DarkImage : LightImage}
              alt='construction'
              className='h-full w-full object-cover'
            />
          </div>
          <div className='mt-12 text-center text-xl font-semibold text-default-900 md:text-3xl lg:mt-20 lg:text-5xl'>
            We are under maintenance.
          </div>
          <div className='mt-4 text-center text-sm text-default-600 md:text-base lg:text-xl'>
            We’re making the system more awesome.
            <br /> We’ll be back shortly.
          </div>
        </div>
      </div>
      {/* footer */}
      <div className='flex flex-none flex-col flex-wrap items-center gap-4 p-10 sm:flex-row'>
        <div className='flex flex-1 flex-wrap items-center gap-4'>
          {socials.map((item, index) => (
            <Button
              key={`social-icon-${index}`}
              size='icon'
              variant='outline'
              className='rounded-full'
              asChild
            >
              <Link href={item.link}> {item.icon} </Link>
            </Button>
          ))}
        </div>
        <ul className='flex flex-none flex-wrap gap-6'>
          {menu.map((item, index) => (
            <li key={`nav-item-${index}`}>
              <Link
                href={item.link}
                className='text-base font-medium text-default-600 hover:text-primary'
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CommingSoonPage;
