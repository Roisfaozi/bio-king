'use client';
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useDropzone } from 'react-dropzone';
import { z } from 'zod';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { ImagePlus, X } from 'lucide-react';
import { toast } from 'sonner';
import Image from 'next/image';
import { cn } from '@/lib/utils';

interface ImageUploaderProps {
  form: any; // You can type this more specifically based on your form structure
  name: string; // The field name in the parent form
  label?: string;
  description?: string;
  maxSize?: number;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({
  form,
  name,
  label = 'Upload Image',
  description = 'Upload a JPG or PNG image (max 1MB)',
  maxSize = 1000000,
}) => {
  const [preview, setPreview] = React.useState<string | ArrayBuffer | null>('');

  const onDrop = React.useCallback(
    (acceptedFiles: File[]) => {
      const reader = new FileReader();
      try {
        reader.onload = () => setPreview(reader.result);
        reader.readAsDataURL(acceptedFiles[0]);
        form.setValue('image', acceptedFiles[0]);
        form.clearErrors('image');
      } catch (error) {
        setPreview(null);
        form.resetField('image');
      }
    },
    [form, name],
  );

  const { getRootProps, getInputProps, isDragActive, fileRejections } =
    useDropzone({
      onDrop,
      maxFiles: 1,
      maxSize,
      accept: { 'image/png': [], 'image/jpg': [], 'image/jpeg': [] },
    });

  const fileRejectionItems = fileRejections.map(({ file, errors }) => (
    <div key={file.name} className='mt-2 text-sm text-red-500'>
      {errors.map((e) => (
        <p key={e.code}>
          {e.code === 'file-too-large'
            ? `File is too large. Max size is ${maxSize / 1000000}MB`
            : e.message}
        </p>
      ))}
    </div>
  ));

  return (
    <FormField
      control={form.control}
      name='image'
      render={({ field, fieldState }) => (
        <FormItem className='mx-auto md:w-1/2'>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <div
              {...getRootProps()}
              className={cn(
                'cursor-pointer rounded-lg border-2 border-dashed p-4 hover:bg-gray-50',
                isDragActive ? 'border-primary' : 'border-gray-300',
                fieldState.error ? 'border-red-500' : '',
              )}
            >
              <Input {...getInputProps()} type='file' />
              {/* Display preview if available */}
              {preview ? (
                <div className='flex w-full items-center justify-center'>
                  <div className='relative max-h-[400px] w-full max-w-xs overflow-hidden rounded-md border border-gray-200 shadow-md'>
                    <Image
                      src={preview as string}
                      alt='Uploaded image'
                      className='rounded-lg object-contain'
                      width={400}
                      height={300}
                      layout='intrinsic'
                    />
                    <button
                      type='button'
                      onClick={(e) => {
                        e.stopPropagation();
                        setPreview(null);
                        form.setValue(name, null);
                      }}
                      className='absolute right-2 top-2 rounded-full bg-black bg-opacity-50 p-1 transition-all hover:bg-opacity-70'
                      aria-label='Remove image'
                    >
                      <X className='h-4 w-4 text-white' />
                    </button>
                  </div>
                </div>
              ) : (
                <div className='flex w-full flex-col items-center justify-center p-6'>
                  <ImagePlus className='h-12 w-12 text-gray-400' />
                  <p className='mt-2 text-center text-sm text-gray-500'>
                    {description}
                  </p>
                  {isDragActive && (
                    <p className='mt-2 text-sm font-medium text-primary'>
                      Drop the file here...
                    </p>
                  )}
                </div>
              )}
            </div>
          </FormControl>
          {fileRejectionItems}
          {fieldState.error && (
            <FormMessage>{fieldState.error.message}</FormMessage>
          )}
        </FormItem>
      )}
    />
  );
};
