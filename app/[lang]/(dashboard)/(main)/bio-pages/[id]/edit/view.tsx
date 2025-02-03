'use client';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const schema = z.object({
  url: z.string().url({ message: 'Invalid URL' }),
  metaTitle: z.string().min(1, { message: 'Meta title is required' }),
  metaDescription: z.string().optional(),
  deepLinking: z.boolean().optional(),
  expirationDate: z.string().optional(),
  expirationRedirect: z.string().url().optional(),
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters' })
    .optional(),
  description: z.string().optional(),
});

interface UpdateShortlinkFormProps {
  id: string;
  trans: any;
  data: BioPage;
}

type BioPage = {
  id: string;
  url: string;
  metaTitle: string;
  metaDescription: string;
  deepLinking: boolean;
  expirationDate: string;
  expirationRedirect: string;
  password: string;
  description: string;
  createdAt: string;
};

export default function UpdateShortlinkForm({
  id,
  trans,
  data,
}: UpdateShortlinkFormProps) {
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      url: data.url,
      metaTitle: '',
      metaDescription: '',
      deepLinking: false,
      expirationDate: '',
      expirationRedirect: '',
      password: '',
      description: '',
    },
  });
  const onSubmit = async (data: z.infer<typeof schema>) => {
    const response = await fetch('/api/update-link', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    const result = await response.json();
    console.log(result);
  };

  return (
    <div className='mx-auto max-w-4xl p-6'>
      <Card>
        <CardContent className='p-6'>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
              <FormField
                control={form.control}
                name='url'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Url</FormLabel>
                    <FormControl>
                      <Input
                        placeholder='https://example.com'
                        {...field}
                        className={cn('', {
                          'border-destructive focus:border-destructive':
                            form.formState.errors.url,
                        })}
                        value={data.url}
                      />
                    </FormControl>
                    <FormMessage className='px-0' />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='metaTitle'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Meta Title</FormLabel>
                    <FormControl>
                      <Input
                        placeholder='Meta title'
                        {...field}
                        className={cn('', {
                          'border-destructive focus:border-destructive':
                            form.formState.errors.metaTitle,
                        })}
                      />
                    </FormControl>
                    <FormMessage className='px-0' />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='metaDescription'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Meta Description</FormLabel>
                    <FormControl>
                      <Input
                        placeholder='Meta description'
                        {...field}
                        className={cn('', {
                          'border-destructive focus:border-destructive':
                            form.formState.errors.metaDescription,
                        })}
                      />
                    </FormControl>
                    <FormMessage className='px-0' />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='deepLinking'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Deep Linking</FormLabel>
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='expirationDate'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Expiration Date</FormLabel>
                    <FormControl>
                      <Input
                        type='date'
                        placeholder='Expiration date'
                        {...field}
                        className={cn('', {
                          'border-destructive focus:border-destructive':
                            form.formState.errors.expirationDate,
                        })}
                      />
                    </FormControl>
                    <FormMessage className='px-0' />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='expirationRedirect'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Expiration Redirect</FormLabel>
                    <FormControl>
                      <Input
                        placeholder='Expiration redirect'
                        {...field}
                        className={cn('', {
                          'border-destructive focus:border-destructive':
                            form.formState.errors.expirationRedirect,
                        })}
                      />
                    </FormControl>
                    <FormMessage className='px-0' />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='password'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type='password'
                        placeholder='Password'
                        {...field}
                        className={cn('', {
                          'border-destructive focus:border-destructive':
                            form.formState.errors.password,
                        })}
                      />
                    </FormControl>
                    <FormMessage className='px-0' />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='description'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder='Tell us a little bit about yourself'
                        className='resize-none'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className='px-0' />
                  </FormItem>
                )}
              />

              <div className='flex justify-end space-x-2'>
                <Button type='button' variant='outline'>
                  Cancel
                </Button>
                <Button type='submit'>Update Link</Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
