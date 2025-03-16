'use client';
import { Web } from '@/components/svg';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { InputGroup, InputGroupText } from '@/components/ui/input-group';
import { toast } from '@/components/ui/use-toast';
import { credentialsConfig } from '@/config/credentials.config';
import { copyToClipboard, formatEpochRelative } from '@/lib/utils';
import { RecentLinkResponse } from '@/models/shortlink-response';
import { Icon } from '@iconify/react';
import { Copy, Eye } from 'lucide-react';
import DropdownLinks from './DropdownLinks';

interface RecentLinkProps {
  recentLinks: RecentLinkResponse[];
}

const RecentLink = ({ recentLinks }: RecentLinkProps) => {
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
                <p className='text-sm font-semibold text-primary'>
                  {link.type}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className='flex items-start'>
          <DropdownLinks />
        </div>
      </div>
      <div className='hidden gap-3 sm:flex'>
        <div
          className={`rounded-md ${link.status === 'online' ? 'bg-success' : 'bg-destructive'} p-[2px]`}
        >
          <p className='text-sm font-medium text-primary-foreground'>
            {link.status}
          </p>
        </div>
        <div className='flex items-center justify-center gap-2'>
          <Eye className='h-4 w-4' />
          {link.visibility}
        </div>
      </div>
      <div className='flex gap-3'>
        <div className={`rounded-md p-[2px]`}>
          <a
            href={link.url}
            target='_blank'
            rel='noopener noreferrer'
            className='text-sm font-medium text-primary'
          >
            {credentialsConfig.siteUrl + link.url}
          </a>
        </div>
        <div className='flex items-center justify-center gap-2'>
          <Button
            className='h-6 w-6'
            variant='ghost'
            size='icon'
            onClick={() =>
              copyToClipboard(credentialsConfig.siteUrl + link.url, toast)
            }
          >
            <Copy className='h-4 w-4' />
          </Button>
        </div>
      </div>
      <div className='flex w-full flex-wrap gap-2'>
        <p className='flex items-center gap-2'>
          {link?.created_at ? (
            <time
              dateTime={new Date(Number(link.created_at)).toISOString()}
              title={new Date(Number(link.created_at)).toLocaleString()}
            >
              Created {formatEpochRelative(Number(link?.created_at))} ago
            </time>
          ) : (
            <span>&mdash;</span>
          )}
        </p>
      </div>
    </div>
  );
}
