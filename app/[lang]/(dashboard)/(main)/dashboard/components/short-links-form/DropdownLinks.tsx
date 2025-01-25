'use client';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { MoreHorizontal } from 'lucide-react';
const DropdownLinks = () => {
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
        <DropdownMenuLabel>Option</DropdownMenuLabel>
        <DropdownMenuItem>Statistik</DropdownMenuItem>
        <DropdownMenuItem>Edit</DropdownMenuItem>
        <DropdownMenuItem>Reset</DropdownMenuItem>
        <hr className='w-full'></hr>
        <DropdownMenuItem className='text-destructive-700'>
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DropdownLinks;
