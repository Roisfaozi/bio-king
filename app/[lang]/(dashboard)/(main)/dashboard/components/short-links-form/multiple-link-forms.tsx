'use client';
import { createBulkShortlinks } from '@/action/links-action';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { logError } from '@/lib/helper';
import { cn } from '@/lib/utils';
import { BulkShortlinkInput, bulkShortlinkSchema } from '@/validation/link';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

const BulkShortlinkForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<BulkShortlinkInput>({
    resolver: zodResolver(bulkShortlinkSchema),
    defaultValues: {
      original_urls: '',
    },
  });

  const onSubmit = async (data: BulkShortlinkInput) => {
    setIsSubmitting(true);
    try {
      const response = await createBulkShortlinks(data);

      if (response.status === 'success') {
        toast.success(response.message);
        form.reset();
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      logError('Error creating shortlinks:', error);
      toast.error('Failed to create shortlinks');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
        <FormField
          control={form.control}
          name='original_urls'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Enter URLs (one per line)</FormLabel>
              <FormControl>
                <Textarea
                  placeholder='https://example.com/page1&#10;https://example.com/page2&#10;https://example.com/page3'
                  className={cn(
                    'mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500',
                    {
                      'border-destructive focus:border-destructive':
                        form.formState.errors.original_urls,
                    },
                  )}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type='submit' disabled={isSubmitting}>
          {isSubmitting ? 'Creating...' : 'Create Shortlinks'}
        </Button>
      </form>
    </Form>
  );
};

export default BulkShortlinkForm;
