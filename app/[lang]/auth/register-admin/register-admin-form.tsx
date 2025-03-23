'use client';

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
import { toast } from '@/components/ui/use-toast';
import {
  CreateAdminInput,
  createAdminSchema,
} from '@/validation/auth-validation';
import { zodResolver } from '@hookform/resolvers/zod';
import { AlertCircle, Eye, EyeOff, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { addAdmin } from '@/action/auth-action';

export default function RegisterAdminForm({ lang }: { lang: string }) {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const form = useForm<CreateAdminInput>({
    resolver: zodResolver(createAdminSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      token: '',
    },
  });

  const onSubmit = async (data: CreateAdminInput) => {
    setIsLoading(true);
    setError(null);

    try {
      // Menggunakan server action addAdmin
      const response = await addAdmin({
        name: data.name,
        email: data.email,
        password: data.password,
        token: data.token,
      });

      if (response.status >= 400) {
        throw new Error(response.message || 'Terjadi kesalahan saat mendaftar');
      }

      toast({
        title: 'Registrasi berhasil!',
        description: 'Akun admin telah berhasil dibuat.',
      });

      router.push(`/${lang}/auth/login`);
    } catch (error: any) {
      setError(error.message);
      console.error('Registrasi gagal:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className='space-y-6'>
      {error && (
        <Alert color='destructive'>
          <AlertCircle className='h-4 w-4' />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
          <FormField
            control={form.control}
            name='name'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nama</FormLabel>
                <FormControl>
                  <Input
                    placeholder='Masukkan nama lengkap'
                    disabled={isLoading}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder='Masukkan email'
                    type='email'
                    disabled={isLoading}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
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
                  <div className='relative'>
                    <Input
                      placeholder='Masukkan password'
                      type={showPassword ? 'text' : 'password'}
                      disabled={isLoading}
                      {...field}
                    />
                    <Button
                      type='button'
                      variant='ghost'
                      size='icon'
                      className='absolute right-0 top-0 h-full px-3 py-2'
                      onClick={toggleShowPassword}
                    >
                      {showPassword ? (
                        <EyeOff className='h-4 w-4' />
                      ) : (
                        <Eye className='h-4 w-4' />
                      )}
                    </Button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='token'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Token Admin</FormLabel>
                <FormControl>
                  <Input
                    placeholder='Masukkan token admin'
                    type='password'
                    disabled={isLoading}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className='pt-2'>
            <Button
              className='w-full'
              size='lg'
              type='submit'
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                  Sedang Memproses...
                </>
              ) : (
                'Buat Akun Admin'
              )}
            </Button>
          </div>
        </form>
      </Form>

      <div className='text-center text-sm'>
        <Link
          href={`/${lang}/auth/login`}
          className='text-primary hover:underline'
        >
          Kembali ke halaman login
        </Link>
      </div>
    </div>
  );
}
