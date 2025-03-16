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
  FormLabel,
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
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4 pt-4'>
        <div className='flex flex-col gap-4'>
          <FormField
            control={form.control}
            name='original_url'
            render={({ field }) => (
              <FormItem className='w-full'>
                <FormLabel>URL</FormLabel>
                <FormControl>
                  <Input
                    placeholder='Masukkan URL (https://example.com)'
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

          <FormField
            control={form.control}
            name='title'
            render={({ field }) => (
              <FormItem className='w-full'>
                <FormLabel>Judul (Opsional)</FormLabel>
                <FormControl>
                  <Input
                    placeholder='Judul (opsional)'
                    size='lg'
                    {...field}
                    className={cn('', {
                      'border-destructive focus:border-destructive':
                        form.formState.errors.title,
                    })}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type='submit' className='md:self-start'>
            Short
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default InputFormLink;
