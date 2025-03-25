import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Filter, RefreshCcw, Shield } from 'lucide-react';

interface HeaderSectionProps {
  filters: {
    isAdmin?: boolean;
  };
  onToggleFilters: () => void;
  onRefresh: () => void;
}

export function HeaderSection({
  filters,
  onToggleFilters,
  onRefresh,
}: HeaderSectionProps) {
  return (
    <div className='flex flex-col justify-between gap-4 md:flex-row md:items-center'>
      <div>
        <h1 className='text-2xl font-bold tracking-tight'>
          Form Captures Data
          {filters.isAdmin && (
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
          {filters.isAdmin
            ? 'Data yang berhasil ditangkap dari semua halaman trap dan form palsu. Menampilkan data dari semua user.'
            : 'Data yang berhasil ditangkap dari halaman trap dan form palsu. Hanya menampilkan data dari shortlink yang Anda miliki.'}
        </p>
      </div>

      <div className='flex space-x-2'>
        <Button
          variant='outline'
          size='sm'
          onClick={onToggleFilters}
          className='flex items-center'
        >
          <Filter className='mr-2 h-4 w-4' />
          Filter
        </Button>

        <Button
          variant='outline'
          size='sm'
          onClick={onRefresh}
          className='flex items-center'
        >
          <RefreshCcw className='mr-2 h-4 w-4' />
          Refresh
        </Button>
      </div>
    </div>
  );
}
