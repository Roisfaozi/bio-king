'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toBase64 } from '@/lib/utils';
import { PencilIcon, User2Icon } from 'lucide-react';
import React, { useState } from 'react';

interface AvatarUploadProps {
  value?: string | File;
  onChange?: (value?: File) => void;
}

export function AvatarUpload({ value, onChange }: AvatarUploadProps) {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [imagePreview, setImagePreview] = useState<string>('');

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      onChange?.(file);
    }
  };

  return (
    <div className='relative h-40 w-40'>
      <Avatar className='h-full w-full'>
        <AvatarImage src={imagePreview} className='object-cover' />
        <AvatarFallback>
          <User2Icon className='h-16 w-16' />
        </AvatarFallback>
      </Avatar>
      <Button
        size='icon'
        className='absolute bottom-0 right-0 rounded-full p-1'
        onClick={(e) => {
          e.preventDefault();
          inputRef.current?.click();
        }}
      >
        <PencilIcon className='h-4 w-4' />
      </Button>
      <Input
        ref={inputRef}
        type='file'
        className='hidden'
        onChange={handleChange}
        accept='image/*'
      />
    </div>
  );
}
