'use client';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { MoreHorizontal, RefreshCw } from 'lucide-react';

interface DashboardDropdownProps {
  onRefresh?: () => void;
  onViewAll?: () => void;
  onDownload?: () => void;
}

const DashboardDropdown = ({
  onRefresh,
  onViewAll,
  onDownload,
}: DashboardDropdownProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          size='icon'
          className='group h-6 w-6 border border-default-200 bg-transparent text-default-800 hover:bg-transparent'
        >
          <MoreHorizontal className='h-4 w-4' />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className='w-[196px]'
        align='end'
        side='bottom'
        avoidCollisions
      >
        {onViewAll && (
          <DropdownMenuLabel onClick={onViewAll} className='cursor-pointer'>
            View All
          </DropdownMenuLabel>
        )}
        {onDownload && (
          <DropdownMenuItem onClick={onDownload}>Download</DropdownMenuItem>
        )}
        {onRefresh && (
          <DropdownMenuItem
            onClick={onRefresh}
            className='flex items-center gap-2'
          >
            <RefreshCw className='h-4 w-4' />
            <span>Refresh</span>
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DashboardDropdown;
