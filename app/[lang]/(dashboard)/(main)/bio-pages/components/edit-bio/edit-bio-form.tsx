'use client';
import { AvatarUpload } from '@/components/ui/avatar-upload';
import { Button } from '@/components/ui/button';
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { SOCIAL_PLATFORMS } from '@/config/bio.config';
import { BioLink, SocialLink } from '@/models/bio-page';
import { EditBioInput, editBioPageSchema } from '@/validation/bio';
import { zodResolver } from '@hookform/resolvers/zod';
import { Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { toast } from 'sonner';

export default function EditBioForm({ bioPage }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>(
    bioPage.social_links || [],
  );
  const [bioLinks, setBioLinks] = useState<BioLink[]>(bioPage.bio_links || []);
  const router = useRouter();

  const form = useForm<EditBioInput>({
    resolver: zodResolver(editBioPageSchema),
    defaultValues: {
      title: bioPage.title,
      username: bioPage.username,
      description: bioPage.description || '',
      visibility: bioPage.visibility || 'public',
      profile_image_url: bioPage.profile_image_url || '',
      theme_config: bioPage.theme_config,
      seo_title: bioPage.seo_title || '',
      seo_description: bioPage.seo_description || '',
      social_image_url: bioPage.social_image_url || '',
      social_links: bioPage.social_links || [],
      bio_links: bioPage.bio_links || [],
    },
  });

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = form;

  const {
    fields: bioLinkFields,
    append: appendBioLink,
    ...socialLinkRest
  } = useFieldArray({
    name: 'bio_links',
    control: form.control,
  });

  const {
    fields: socialLinkFields,
    append: appendSocialLink,
    ...bioLinkRest
  } = useFieldArray({
    name: 'social_links',
    control: form.control,
  });
  const selectedTheme = watch('theme_config.name');
  console.log(watch('social_links'));
  function onSubmit(values: EditBioInput) {
    try {
      console.log(values);
      toast(
        <pre className='mt-2 w-[340px] rounded-md bg-slate-950 p-4'>
          <code className='text-white'>{JSON.stringify(values, null, 2)}</code>
        </pre>,
      );
    } catch (error) {
      console.error('Form submission error', error);
      toast.error('Failed to submit the form. Please try again.');
    }
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='mx-auto max-w-5xl space-y-8'
      >
        <Tabs defaultValue='general' className='w-full'>
          <div className='border-b border-gray-200 px-6 py-4'>
            <TabsList>
              <TabsTrigger value='general'>General</TabsTrigger>
              <TabsTrigger value='social'>Social</TabsTrigger>
            </TabsList>
          </div>

          {error && (
            <div className='px-6'>
              <div className='rounded bg-red-50 p-3 text-red-500'>{error}</div>
            </div>
          )}

          {success && (
            <div className='px-6'>
              <div className='rounded bg-green-50 p-3 text-green-500'>
                Changes saved successfully!
              </div>
            </div>
          )}

          <div className='p-6'>
            <TabsContent value='general' className='space-y-6'>
              <FormField
                control={form.control}
                name='profile_image_url'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Bio Image</FormLabel>
                    <FormControl>
                      <AvatarUpload
                        value={field.value}
                        onChange={field.onChange}
                      />
                    </FormControl>
                    <FormDescription>Select a file to upload.</FormDescription>
                    <FormMessage className='px-0' />
                  </FormItem>
                )}
              />

              <div className='grid grid-cols-12 gap-4'>
                <div className='col-span-6'>
                  <FormField
                    control={form.control}
                    name='title'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Title</FormLabel>
                        <FormControl>
                          <Input
                            size='lg'
                            placeholder='ad bio title here'
                            type='text'
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          This is your public title page.
                        </FormDescription>
                        <FormMessage className='px-0' />
                      </FormItem>
                    )}
                  />
                </div>

                <div className='col-span-6'>
                  <FormField
                    control={form.control}
                    name='username'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Username</FormLabel>
                        <FormControl>
                          <Input
                            size='lg'
                            placeholder='my-bio'
                            type='text'
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          This should be youre bio identity.
                        </FormDescription>
                        <FormMessage className='px-0' />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <FormField
                control={form.control}
                name='description'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder='Tell the world about who you are'
                        className='resize-none'
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      You can @mention other users and organizations.
                    </FormDescription>
                    <FormMessage className='px-0' />
                  </FormItem>
                )}
              />
              <div className='w-full'>
                <Button
                  type='button'
                  variant='outline'
                  size='sm'
                  className='mt-2'
                  onClick={() => appendSocialLink({ platform: '', url: '' })}
                >
                  <Plus className='mr-2 h-4 w-4' />
                  Add Social Link
                </Button>
              </div>

              {socialLinkFields.map((field, index) => (
                <div key={field.id} className='grid grid-cols-12 gap-4'>
                  <div className='col-span-6'>
                    <FormField
                      control={form.control}
                      name={`social_links.${index}.platform`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Social Platform</FormLabel>
                          <Select onValueChange={field.onChange}>
                            <SelectTrigger>
                              <SelectValue placeholder='Select your platform' />
                            </SelectTrigger>

                            <SelectContent>
                              {SOCIAL_PLATFORMS.map((platform) => (
                                <SelectItem
                                  key={platform.id}
                                  value={platform.id}
                                >
                                  {platform.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage className='px-0' />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className='col-span-6'>
                    <FormField
                      control={form.control}
                      name={`social_links.${index}.url`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Social Url</FormLabel>
                          <FormControl>
                            <Input
                              size='lg'
                              placeholder='https://www.facebook.com/yourusername'
                              type='text'
                              {...field}
                            />
                          </FormControl>
                          <FormDescription>
                            Enter your social media url
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              ))}
              <div className='w-full'>
                <Button
                  type='button'
                  variant='outline'
                  size='sm'
                  className='mt-2'
                  onClick={() => appendBioLink({ title: '', url: '' })}
                >
                  <Plus className='mr-2 h-4 w-4' />
                  Add New Website
                </Button>
              </div>
              {bioLinkFields.map((field, index) => (
                <div key={field.id} className='grid grid-cols-12 gap-4'>
                  <div className='col-span-6'>
                    <FormField
                      control={form.control}
                      name={`bio_links.${index}.title`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Bio Link</FormLabel>

                          <FormControl>
                            <Input
                              size='lg'
                              placeholder='https://www.facebook.com/yourusername'
                              type='text'
                              {...field}
                              value={field.value}
                            />
                          </FormControl>
                          <FormDescription>
                            Describe your external link.
                          </FormDescription>
                          <FormMessage className='px-0' />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className='col-span-6'>
                    <FormField
                      control={form.control}
                      name={`bio_links.${index}.url`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>External URL</FormLabel>
                          <FormControl>
                            <Input
                              size='lg'
                              placeholder='https://yourshop.com'
                              type='text'
                              {...field}
                            />
                          </FormControl>
                          <FormDescription>Your external url</FormDescription>
                          <FormMessage className='px-0' />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              ))}

              <FormField
                control={form.control}
                name='visibility'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Visibility</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder='Select bio visibility' />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value='public'>Public</SelectItem>
                        <SelectItem value='private'>private</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormDescription>Set who can see your bio</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </TabsContent>
          </div>
        </Tabs>

        <Button type='submit'>Submit</Button>
      </form>
    </Form>
  );
}
