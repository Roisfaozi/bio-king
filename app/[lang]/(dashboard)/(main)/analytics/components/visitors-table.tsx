import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { formatEpochDate } from '@/lib/utils';
import { Dna, Globe, Heart, Link as LinkIcon } from 'lucide-react';

interface VisitorsTableProps {
  visitors: Array<{
    id: string;
    ip: string | null;
    country: string | null;
    city: string | null;
    browser: string | null;
    device: string | null;
    os: string | null;
    created_at: bigint | null;
    platform: string | null;
    links?: { short_code: string; title: string | null } | null;
    bioPages?: { username: string; title: string } | null;
    // Tambahan field untuk source tracking
    source_type?: string | null;
  }>;
}

// Helper function untuk menentukan ikon berdasarkan sumber
const getSourceIcon = (source: string | null, platform: string | null) => {
  if (source === 'bio_page' || platform === 'bio') {
    return <Dna className='h-4 w-4' />;
  } else if (source === 'shortlink' || platform === 'link') {
    return <LinkIcon className='h-4 w-4' />;
  } else if (source === 'tinder_page' || platform === 'tinder') {
    return <Heart className='h-4 w-4 text-red-500' />;
  } else {
    return <Globe className='h-4 w-4' />;
  }
};

// Helper function untuk menentukan label sumber
const getSourceLabel = (source: string | null, platform: string | null) => {
  if (source === 'bio_page' || platform === 'bio') {
    return 'Bio Page';
  } else if (source === 'shortlink' || platform === 'link') {
    return 'Shortlink';
  } else if (source === 'tinder_page' || platform === 'tinder') {
    return 'Tinder Trap';
  } else if (platform) {
    return `${platform.charAt(0).toUpperCase() + platform.slice(1)} Page`;
  } else {
    return 'Unknown';
  }
};

// Helper function untuk menentukan warna badge berdasarkan sumber
const getSourceColor = (source: string | null, platform: string | null) => {
  if (source === 'bio_page' || platform === 'bio') {
    return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
  } else if (source === 'shortlink' || platform === 'link') {
    return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
  } else if (source === 'tinder_page' || platform === 'tinder') {
    return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
  } else if (platform === 'feature') {
    return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300';
  } else if (platform === 'pricing') {
    return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
  } else {
    return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
  }
};

export function VisitorsTable({ visitors }: VisitorsTableProps) {
  console.log('visitors', visitors);
  return (
    <div className='overflow-x-auto'>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Tanggal</TableHead>
            <TableHead>IP</TableHead>
            <TableHead>Lokasi</TableHead>
            <TableHead>Sumber</TableHead>
            <TableHead>Halaman</TableHead>
            <TableHead>Perangkat</TableHead>
            <TableHead>Detail</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {visitors.map((visitor) => (
            <TableRow key={visitor.id}>
              <TableCell className='font-medium'>
                {visitor.created_at
                  ? formatEpochDate(
                      Number(visitor.created_at),
                      'MMM d, yyyy HH:mm',
                    )
                  : 'Unknown'}
              </TableCell>
              <TableCell>{visitor.ip || 'Unknown'}</TableCell>
              <TableCell>
                {visitor.country
                  ? `${visitor.city || ''}, ${visitor.country}`
                  : 'Unknown'}
              </TableCell>
              <TableCell>
                <Badge
                  className={getSourceColor(
                    visitor.source_type || null,
                    visitor.platform,
                  )}
                  variant='outline'
                >
                  <span className='flex items-center gap-1'>
                    {getSourceIcon(
                      visitor.source_type || null,
                      visitor.platform,
                    )}
                    <span>
                      {getSourceLabel(
                        visitor.source_type || null,
                        visitor.platform,
                      )}
                    </span>
                  </span>
                </Badge>
              </TableCell>
              <TableCell>
                {visitor.links
                  ? visitor.links.title || visitor.links.short_code
                  : visitor.bioPages
                    ? visitor.bioPages.title
                    : 'Homepage'}
              </TableCell>
              <TableCell>{visitor.device || 'Unknown'}</TableCell>
              <TableCell>
                <span className='flex flex-col text-xs'>
                  <span>{visitor.browser || 'Unknown'}</span>
                  <span className='text-muted-foreground'>
                    {visitor.os || 'Unknown'}
                  </span>
                </span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
