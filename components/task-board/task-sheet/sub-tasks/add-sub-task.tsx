'use client';
import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Plus } from 'lucide-react';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { cn, formatDate } from '@/lib/utils';
import { toast } from 'react-hot-toast';
import { addSubTaskAction } from '@/action/project-action';
const schema = z.object({
  title: z.string().min(2, { message: 'title lagbe re vai .' }),
});
import { type Task as TaskType } from '@/app/api/tasks/data';
const AddSubTask = ({ taskId }: { taskId: TaskType['id'] }) => {
  const [isPending, startTransition] = React.useTransition();
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
  const onSubmit = (data: any) => {
    data.assignDate = formatDate(new Date());
    data.completed = false;
    data.taskId = taskId;
    let result;

    startTransition(async () => {
      result = await addSubTaskAction(data);
      toast.success('Successfully added');
    });

    reset();
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className='relative pr-1.5'>
      <Label
        htmlFor='add-subtask'
        className='absolute left-6 top-1/2 z-10 m-0 -translate-y-1/2 cursor-pointer p-0'
      >
        <Plus className='h-5 w-5 text-default-500' />
      </Label>
      <Input
        id='add-subtask'
        {...register('title')}
        className={cn(
          'h-[52px] rounded-none border-b border-default-200 pl-12 text-sm font-medium text-default-600 focus:inset-4 focus:border-default-300 focus:shadow-sm focus:drop-shadow-sm',
          {
            'border-destructive focus:border-destructive': errors.title,
          },
        )}
        placeholder='Add a new subtask...'
      />
    </form>
  );
};

export default AddSubTask;
