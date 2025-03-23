'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Plus, Shield } from 'lucide-react';

interface ShortlinksHeaderProps {
  onCreateClick: () => void;
  isAdmin?: boolean;
  trans?: { [key: string]: string };
}

const ShortlinksHeader = ({
  onCreateClick,
  isAdmin = false,
  trans,
}: ShortlinksHeaderProps) => {
  return (
    <div className='flex flex-col justify-between gap-4 md:flex-row md:items-center'>
      <div>
        <h1 className='text-2xl font-bold tracking-tight'>
          {trans?.shortlinks || 'Shortlinks'}
          {isAdmin && (
            <Badge
              variant='outline'
              className='ml-2 bg-yellow-100 text-yellow-800'
            >
              <Shield className='mr-1 h-3 w-3' />
              Admin Mode
            </Badge>
          )}
        </h1>
        <p className='text-muted-foreground'>
          {isAdmin
            ? 'Semua shortlink yang telah dibuat oleh semua pengguna dalam sistem.'
            : 'Semua shortlink yang telah Anda buat untuk halaman bio dan tautan eksternal.'}
        </p>
      </div>

      <Button
        onClick={onCreateClick}
        size='sm'
        className='flex items-center gap-1'
      >
        <Plus className='h-4 w-4' /> Buat Link Baru
      </Button>
    </div>
  );
};

export default ShortlinksHeader;
