import React, { useTransition } from 'react';

import { toast } from 'react-hot-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { cn } from '@/lib/utils';
import { useForm, Controller } from 'react-hook-form';

import { addBoardAction, editBoardAction } from '@/action/project-action';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from '@/components/ui/dialog';

import { X } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { type Board as BoardType } from '@/app/api/boards/data';
const schema = z.object({
  name: z.string().min(2, { message: 'Your email is invalid.' }),
  status: z.string().optional(),
});
interface CreateBoardProps {
  open: boolean;
  onClose: () => void;
  board?: BoardType;
  boardId?: BoardType['id'];
}
const CreateBoard = ({ open, onClose, board, boardId }: CreateBoardProps) => {
  const [isPending, startTransition] = useTransition();
  const {
    register,
    handleSubmit,
    control,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const ResetForm = async () => {
    reset();
  };
  const onSubmit = (data: any) => {
    const updatedData = {
      ...board,
      name: data.name,
      status: data.status,
    };
    let result;
    if (board) {
      startTransition(async () => {
        result = await editBoardAction(boardId as any, updatedData as any);
        toast.success('Successfully update');
      });
    } else {
      startTransition(async () => {
        result = await addBoardAction(data);
        toast.success('Successfully added');
      });
    }

    onClose();
    reset();
  };
  React.useEffect(() => {
    setValue('name', board?.name || '');
    setValue('status', board?.status || 'defaultStatus');
  }, [open]);
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent hiddenCloseIcon>
        <DialogHeader className='flex-row items-center justify-between py-0'>
          <DialogTitle className='text-default-900'>Create Board</DialogTitle>
          <DialogClose asChild>
            <div className='h-7 w-7 cursor-pointer bg-transparent hover:bg-transparent'>
              <X className='h-5 w-5 text-default-900' />
            </div>
          </DialogClose>
        </DialogHeader>
        <DialogDescription className='-mt-2 py-0 pl-1'>
          <form onSubmit={handleSubmit(onSubmit)} className='space-y-5'>
            <div>
              <Label htmlFor='boradName' className='mb-1.5 text-default-600'>
                Board Name
              </Label>
              <Input
                type='text'
                {...register('name')}
                id='boardName'
                className={cn('', {
                  'border-destructive focus:border-destructive': errors.name,
                })}
              />
            </div>
            <div>
              <Label htmlFor='color' className='mb-1.5 text-default-600'>
                Assign Color
              </Label>
              <Input
                type='color'
                name='status'
                className='rounded-md border-none p-0'
                defaultValue='#6338f0'
              />
            </div>
            <div className='flex justify-center gap-4'>
              <DialogClose asChild>
                <Button
                  color='destructive'
                  variant='soft'
                  className='min-w-[136px]'
                >
                  Cancel
                </Button>
              </DialogClose>
              <Button className='min-w-[136px]'>Create Board</Button>
            </div>
          </form>
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
};

export default CreateBoard;
