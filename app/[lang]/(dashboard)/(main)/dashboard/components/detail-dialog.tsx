'use client';

import { Copy, Link2, User, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/components/ui/use-toast';
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { RecentActivityType } from '@/models/click-resonse';
import { copyToClipboard, epochToDate } from '@/lib/utils';
import { format } from 'date-fns';

interface DetailDialogProps {
  selectedItem: RecentActivityType | null;
}

export default function DetailDialog({ selectedItem }: DetailDialogProps) {
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
    <DialogContent className='max-w-2xl dark:border-gray-700 dark:bg-gray-800'>
      <DialogHeader>
        <DialogTitle className='dark:text-white'>Analytics Details</DialogTitle>
        <DialogDescription className='dark:text-gray-400'>
          Detailed information about this visit
        </DialogDescription>
      </DialogHeader>
      {selectedItem && (
        <div className='grid gap-4'>
          <div className='flex items-center justify-between'>
            <div className='flex items-center gap-2'>
              {getTypeBadge(selectedItem.type)}
              <h3 className='text-lg font-semibold dark:text-white'>
                {selectedItem.title || selectedItem.url}
              </h3>
            </div>
            <div className='text-sm text-muted-foreground dark:text-gray-400'>
              {format(
                epochToDate(Number(selectedItem.visited_at)),
                'MMM d, yyyy HH:mm',
              )}
            </div>
          </div>
          <Separator className='dark:bg-gray-700' />
          <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
            <div className='space-y-2'>
              <h4 className='text-sm font-medium dark:text-gray-300'>
                URL Information
              </h4>
              <div className='grid grid-cols-[100px_1fr] gap-1 text-sm'>
                <span className='text-muted-foreground dark:text-gray-400'>
                  URL:
                </span>
                <div className='flex items-center gap-2'>
                  <span className='dark:text-gray-300'>{selectedItem.url}</span>
                  <Button
                    variant='ghost'
                    size='icon'
                    className='h-5 w-5'
                    onClick={() => copyToClipboard(selectedItem.url, toast)}
                  >
                    <Copy className='h-3 w-3' />
                  </Button>
                </div>
                {selectedItem.title && (
                  <>
                    <span className='text-muted-foreground dark:text-gray-400'>
                      Title:
                    </span>
                    <span className='dark:text-gray-300'>
                      {selectedItem.title}
                    </span>
                  </>
                )}
                {selectedItem.referrer && (
                  <>
                    <span className='text-muted-foreground dark:text-gray-400'>
                      Referrer:
                    </span>
                    <span className='dark:text-gray-300'>
                      {selectedItem.referrer}
                    </span>
                  </>
                )}
              </div>
            </div>
            <div className='space-y-2'>
              <h4 className='text-sm font-medium dark:text-gray-300'>
                Visitor Information
              </h4>
              <div className='grid grid-cols-[100px_1fr] gap-1 text-sm'>
                <span className='text-muted-foreground dark:text-gray-400'>
                  IP Address:
                </span>
                <span className='dark:text-gray-300'>{selectedItem.ip}</span>
                <span className='text-muted-foreground dark:text-gray-400'>
                  Location:
                </span>
                <span className='dark:text-gray-300'>
                  {selectedItem.city !== 'Unknown' ? selectedItem.city : '—'},{' '}
                  {selectedItem.country !== 'Unknown'
                    ? selectedItem.country
                    : '—'}
                </span>
                <span className='text-muted-foreground dark:text-gray-400'>
                  Language:
                </span>
                <span className='dark:text-gray-300'>
                  {selectedItem.language}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
      <DialogFooter>
        <DialogClose asChild>
          <Button
            variant='outline'
            className='dark:border-gray-600 dark:text-gray-300'
          >
            Close
          </Button>
        </DialogClose>
      </DialogFooter>
    </DialogContent>
  );
}
