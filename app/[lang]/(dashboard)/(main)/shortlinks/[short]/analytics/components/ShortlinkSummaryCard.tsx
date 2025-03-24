import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { ShortlinkWithClicksResponse } from '@/models/shortlink-response';

interface ShortlinkSummaryCardProps {
  shortlink: ShortlinkWithClicksResponse;
}

export default function ShortlinkSummaryCard({
  shortlink,
}: ShortlinkSummaryCardProps) {
  return (
    <Card className='mb-6'>
      <CardHeader className='pb-2'>
        <h2 className='text-xl font-semibold'>{shortlink.title}</h2>
        <p className='text-sm text-muted-foreground'>/{shortlink.short_code}</p>
      </CardHeader>
      <CardContent>
        <div className='flex items-center gap-6'>
          <div>
            <p className='text-sm text-muted-foreground'>Total Views</p>
            <p className='text-2xl font-bold'>
              {shortlink._count?.clicks || 0}
            </p>
          </div>
          <div>
            <p className='text-sm text-muted-foreground'>Status</p>
            <p className='text-md font-medium'>
              {shortlink.is_active ? 'Aktif' : 'Tidak Aktif'}
            </p>
          </div>
          <div>
            <p className='text-sm text-muted-foreground'>URL Asli</p>
            <p className='text-md max-w-[300px] truncate font-medium'>
              {shortlink.original_url}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
