'use client';
import { Web } from '@/components/svg';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { InputGroup, InputGroupText } from '@/components/ui/input-group';
import { toast } from '@/components/ui/use-toast';
import { credentialsConfig } from '@/config/credentials.config';
import { copyToClipboard, formatEpochDate } from '@/lib/utils';
import { RecentLinkResponse } from '@/models/shortlink-response';
import { Icon } from '@iconify/react';
import { ChartBar, Copy, Eye, MoreHorizontal, Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface RecentLinkProps {
  recentLinks: RecentLinkResponse[];
}

const RecentLink = ({ recentLinks }: RecentLinkProps) => {
  const router = useRouter();
  return (
    <Card>
      <CardHeader className='flex-row items-center justify-between border-none pb-0'>
        <CardTitle className='font-semibold'> Recent Link </CardTitle>
      </CardHeader>
      <CardContent className='px-4'>
        <div>
          <InputGroup merged>
            <InputGroupText>
              <Icon icon='heroicons:magnifying-glass' />
            </InputGroupText>
            <Input type='text' placeholder='Search for links' />
          </InputGroup>
        </div>
      </CardContent>
      {recentLinks.map((link) => (
        <LinkList link={link} key={`social-item-${link.id}`} />
      ))}
    </Card>
  );
};

export default RecentLink;

interface LinkListProps {
  link: RecentLinkResponse;
}

function LinkList({ link }: LinkListProps) {
  const router = useRouter();

  const handleCopy = (url: string) => {
    copyToClipboard(credentialsConfig.siteUrl + url, toast);
  };

  const handleDelete = (link: RecentLinkResponse) => {
    // Implementasi penghapusan link
  };

  return (
    <div className='space-y-3 px-4 py-[11px] hover:bg-default-50'>
      <div className='flex justify-between'>
        <div className='flex flex-wrap gap-2'>
          <div className='flex'>
            <div className='flex flex-col items-start justify-start space-x-0 space-y-3 md:flex-row md:items-center md:space-x-3 md:space-y-0'>
              <div className='flex items-center space-x-3'>
                <div className='h-5 w-5 text-primary-200'>
                  <Web />
                </div>
                <div className='flex flex-col'>
                  <p className='text-sm font-semibold text-primary'>
                    {link.title || 'Untitled'}
                  </p>
                  <p className='text-xs text-muted-foreground'>
                    {link.type === 'bio'
                      ? `@${link.url.split('/').pop()}`
                      : link.type}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='flex items-start'>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant='ghost' className='h-8 w-8 p-0'>
                <span className='sr-only'>Open menu</span>
                <MoreHorizontal className='h-4 w-4' />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end'>
              {link.type === 'shortlink' && (
                <DropdownMenuItem
                  onClick={() =>
                    router.push(`/shortlinks/${link.url.slice(1)}/analytics`)
                  }
                >
                  <ChartBar className='mr-2 h-4 w-4' />
                  Statistik
                </DropdownMenuItem>
              )}
              {link.type === 'bio' && (
                <DropdownMenuItem
                  onClick={() => router.push(`/bio-pages/${link.id}/analytics`)}
                >
                  <ChartBar className='mr-2 h-4 w-4' />
                  Statistik
                </DropdownMenuItem>
              )}
              <DropdownMenuItem
                className='flex items-center gap-2'
                onClick={() => handleCopy(link.url)}
              >
                <Copy className='h-4 w-4' />
                Salin Link
              </DropdownMenuItem>
              <DropdownMenuItem
                className='flex items-center gap-2 text-destructive'
                onClick={() => handleDelete(link)}
              >
                <Trash2 className='h-4 w-4' />
                Hapus
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <div className='hidden gap-3 sm:flex'>
        <div
          className={`rounded-md ${link.status === 'online' ? 'bg-success' : 'bg-destructive'} px-2 py-1`}
        >
          <p className='text-xs font-medium text-primary-foreground'>
            {link.status}
          </p>
        </div>
        <div className='flex items-center justify-center gap-2 text-xs text-muted-foreground'>
          <Eye className='h-4 w-4' />
          {link.visibility}
        </div>
      </div>
      <div className='flex gap-3'>
        <div className={`rounded-md`}>
          <a
            href={credentialsConfig.siteUrl + link.url}
            target='_blank'
            rel='noopener noreferrer'
            className='text-sm font-medium text-primary hover:underline'
          >
            {credentialsConfig.siteUrl + link.url}
          </a>
        </div>
        <div className='flex items-center justify-center gap-2'>
          <Button
            className='h-6 w-6'
            variant='ghost'
            size='icon'
            onClick={() => handleCopy(link.url)}
          >
            <Copy className='h-4 w-4' />
          </Button>
        </div>
      </div>
      <div className='flex w-full flex-wrap items-center gap-4 text-xs text-muted-foreground'>
        <p className='flex items-center gap-2'>
          {link?.created_at ? (
            <time
              dateTime={new Date(Number(link.created_at)).toISOString()}
              title={formatEpochDate(Number(link.created_at), 'PPP')}
            >
              {formatEpochDate(Number(link.created_at), 'PP')}
            </time>
          ) : (
            <span>&mdash;</span>
          )}
        </p>
      </div>
    </div>
  );
}
