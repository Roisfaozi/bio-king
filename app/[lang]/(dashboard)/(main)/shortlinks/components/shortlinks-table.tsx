'use client';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Separator } from '@/components/ui/separator';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { credentialsConfig } from '@/config/credentials.config';
import { formatEpochDate } from '@/lib/utils';
import { ShortlinkWithClicksResponse } from '@/models/shortlink-response';
import {
  ChartBar,
  Copy,
  Edit,
  ExternalLink,
  Link2,
  MoreHorizontal,
  Trash2,
  AlertCircle,
  PieChart,
  ClipboardList,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Badge } from '@/components/ui/badge';
import { toast } from 'react-hot-toast';

interface ShortlinksTableProps {
  links: ShortlinkWithClicksResponse[];
  onDelete: (link: ShortlinkWithClicksResponse) => void;
}

const ShortlinksTable = ({ links, onDelete }: ShortlinksTableProps) => {
  const router = useRouter();

  const getStatusBadge = (isActive: boolean | null) => {
    if (isActive === true) {
      return (
        <Badge className='bg-green-100 text-green-800 hover:bg-green-100 dark:bg-green-900 dark:text-green-100 dark:hover:bg-green-900'>
          Active
        </Badge>
      );
    }
    return (
      <Badge className='bg-gray-100 text-gray-800 hover:bg-gray-100 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-700'>
        Inactive
      </Badge>
    );
  };

  const getLinkTypeBadge = (link: ShortlinkWithClicksResponse) => {
    const isTrapLink = link.type === 'traplink';

    if (!isTrapLink) {
      return (
        <Badge
          variant='outline'
          className='border-slate-200 text-slate-700 dark:border-slate-700 dark:text-slate-300'
        >
          Shortlink
        </Badge>
      );
    }

    const pageType = link.page_type || 'general';
    if (pageType === 'tinder') {
      return (
        <Badge className='bg-red-100 text-red-800 hover:bg-red-100 dark:bg-red-900 dark:text-red-100 dark:hover:bg-red-900'>
          Tinder Trap
        </Badge>
      );
    } else if (pageType === 'vsco') {
      return (
        <Badge className='bg-purple-100 text-purple-800 hover:bg-purple-100 dark:bg-purple-900 dark:text-purple-100 dark:hover:bg-purple-900'>
          VSCO Trap
        </Badge>
      );
    }

    return null;
  };

  // Function to get click count
  const getClickCount = (link: ShortlinkWithClicksResponse) => {
    return link._count?.clicks || 0;
  };

  // Handle copy link to clipboard
  const handleCopyLink = (shortCode: string) => {
    const fullUrl = `${credentialsConfig.siteUrl}/${shortCode}`;
    navigator.clipboard.writeText(fullUrl);
    toast.success('Link copied to clipboard!');
  };

  // Handle open link in new tab
  const handleOpenLink = (shortCode: string) => {
    const fullUrl = `${credentialsConfig.siteUrl}/${shortCode}`;
    window.open(fullUrl, '_blank');
  };

  // Handle edit link
  const handleEditClick = (link: ShortlinkWithClicksResponse) => {
    router.push(`/shortlinks/${link.short_code}/edit`);
  };

  // Handle view captures
  const handleViewCaptures = (link: ShortlinkWithClicksResponse) => {
    router.push(`/form-captures?shortcode=${link.short_code}`);
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Title</TableHead>
          <TableHead>Short URL</TableHead>
          <TableHead>Type</TableHead>
          <TableHead className='hidden md:table-cell'>
            {/* Conditional column for original URL or target */}
            Target
          </TableHead>
          <TableHead className='hidden md:table-cell'>Created</TableHead>
          <TableHead>Clicks</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className='text-right'>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {links.map((link) => (
          <TableRow key={link.id}>
            <TableCell className='font-medium'>
              {link.title || 'Untitled'}
            </TableCell>
            <TableCell>
              <div className='flex items-center gap-2'>
                <Link2 className='h-4 w-4 text-muted-foreground' />
                <span className='text-sm'>{link.short_code}</span>
                <Button
                  variant='ghost'
                  size='icon'
                  className='h-6 w-6 rounded-full'
                  onClick={() => handleCopyLink(link.short_code)}
                >
                  <Copy className='h-3 w-3' />
                </Button>
              </div>
            </TableCell>
            <TableCell>{getLinkTypeBadge(link)}</TableCell>
            <TableCell className='hidden max-w-[200px] truncate md:table-cell'>
              <span className='text-sm text-muted-foreground'>
                {link.type === 'traplink'
                  ? `Fake ${link.page_type} profile page`
                  : link.original_url}
              </span>
            </TableCell>
            <TableCell className='hidden md:table-cell'>
              {formatEpochDate(Number(link.created_at), 'PPP')}
            </TableCell>
            <TableCell>{getClickCount(link)}</TableCell>
            <TableCell>{getStatusBadge(link.is_active ?? null)}</TableCell>
            <TableCell className='text-right'>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant='ghost' className='h-8 w-8 p-0'>
                    <span className='sr-only'>Open menu</span>
                    <MoreHorizontal className='h-4 w-4' />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align='end'>
                  <DropdownMenuItem
                    onClick={() =>
                      router.push(`/shortlinks/${link.short_code}/analytics`)
                    }
                  >
                    <ChartBar className='mr-2 h-4 w-4' />
                    Statistik
                  </DropdownMenuItem>

                  {link.type === 'traplink' && (
                    <DropdownMenuItem onClick={() => handleViewCaptures(link)}>
                      <ClipboardList className='mr-2 h-4 w-4' />
                      Lihat Form Captures
                    </DropdownMenuItem>
                  )}

                  <DropdownMenuItem
                    className='flex items-center gap-2'
                    onClick={() => handleOpenLink(link.short_code)}
                  >
                    <ExternalLink className='h-4 w-4' />
                    <span>Open</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className='flex items-center gap-2'
                    onClick={() => handleCopyLink(link.short_code)}
                  >
                    <Copy className='h-4 w-4' />
                    <span>Copy URL</span>
                  </DropdownMenuItem>

                  {link.type !== 'traplink' && (
                    <DropdownMenuItem
                      className='flex items-center gap-2'
                      onClick={() => handleEditClick(link)}
                    >
                      <Edit className='h-4 w-4' />
                      <span>Edit</span>
                    </DropdownMenuItem>
                  )}

                  <Separator className='my-1' />
                  <DropdownMenuItem
                    className='flex items-center gap-2 text-destructive focus:text-destructive'
                    onClick={() => onDelete(link)}
                  >
                    <Trash2 className='h-4 w-4' />
                    <span>Delete</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default ShortlinksTable;
