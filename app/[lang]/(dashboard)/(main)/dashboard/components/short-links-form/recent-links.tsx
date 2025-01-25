'use client';
import { Web } from '@/components/svg';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { InputGroup, InputGroupText } from '@/components/ui/input-group';
import { Icon } from '@iconify/react';
import { Copy, Eye } from 'lucide-react';
import DropdownLinks from './DropdownLinks';

type link = {
  id: number;
  type: string;
  title: string;
  status: string;
  visibility: string;
  url: string;
  createdAt: string;
};

const links: link[] = [
  {
    id: 1,
    type: 'Bio Short Link',
    title: 'ShortLink',
    status: 'online',
    visibility: 'Public',
    url: 'https://bio.namatin.com/DojiF',
    createdAt: '2022-01-01',
  },
  {
    id: 2,
    type: 'Bio Short Link',
    title: 'ShortLink',
    status: 'online',
    visibility: 'Public',
    url: 'https://bio.namatin.com/DojiF',
    createdAt: '2022-01-01',
  },
  {
    id: 3,
    type: 'Bio Short Link',
    title: 'ShortLink',
    status: 'disbaled',
    visibility: 'Public',
    url: 'https://bio.namatin.com/DojiF',
    createdAt: '2022-01-01',
  },
  {
    id: 4,
    type: 'Bio Short Link',
    title: 'ShortLink',
    status: 'online',
    visibility: 'Public',
    url: 'https://bio.namatin.com/DojiF',
    createdAt: '2022-01-01',
  },
  {
    id: 5,
    type: 'Bio Short Link',
    title: 'ShortLink',
    status: 'online',
    visibility: 'Public',
    url: 'https://bio.namatin.com/DojiF',
    createdAt: '2022-01-01',
  },
  {
    id: 6,
    type: 'Bio Short Link',
    title: 'ShortLink',
    status: 'online',
    visibility: 'Public',
    url: 'https://bio.namatin.com/DojiF',
    createdAt: '2022-01-01',
  },
  {
    id: 7,
    type: 'Bio Short Link',
    title: 'ShortLink',
    status: 'online',
    visibility: 'Public',
    url: 'https://bio.namatin.com/DojiF',
    createdAt: '2022-01-01',
  },
  {
    id: 8,
    type: 'Bio Short Link',
    title: 'ShortLink',
    status: 'online',
    visibility: 'Public',
    url: 'https://bio.namatin.com/DojiF',
    createdAt: '2022-01-01',
  },
  {
    id: 9,
    type: 'Bio Short Link',
    title: 'ShortLink',
    status: 'online',
    visibility: 'Public',
    url: 'https://bio.namatin.com/DojiF',
    createdAt: '2022-01-01',
  },
  {
    id: 10,
    type: 'Bio Short Link',
    title: 'ShortLink',
    status: 'online',
    visibility: 'Public',
    url: 'https://bio.namatin.com/DojiF',
    createdAt: '2022-01-01',
  },
];

interface RecentLinkProps {
  links: link[];
}

const RecentLink = () => {
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
      {links.map((link) => (
        <LinkList link={link} key={link.id} />
      ))}
    </Card>
  );
};

export default RecentLink;

interface LinkListProps {
  link: link;
  key: any;
}

function LinkList({ link, key }: LinkListProps) {
  return (
    <div
      className='space-y-3 px-4 py-[11px] hover:bg-default-50'
      key={`social-item-${key}`}
    >
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
          <p className='text-sm font-medium text-primary'>{link.url}</p>
        </div>
        <div className='flex items-center justify-center gap-2'>
          <div className='h-4 w-4'>
            <Copy className='h-4 w-4' />
          </div>
        </div>
      </div>
      <div className='flex w-full flex-wrap gap-2'>
        <div className='flex items-center gap-2'>{link.createdAt}</div>
      </div>
    </div>
  );
}
