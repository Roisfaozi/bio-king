import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import {
  ExternalLink,
  FacebookIcon,
  GithubIcon,
  InstagramIcon,
  LinkedinIcon,
  Twitter,
  TwitterIcon,
  YoutubeIcon,
} from 'lucide-react';

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
  console.log('BioPagesDisplay', bioPage);

  return (
    <div
      className='flex min-h-screen flex-col items-center px-4 py-10'
      style={{ backgroundColor: colors.background, color: colors.text }}
    >
      <div className='mx-auto flex w-full max-w-md flex-col items-center'>
        {/* Profile Image */}
        <div className='mb-4'>
          <Avatar className='h-24 w-24'>
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
        <h1 className='mb-2 text-2xl font-bold'>{bioPage.title}</h1>

        {/* Bio Description */}
        {bioPage.description && (
          <p className='mb-8 text-center'>{bioPage.description}</p>
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
                    className='flex items-center justify-between p-3'
                    style={{ backgroundColor: colors.primary }}
                  >
                    <div className='flex-1'>
                      <h3
                        className='font-medium'
                        style={{ color: colors.text }}
                      >
                        {link.title}
                      </h3>
                      {link.description && (
                        <p
                          className='text-sm opacity-80'
                          style={{ color: colors.text }}
                        >
                          {link.description}
                        </p>
                      )}
                    </div>
                    <ExternalLink
                      className='h-4 w-4 flex-shrink-0'
                      style={{ color: colors.text }}
                    />
                  </CardContent>
                </Link>
              </Card>
            ))}
        </div>

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
                      borderColor: colors.primary,
                      backgroundColor: 'transparent',
                    }}
                  >
                    <SocialIcon platform={social.platform} />
                  </Button>
                </Link>
              );
            })}
          </div>
        )}

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
