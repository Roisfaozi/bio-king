'use client';
import DropdownBio from '@/app/[lang]/(dashboard)/(main)/bio-pages/components/dropdown-bio';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { credentialsConfig } from '@/config/credentials.config';
import { formatEpochDate } from '@/lib/utils';
import { BioPagesWithClicksResponse } from '@/models/bio-page-response';
import { Calendar, Eye } from 'lucide-react';
import Link from 'next/link';

interface BioPageProps {
  bio: BioPagesWithClicksResponse;
}

const BioCard = ({ bio }: BioPageProps) => {
  /**
   * @description Bio card component
   * temporary avatar
   * should be
   * bio?.profile_image_url
   */

  const avatar = bio?.profile_image_url!;

  return (
    <div className='right-0 z-50 h-full w-full flex-none'>
      {' '}
      <Card className='h-full overflow-hidden'>
        <CardHeader>
          <div className='flex items-start justify-end'>
            <DropdownBio id={bio.id} />
          </div>
          <div className='flex flex-col items-center gap-2'>
            <Avatar className='h-16 w-16 lg:h-32 lg:w-32'>
              <AvatarImage
                src={avatar}
                alt={bio?.title}
                className='object-cover'
              />
              <AvatarFallback>{bio?.title.slice(0, 2)}</AvatarFallback>
            </Avatar>
            <div className='mt-3 text-lg font-semibold text-default-900 lg:text-xl'>
              {bio?.title}
            </div>
            <div className='line-clamp-2 text-center text-sm text-default-600'>
              <Link
                href={`/bio/${bio.username}`}
                target='_blank'
                rel='noopener noreferrer'
              >
                {`${credentialsConfig.siteUrl}/bio/${bio.username}`}
              </Link>
            </div>
          </div>
        </CardHeader>

        <CardContent className='h-[calc(100%-260px)] overflow-hidden border-0 px-0'>
          <div className='flex items-center justify-start gap-6 px-4 py-3.5'>
            <div className='flex gap-4'>
              <div className='h-4 w-4 text-default-400'>
                <Eye />
              </div>
              <p className='text-base font-medium text-default-800'>
                {bio?._count?.clicks || 0} Views
              </p>
            </div>
            <div className='flex gap-4'>
              <div className='h-4 w-4 text-default-400'>
                <Calendar />
              </div>
              <p className='text-base font-medium text-default-800'>
                {bio?.created_at ? (
                  <time
                    dateTime={new Date(Number(bio.created_at)).toISOString()}
                    title={formatEpochDate(Number(bio.created_at), 'PPP')}
                  >
                    {formatEpochDate(Number(bio.created_at), 'PP')}
                  </time>
                ) : (
                  <span>&mdash;</span>
                )}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BioCard;
