'use client';

import { updateShortlinkByShortcode } from '@/action/links-action';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { credentialsConfig } from '@/config/credentials.config';
import { ShortlinkWithClicksResponse } from '@/models/shortlink-response';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowLeft, Copy, ExternalLink, Loader2, Save } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { z } from 'zod';

interface EditShortlinkViewProps {
  trans: {
    [key: string]: string;
  };
  shortlink: ShortlinkWithClicksResponse;
}

// Define form schema
const formSchema = z.object({
  title: z.string().max(50, 'Title must be less than 50 characters').optional(),
  is_active: z.boolean().default(true),
});

type FormValues = z.infer<typeof formSchema>;

const EditShortlinkView = ({ trans, shortlink }: EditShortlinkViewProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  // Format date
  const formatDate = (timestamp: bigint | null) => {
    if (!timestamp) return 'N/A';

    const date = new Date(Number(timestamp));
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  // Initialize form
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: shortlink.title || '',
      is_active: shortlink.is_active === true,
    },
  });

  // Handle form submission
  const onSubmit = async (values: FormValues) => {
    setIsLoading(true);

    try {
      const response = await updateShortlinkByShortcode({
        shortcode: shortlink.short_code,
        title: values.title || null,
        is_active: values.is_active,
      });

      if (response.status === 'success') {
        toast.success('Shortlink updated successfully');
        router.push('/shortlinks');
        router.refresh();
      } else {
        toast.error(response.message || 'Failed to update shortlink');
      }
    } catch (error) {
      console.error('Error updating shortlink:', error);
      toast.error('An error occurred while updating the shortlink');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle copy link
  const handleCopyLink = () => {
    const fullUrl = `${credentialsConfig.siteUrl}/${shortlink.short_code}`;
    navigator.clipboard.writeText(fullUrl);
    toast.success('Link copied to clipboard!');
  };

  // Handle open link
  const handleOpenLink = () => {
    const fullUrl = `${credentialsConfig.siteUrl}/${shortlink.short_code}`;
    window.open(fullUrl, '_blank');
  };

  return (
    <div className='space-y-6'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-2'>
          <Button
            variant='outline'
            size='icon'
            onClick={() => router.push('/shortlinks')}
          >
            <ArrowLeft className='h-4 w-4' />
          </Button>
          <h1 className='text-2xl font-bold tracking-tight'>Edit Shortlink</h1>
        </div>

        <div className='flex items-center gap-2'>
          <Button
            variant='outline'
            size='sm'
            className='gap-2'
            onClick={handleCopyLink}
          >
            <Copy className='h-4 w-4' />
            <span className='hidden sm:inline'>Copy Link</span>
          </Button>
          <Button
            variant='outline'
            size='sm'
            className='gap-2'
            onClick={handleOpenLink}
          >
            <ExternalLink className='h-4 w-4' />
            <span className='hidden sm:inline'>Open</span>
          </Button>
        </div>
      </div>

      <div className='grid gap-6 md:grid-cols-2'>
        <Card>
          <CardHeader>
            <CardTitle>Shortlink Details</CardTitle>
            <CardDescription>
              View and edit your shortlink details
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className='space-y-6'
              >
                <FormField
                  control={form.control}
                  name='title'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input
                          placeholder='Enter a title for your shortlink'
                          {...field}
                          value={field.value || ''}
                        />
                      </FormControl>
                      <FormDescription>
                        A descriptive title to help you identify this shortlink
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name='is_active'
                  render={({ field }) => (
                    <FormItem className='flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4'>
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className='space-y-1 leading-none'>
                        <FormLabel>Active</FormLabel>
                        <FormDescription>
                          When active, your shortlink will redirect to the
                          original URL. When inactive, it will return a 404
                          error.
                        </FormDescription>
                      </div>
                    </FormItem>
                  )}
                />

                <div className='flex justify-end'>
                  <Button type='submit' disabled={isLoading} className='gap-2'>
                    {isLoading ? (
                      <>
                        <Loader2 className='h-4 w-4 animate-spin' />
                        <span>Saving...</span>
                      </>
                    ) : (
                      <>
                        <Save className='h-4 w-4' />
                        <span>Save Changes</span>
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Shortlink Information</CardTitle>
            <CardDescription>
              View information about your shortlink
            </CardDescription>
          </CardHeader>
          <CardContent className='space-y-4'>
            <div>
              <h3 className='text-sm font-medium text-muted-foreground'>
                Short URL
              </h3>
              <p className='mt-1 flex items-center gap-2 font-mono text-sm'>
                {credentialsConfig.siteUrl}/{shortlink.short_code}
                <Button
                  variant='ghost'
                  size='icon'
                  className='h-6 w-6 rounded-full'
                  onClick={handleCopyLink}
                >
                  <Copy className='h-3 w-3' />
                </Button>
              </p>
            </div>

            <div>
              <h3 className='text-sm font-medium text-muted-foreground'>
                Original URL
              </h3>
              <p className='mt-1 break-all text-sm'>{shortlink.original_url}</p>
            </div>

            <Separator />

            <div className='grid grid-cols-2 gap-4'>
              <div>
                <h3 className='text-sm font-medium text-muted-foreground'>
                  Created
                </h3>
                <p className='mt-1 text-sm'>
                  {formatDate(shortlink.created_at)}
                </p>
              </div>

              <div>
                <h3 className='text-sm font-medium text-muted-foreground'>
                  Last Updated
                </h3>
                <p className='mt-1 text-sm'>
                  {formatDate(shortlink.updated_at)}
                </p>
              </div>

              <div>
                <h3 className='text-sm font-medium text-muted-foreground'>
                  Clicks
                </h3>
                <p className='mt-1 text-sm'>{shortlink._count?.clicks || 0}</p>
              </div>

              <div>
                <h3 className='text-sm font-medium text-muted-foreground'>
                  Status
                </h3>
                <p className='mt-1 text-sm'>
                  {shortlink.is_active === true ? 'Active' : 'Inactive'}
                </p>
              </div>
            </div>
          </CardContent>
          <CardFooter className='flex justify-between border-t px-6 py-4'>
            <Link
              href='/shortlinks'
              className='text-sm text-muted-foreground hover:underline'
            >
              Back to Shortlinks
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default EditShortlinkView;
