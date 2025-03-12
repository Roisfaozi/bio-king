'use client';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  ExternalLink,
  FacebookIcon,
  GithubIcon,
  InstagramIcon,
  LinkedinIcon,
  TwitterIcon,
  YoutubeIcon,
} from 'lucide-react';
import { useTheme } from 'next-themes';
import Link from 'next/link';
import { useEffect, useState } from 'react';

function SocialIcon({ platform }: { platform: string }) {
  switch (platform) {
    case 'twitter':
      return <TwitterIcon className='h-5 w-5' />;
    case 'instagram':
      return <InstagramIcon className='h-5 w-5' />;
    case 'youtube':
      return <YoutubeIcon className='h-5 w-5' />;
    case 'linkedin':
      return <LinkedinIcon className='h-5 w-5' />;
    case 'facebook':
      return <FacebookIcon className='h-5 w-5' />;
    case 'github':
      return <GithubIcon className='h-5 w-5' />;
    default:
      return <ExternalLink className='h-5 w-5' />;
  }
}

interface BioPagesDisplayProps {
  bioPage: any; // Sesuaikan dengan tipe data dari prisma
  themeConfig: {
    name: string;
    label: string;
    colors: {
      primary: string;
      text: string;
      background: string;
      darkPrimary: string;
      darkText: string;
      darkBackground: string;
    };
  };
}

export function BioPagesDisplay({
  bioPage,
  themeConfig,
}: BioPagesDisplayProps) {
  // Gunakan warna dari theme config
  const { colors } = themeConfig;
  const [isDarkMode, setIsDarkMode] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    setIsDarkMode(theme === 'dark');
  }, [theme]);

  const handleToggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };
  const clr = isDarkMode
    ? {
        primary: colors?.darkPrimary || colors?.primary || '#4F46E5',
        text: colors?.darkText || '#FFFFFF',
        background: colors?.darkBackground || '#111827',
      }
    : {
        primary: colors?.primary || '#4F46E5',
        text: colors?.text || '#111827',
        background: colors?.background || '#FFFFFF',
      };
  return (
    <div
      className='flex min-h-screen flex-col items-center px-4 py-10'
      style={{
        backgroundColor: clr.background,
        color: clr.text,
      }}
    >
      <div className='mx-auto flex w-full max-w-lg flex-col items-center'>
        {/* Profile Image */}
        <div className='mb-4'>
          <Avatar className='h-32 w-32'>
            {bioPage.profile_image_url ? (
              <AvatarImage
                src={bioPage.profile_image_url}
                alt={bioPage.title || bioPage.username}
              />
            ) : (
              <AvatarFallback>
                {bioPage.username.substring(0, 2).toUpperCase()}
              </AvatarFallback>
            )}
          </Avatar>
        </div>

        {/* Bio Title */}
        <h1
          className='mb-2 text-center text-2xl font-bold'
          style={{ color: clr.text }}
        >
          {bioPage.title}
        </h1>

        {/* Bio Description */}
        {bioPage.description && (
          <p className='mb-8 text-center' style={{ color: clr.text }}>
            {bioPage.description}
          </p>
        )}

        {/* Social Links */}
        {bioPage.socialLinks && bioPage.socialLinks.length > 0 && (
          <div className='mb-8 flex flex-wrap justify-center gap-4'>
            {bioPage.socialLinks.map((social: any, index: number) => {
              return (
                <Link
                  key={index}
                  href={social.url}
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  <Button
                    variant='outline'
                    size='icon'
                    className='rounded-full'
                    style={{
                      borderColor: clr.primary,
                      backgroundColor: 'transparent',
                      color: clr.text,
                    }}
                  >
                    <SocialIcon platform={social.platform} />
                  </Button>
                </Link>
              );
            })}
          </div>
        )}

        {/* Links */}
        <div className='mb-8 w-full space-y-3'>
          {bioPage.bioLinks &&
            bioPage.bioLinks.map((link: any, index: number) => (
              <Card
                key={index}
                className='w-full overflow-hidden border-0 shadow-sm'
              >
                <Link
                  href={link.url}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='block'
                >
                  <CardContent
                    className='flex items-center justify-between p-4'
                    style={{
                      backgroundColor: clr.primary,
                    }}
                  >
                    <div className='flex-1'>
                      <h3
                        className='text-lg font-medium'
                        style={{
                          color: clr.background,
                        }}
                      >
                        {link.title}
                      </h3>
                    </div>
                    <ExternalLink
                      className='h-4 w-4 flex-shrink-0'
                      style={{
                        color: clr.background,
                      }}
                    />
                  </CardContent>
                </Link>
              </Card>
            ))}
        </div>

        <button
          className='absolute right-4 top-4'
          onClick={handleToggleDarkMode}
        >
          {isDarkMode ? (
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-6 w-6'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z'
              />
            </svg>
          ) : (
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-6 w-6'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707-1.414-1.414l.707.707 1.414-1.414l.707.707'
              />
            </svg>
          )}
        </button>
        {/* Footer */}
        <div className='mt-auto pt-6 text-center text-sm opacity-70'>
          <p>
            &copy; {new Date().getFullYear()} {bioPage.username}
          </p>
          {bioPage.show_branding && (
            <div className='mt-2'>
              <Badge variant='outline' className='text-xs'>
                Made with Your Platform Name
              </Badge>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
