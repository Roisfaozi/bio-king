'use client';
import { deleteBio } from '@/action/bio-action';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useConfirm } from '@/provider/alert.dialog.provider';
import { Icon } from '@iconify/react';
import { MoreHorizontal, Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface DropdownBioProps {
  id: string;
}

const DropdownBio = ({ id }: DropdownBioProps) => {
  const router = useRouter();
  const [open, setOpen] = useState<boolean>(false);
  const confirm = useConfirm();

  const handleDelete = async (id: string) => {
    const confirmed = await confirm({
      title: 'Test',
      body: 'Are you sure you want to do that?',
      actionButton: 'Delete',
      actionColorVariant: 'destructive',
      cancelButton: 'Cancel',
      cancelColorVariant: 'default',
    });
    console.log('confirmed', confirmed);
    if (confirmed) {
      try {
        const response = await deleteBio(id);
        if (response.status === 'fail') {
          throw Error(response.data);
        }
      } catch (error: any) {
        console.error('Error deleteing bio:', error.response.data);
        return error.response.data;
      } finally {
        router.refresh();
      }
    }
  };

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
        <DropdownMenuItem
          onClick={() => router.push(`/bio-pages/${id}/analytics`)}
        >
          <Icon
            icon='heroicons:chart-bar'
            className='mr-1 h-3.5 w-3.5 text-default-700'
          />
          Statistik
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => router.push(`/bio-pages/${id}/edit`)}>
          <Icon
            icon='heroicons:pencil-square'
            className='mr-1 h-3.5 w-3.5 text-default-700'
          />
          Edit
        </DropdownMenuItem>
        <DropdownMenuItem>Reset</DropdownMenuItem>
        <hr className='w-full'></hr>

        <DropdownMenuItem
          className='text-destructive-700 focus:text-rose-800'
          onClick={async () => {
            await handleDelete(id);
          }}
        >
          <Trash2 className='mr-1 h-3.5 w-3.5 text-destructive-700' />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DropdownBio;
