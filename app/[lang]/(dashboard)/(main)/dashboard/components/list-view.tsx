'use client';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { toast } from '@/components/ui/use-toast';
import { copyToClipboard, epochToDate } from '@/lib/utils';
import { RecentActivityType } from '@/models/click-resonse';
import { format } from 'date-fns';
import {
  Chrome,
  Clock,
  Copy,
  ExternalLink,
  Eye,
  Globe,
  Info,
  Languages,
  Link2,
  Loader2,
  MapPin,
  Monitor,
  Smartphone,
  Tablet,
  User,
} from 'lucide-react';
import DetailDialog from './detail-dialog';

import DashboardDropdown from '@/components/dashboard-dropdown';
import { credentialsConfig } from '@/config/credentials.config';

interface ListViewProps {
  activity: RecentActivityType[];
  selectedItem: RecentActivityType | null;
  setSelectedItem: (item: RecentActivityType | null) => void;
  onRefresh?: () => void;
  isRefreshing?: boolean;
}

export default function ListView({
  activity,
  selectedItem,
  setSelectedItem,
  onRefresh,
  isRefreshing = false,
}: ListViewProps) {
  // Get device icon based on device type
  const getDeviceIcon = (device: string) => {
    switch (device.toLowerCase()) {
      case 'mobile':
        return <Smartphone className='h-4 w-4' />;
      case 'tablet':
        return <Tablet className='h-4 w-4' />;
      default:
        return <Monitor className='h-4 w-4' />;
    }
  };

  // Get type badge color
  const getTypeBadge = (type: string) => {
    switch (type) {
      case 'shortlink':
        return (
          <Badge
            color='secondary'
            className='bg-blue-100 text-blue-800 hover:bg-blue-100 dark:bg-blue-900 dark:text-blue-100 dark:hover:bg-blue-900'
          >
            <Link2 className='mr-1 h-3 w-3' /> Shortlink
          </Badge>
        );
      case 'bio':
        return (
          <Badge
            color='secondary'
            className='bg-purple-100 text-purple-800 hover:bg-purple-100 dark:bg-purple-900 dark:text-purple-100 dark:hover:bg-purple-900'
          >
            <User className='mr-1 h-3 w-3' /> Bio
          </Badge>
        );
      default:
        return (
          <Badge color='secondary'>
            <Info className='mr-1 h-3 w-3' /> {type}
          </Badge>
        );
    }
  };

  return (
    <Card>
      <CardHeader className='mb-4 flex-row items-center justify-between border-none pb-0'>
        <CardTitle className='font-semibold'>Recent Activity</CardTitle>
        <div className='flex items-center gap-2'>
          {isRefreshing && (
            <Loader2 className='h-4 w-4 animate-spin text-muted-foreground' />
          )}
          <DashboardDropdown onRefresh={onRefresh} />
        </div>
      </CardHeader>
      <Separator className='my-' />
      <CardContent className='px-0 pt-4'>
        {isRefreshing ? (
          <div className='flex items-center justify-center p-8'>
            <Loader2 className='h-8 w-8 animate-spin text-muted-foreground' />
            <span className='ml-2 text-muted-foreground'>
              Memperbarui data...
            </span>
          </div>
        ) : activity.length > 0 ? (
          activity.map((item, index) => (
            <div key={index}>
              <div className='p-4'>
                <div className='mb-4 flex flex-col justify-between gap-2 md:flex-row'>
                  <div className='flex items-center gap-2'>
                    {getTypeBadge(item.type)}
                    <span className='truncate font-medium dark:text-white'>
                      {item.title || credentialsConfig.siteUrl + item.url}
                    </span>
                  </div>
                  <div className='flex items-center text-sm text-muted-foreground dark:text-gray-400'>
                    <Clock className='mr-1 h-4 w-4' />
                    {format(
                      epochToDate(Number(selectedItem?.visited_at)),
                      'MMM d, yyyy HH:mm',
                    )}
                  </div>
                </div>

                <div className='grid grid-cols-1 gap-4 text-sm md:grid-cols-2 lg:grid-cols-3'>
                  <div className='group flex items-center gap-2'>
                    <ExternalLink className='h-4 w-4 text-muted-foreground dark:text-gray-400' />
                    <a
                      href={item.url}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='truncate text-sm text-default-600 hover:text-primary-400'
                    >
                      {credentialsConfig.siteUrl + item.url}
                    </a>
                    <Button
                      variant='ghost'
                      size='icon'
                      className='h-6 w-6 opacity-0 transition-opacity group-hover:opacity-100'
                      onClick={() =>
                        copyToClipboard(
                          credentialsConfig.siteUrl + item.url,
                          toast,
                        )
                      }
                    >
                      <Copy className='h-3 w-3' />
                    </Button>
                  </div>

                  <div className='flex items-center gap-2'>
                    <MapPin className='h-4 w-4 text-muted-foreground dark:text-gray-400' />
                    <span className='dark:text-gray-300'>
                      {item.city !== 'Unknown' ? item.city : '—'},{' '}
                      {item.country !== 'Unknown' ? item.country : '—'}
                    </span>
                  </div>

                  <div className='flex items-center gap-2'>
                    <Globe className='h-4 w-4 text-muted-foreground dark:text-gray-400' />
                    <span className='dark:text-gray-300'>{item.ip}</span>
                  </div>

                  <div className='flex items-center gap-2'>
                    {getDeviceIcon(item.device)}
                    <span className='dark:text-gray-300'>
                      {item.device.charAt(0).toUpperCase() +
                        item.device.slice(1)}
                      {item.os !== 'Unknown' ? ` • ${item.os}` : ''}
                    </span>
                  </div>
                  <div className='flex items-center gap-2'>
                    <Chrome className='h-4 w-4 text-muted-foreground dark:text-gray-400' />
                    <span className='dark:text-gray-300'>
                      {item.browser !== 'Unknown' ? ` • ${item.browser}` : ''}
                    </span>
                  </div>
                  <div className='flex items-center gap-2'>
                    <Languages className='h-4 w-4 text-muted-foreground dark:text-gray-400' />
                    <span className='dark:text-gray-300'>{item.language}</span>
                  </div>

                  {item.referrer && (
                    <div className='flex items-center gap-2'>
                      <ExternalLink className='h-4 w-4 text-muted-foreground dark:text-gray-400' />
                      <span className='truncate dark:text-gray-300'>
                        {item.referrer}
                      </span>
                    </div>
                  )}
                </div>
              </div>
              <CardFooter className='flex justify-end border-t bg-muted/50 p-1 dark:border-gray-700 dark:bg-gray-900/50'>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      variant='ghost'
                      size='sm'
                      className='gap-1 dark:text-gray-300'
                      onClick={() => setSelectedItem(item)}
                    >
                      <Eye className='h-3 w-3' />
                      <span>Details</span>
                    </Button>
                  </DialogTrigger>
                  <DetailDialog selectedItem={selectedItem} />
                </Dialog>
              </CardFooter>
            </div>
          ))
        ) : (
          <div className='p-8 text-center text-muted-foreground'>
            Tidak ada aktivitas terbaru
          </div>
        )}
      </CardContent>
    </Card>
  );
}
