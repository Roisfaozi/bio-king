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
import { deleteBio } from '@/action/bio-action';
import { useRouter } from 'next/navigation';

interface DropdownBioProps {
  id: string;
}

const DropdownBio = ({ id }: DropdownBioProps) => {
  const router = useRouter();

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this bio page?')) {
      await deleteBio(id);
      router.refresh();
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
        <DropdownMenuItem>Statistik</DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => router.push(`/dashboard/bio/${id}/edit`)}
        >
          Edit
        </DropdownMenuItem>
        <DropdownMenuItem>Reset</DropdownMenuItem>
        <hr className='w-full'></hr>
        <DropdownMenuItem
          className='text-destructive-700'
          onClick={() => handleDelete(id)}
        >
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DropdownBio;
