'use client';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTheme } from 'next-themes';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { createBio } from '@/action/bio-action';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { CreateBioInput, createBioSchema } from '@/validation/bio';
import { HelpCircle } from 'lucide-react';
import toast from 'react-hot-toast';

const AddBioDialog = () => {
  const { theme: mode } = useTheme();
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateBioInput>({
    resolver: zodResolver(createBioSchema),
  });

  const onSubmit = async (data: CreateBioInput) => {
    try {
      let response = await createBio(data);
      if (response?.status === 'success') {
        toast.success(response?.message);
        reset();
        console.log(response);
        router.push(`/bio-pages/${response.id}/edit`);
      } else {
        toast.error(response?.message);
      }
    } catch (error) {
      console.error('Error creating bio page:', error);
    }
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          color={mode === 'dark' ? 'secondary' : 'default'}
          className={cn('font-normal', {
            'bg-white text-default-600': mode !== 'dark',
          })}
        >
          Form
        </Button>
      </DialogTrigger>
      <DialogContent size='2xl'>
        <DialogHeader className='p-0'>
          <DialogTitle className='text-base font-medium text-default-700'>
            Create a Bio
          </DialogTitle>
        </DialogHeader>
        <div>
          <div>
            <ScrollArea className='h-full'>
              <div className='space-y-4 sm:flex sm:flex-col sm:gap-5 sm:space-y-0'>
                <div className='flex flex-col gap-2'>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Label
                          htmlFor='name'
                          className='flex cursor-pointer items-center gap-2 text-sm text-default-700'
                          aria-label='A unique name will help you identify your bio page'
                        >
                          Username <HelpCircle className='h-3 w-3' />
                        </Label>
                      </TooltipTrigger>
                      <TooltipContent>
                        A unique username will help you identify your bio page
                      </TooltipContent>
                    </Tooltip>
                    <Input
                      type='text'
                      placeholder='Enter first name'
                      {...register('username')}
                    />
                  </TooltipProvider>
                </div>
                <div className='flex flex-col gap-2'>
                  <Label className='text-sm text-default-700'>Title</Label>
                  <Input
                    type='text'
                    placeholder='Enter alias'
                    {...register('title')}
                  />
                  <p className='text-xs text-default-600'>
                    Leave this field empty to generate a random alias
                  </p>
                </div>
              </div>
            </ScrollArea>
          </div>
          <div className='mt-4 flex justify-center gap-3'>
            <DialogClose asChild>
              <Button type='button' variant='outline'>
                Cancel
              </Button>
            </DialogClose>
            <Button type='button' onClick={handleSubmit(onSubmit)}>
              Create
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddBioDialog;
