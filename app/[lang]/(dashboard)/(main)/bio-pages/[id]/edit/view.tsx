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
import { BioPages } from '@prisma/client';
import { editBioPageSchema } from '@/validation/bio';
import { useRouter } from 'next/navigation';

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
  data: BioPages;
}

export default function UpdateShortlinkForm({
  id,
  trans,
  data,
}: UpdateShortlinkFormProps) {
  const router = useRouter();

  const form = useForm<z.infer<typeof editBioPageSchema>>({
    resolver: zodResolver(editBioPageSchema),
    defaultValues: {
      title: data.title,
      username: data.username,
      description: data.description || '',
      visibility: data.visibility ?? 'public',
      profile_image_url: data.profile_image_url || '',
      theme_config: data.theme_config as {
        name?: string | undefined;
        colors?:
          | {
              primary?: string | undefined;
              text?: string | undefined;
              background?: string | undefined;
            }
          | undefined;
      },
      seo_title: data.seo_title || '',
      seo_description: data.seo_description || '',
      social_image_url: data.social_image_url || '',
    },
  });
  const onSubmit = async (data: z.infer<typeof editBioPageSchema>) => {
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
                name='title'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input
                        placeholder='https://example.com'
                        {...field}
                        className={cn('', {
                          'border-destructive focus:border-destructive':
                            form.formState.errors.title,
                        })}
                        value={data.title}
                      />
                    </FormControl>
                    <FormMessage className='px-0' />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='username'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input
                        placeholder='Username'
                        {...field}
                        className={cn('', {
                          'border-destructive focus:border-destructive':
                            form.formState.errors.username,
                        })}
                      />
                    </FormControl>
                    <FormMessage className='px-0' />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='social_image_url'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>social_image_url</FormLabel>
                    <FormControl>
                      <Input
                        placeholder='social_image_url'
                        {...field}
                        className={cn('', {
                          'border-destructive focus:border-destructive':
                            form.formState.errors.social_image_url,
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
                name='visibility'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Visibility</FormLabel>
                    <FormControl>
                      <Input
                        type='date'
                        placeholder='Private'
                        {...field}
                        className={cn('', {
                          'border-destructive focus:border-destructive':
                            form.formState.errors.visibility,
                        })}
                      />
                    </FormControl>
                    <FormMessage className='px-0' />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='seo_title'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>SEO Title</FormLabel>
                    <FormControl>
                      <Input
                        placeholder='SEO Title'
                        {...field}
                        className={cn('', {
                          'border-destructive focus:border-destructive':
                            form.formState.errors.seo_title,
                        })}
                      />
                    </FormControl>
                    <FormMessage className='px-0' />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='seo_description'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>SEO Description</FormLabel>
                    <FormControl>
                      <Input
                        type='text'
                        placeholder='SEO Description'
                        {...field}
                        className={cn('', {
                          'border-destructive focus:border-destructive':
                            form.formState.errors.seo_description,
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
                <Button
                  type='button'
                  variant='outline'
                  onClick={() => router.back()}
                >
                  Cancel{' '}
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
