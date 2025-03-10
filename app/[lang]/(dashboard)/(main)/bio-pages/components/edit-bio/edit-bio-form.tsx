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
import { SOCIAL_PLATFORMS, THEMES } from '@/config/bio.config';
import { BioLink, BioPage, SocialLink } from '@/models/bio-page';
import { EditBioInput, editBioPageSchema } from '@/validation/bio';
import { zodResolver } from '@hookform/resolvers/zod';
import { ImageUp, Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ImageUploader } from '@/components/ui/upload-preview-image';

export default function EditBioForm({ bioPage }: { bioPage: BioPage }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>(
    bioPage.social_links || [],
  );
  const [bioLinks, setBioLinks] = useState<BioLink[]>(bioPage.bio_links || []);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

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

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      form.setValue('social_image_url', file);
    }
  };

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
              <TabsTrigger value='appearance'>Appearance</TabsTrigger>
              <TabsTrigger value='seo'>SEO</TabsTrigger>
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
            <TabsContent value='appearance' className='space-y-6'>
              <div>
                <label className='mb-4 block text-lg font-medium text-gray-900'>
                  Choose a Theme
                </label>
                <div className='grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4'>
                  {THEMES.map((theme) => (
                    <div
                      key={theme.name}
                      className={`relative cursor-pointer overflow-hidden rounded-lg transition-all ${
                        selectedTheme === theme.name
                          ? 'ring-2 ring-indigo-500'
                          : ''
                      }`}
                      onClick={() => {
                        setValue(
                          'theme_config',
                          {
                            name: theme.name,
                            colors: theme.colors,
                          },
                          { shouldValidate: true },
                        );
                      }}
                    >
                      <div
                        className='aspect-[4/3]'
                        style={{
                          background: theme.colors.background,
                        }}
                      >
                        <div className='flex flex-col items-center p-4'>
                          <span
                            className='text-sm'
                            style={{ color: theme.colors.text }}
                          >
                            {theme.label}
                          </span>
                          <div
                            className='mt-2 w-full rounded-md py-2 text-center text-sm'
                            style={{
                              background: theme.colors.primary,
                              color: theme.colors.text,
                            }}
                          >
                            Link
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value='seo' className='space-y-6'>
              <ImageUploader
                form={form}
                name='social_image_url'
                label='Social Image'
              />

              <FormField
                control={form.control}
                name='seo_title'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder='Enter your best keyword title to reach more people'
                        className='resize-none'
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Reach more people in your page
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='seo_description'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder='Write a short description to help people find your page'
                        className='resize-none'
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Provide a concise summary to enhance discoverability of
                      your page
                    </FormDescription>
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
