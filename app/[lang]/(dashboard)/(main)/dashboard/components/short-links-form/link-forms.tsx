'use client';

import { cn } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import { createShortlink } from '@/action/links-action';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { CreateShortlinkInput, createShortlinkSchema } from '@/validation/link';
import { useRouter } from 'next/navigation';

const InputFormLink = () => {
  const router = useRouter();

  const form = useForm<CreateShortlinkInput>({
    resolver: zodResolver(createShortlinkSchema),
  });

  async function onSubmit(data: CreateShortlinkInput) {
    try {
      let response = await createShortlink(data);
      if (response?.status === 'success') {
        toast.success(response?.message);
        const { id } = response.data;
        form?.reset();

        // router.push(`/bio-pages/${id}/edit`);
      } else {
        toast.error(response?.message);
      }
    } catch (error) {
      console.error('Error creating bio page:', error);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='flex gap-4 pt-4'>
        <FormField
          control={form.control}
          name='original_url'
          render={({ field }) => (
            <FormItem className='w-full'>
              <FormControl>
                <Input
                  placeholder='DashTail'
                  size='lg'
                  {...field}
                  className={cn('', {
                    'border-destructive focus:border-destructive':
                      form.formState.errors.original_url,
                  })}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type='submit'>Short</Button>
      </form>
    </Form>
  );
};

export default InputFormLink;
