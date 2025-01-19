'use client';
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Icon } from '@iconify/react';
import { updateTaskAction } from '@/action/project-action';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { type Task as TaskType } from '@/app/api/tasks/data';
const schema = z.object({
  title: z.string().min(1, {
    message: 'What is your task title? ???',
  }),
  desc: z.string().optional(),
});
const SheetTitleDesc = ({
  task,
  taskId,
}: {
  task: TaskType;
  taskId: TaskType['id'];
}) => {
  const [isFocused, setIsFocused] = useState<boolean>(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setTimeout(() => {
      setIsFocused(false);
    }, 3000);
  };

  const {
    register,
    handleSubmit,
    control,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    mode: 'all',
  });

  const onSubmit = async (data: any) => {
    const newData = {
      ...task,
      title: data.title,
      desc: data.desc,
    };
    try {
      await updateTaskAction(taskId, newData);
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    if (task) {
      setValue('title', task.title);
      setValue('desc', task.desc || '');
    }
  }, [task, setValue]);
  return (
    <form
      className='border-b border-default-200 px-6 py-5 pb-8'
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className='mb-2 flex items-center gap-1'>
        <Checkbox className='h-4 w-4' color='secondary' />

        <input
          type='text'
          {...register('title')}
          className='h-7 w-full rounded-sm border border-transparent bg-card px-1 text-sm font-medium text-default-900 focus:border focus:border-default-200 focus:bg-default-50 focus:outline-none'
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
      </div>
      {errors.title && (
        <div className='text-destructive'>{errors.title.message as string}</div>
      )}

      <div className='relative flex gap-1'>
        <div className='mt-1'>
          <Icon
            icon='heroicons:information-circle'
            className='h-5 w-5 text-default-900'
          />
        </div>
        <textarea
          className='peer h-16 w-full border border-none border-transparent bg-card p-1 text-sm text-default-700 focus:border-default-200 focus:bg-default-50 focus:outline-none'
          placeholder='Add Task Descriptions'
          rows={1}
          {...register('desc')}
          onInput={handleFocus}
          onBlur={handleBlur}
          style={{ resize: 'none', overflowY: 'hidden' }}
        />
      </div>
      <div className='flex justify-end'>
        {isFocused && (
          <Button className='h-6 py-0 text-xs' type='submit'>
            Save
          </Button>
        )}
      </div>
    </form>
  );
};

export default SheetTitleDesc;
