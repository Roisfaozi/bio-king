'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Camera, Check, X } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';

interface ProfileData {
  id: number;
  name: string;
  age: number;
  gender: string;
  image: string;
  completion: number;
  bio: string | undefined;
  location: string | undefined;
  interests: string[] | undefined;
}

interface ProfileEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: ProfileData;
  onSave: (updatedProfile: ProfileData) => void;
}

export default function ProfileEditModal({
  isOpen,
  onClose,
  profile,
  onSave,
}: ProfileEditModalProps) {
  const [formData, setFormData] = useState<ProfileData>({
    ...profile,
  });

  const [imagePreview, setImagePreview] = useState(profile.image);
  const [interests, setInterests] = useState<string[]>(profile.interests || []);
  const [newInterest, setNewInterest] = useState('');

  useEffect(() => {
    if (isOpen) {
      setFormData({ ...profile });
      setImagePreview(profile.image);
      setInterests(profile.interests || []);
      setNewInterest('');
    }
  }, [isOpen, profile]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'age' ? parseInt(value) || 0 : value,
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setImagePreview(result);
        setFormData((prev) => ({
          ...prev,
          image: result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const addInterest = () => {
    if (newInterest.trim() && !interests.includes(newInterest.trim())) {
      const updatedInterests = [...interests, newInterest.trim()];
      setInterests(updatedInterests);
      setFormData((prev) => ({
        ...prev,
        interests: updatedInterests,
      }));
      setNewInterest('');
    }
  };

  const removeInterest = (index: number) => {
    const updatedInterests = interests.filter((_, i) => i !== index);
    setInterests(updatedInterests);
    setFormData((prev) => ({
      ...prev,
      interests: updatedInterests,
    }));
  };

  const handleSave = () => {
    const updatedProfile = {
      ...formData,
      // Calculate completion based on filled fields
      completion: calculateCompletion(formData),
    };
    onSave(updatedProfile);
    onClose();
  };

  const calculateCompletion = (data: ProfileData): number => {
    let filledFields = 0;
    let totalFields = 0;

    // Basic fields
    const fields: (keyof ProfileData)[] = [
      'name',
      'age',
      'gender',
      'image',
      'bio',
      'location',
    ];
    fields.forEach((field) => {
      totalFields++;
      if (data[field] && String(data[field]).trim() !== '') {
        filledFields++;
      }
    });

    // Interests (count as one field)
    totalFields++;
    if (data.interests && data.interests.length > 0) {
      filledFields++;
    }

    return Math.round((filledFields / totalFields) * 100);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className='border border-gray-800 bg-black text-white sm:max-w-[500px]'>
        <DialogHeader>
          <DialogTitle className='text-xl font-bold text-[#fe3c72]'>
            Edit Profil
          </DialogTitle>
          <DialogDescription className='text-gray-400'>
            Lengkapi profil untuk meningkatkan peluang mendapatkan kecocokan.
          </DialogDescription>
        </DialogHeader>

        <div className='grid gap-4 py-4'>
          {/* Profile Image */}
          <div className='flex flex-col items-center gap-2'>
            <div className='relative'>
              <div className='relative h-32 w-32 overflow-hidden rounded-full border-2 border-[#fe3c72]'>
                <Image
                  src={imagePreview || '/placeholder.svg'}
                  alt='Profile'
                  fill
                  className='object-cover'
                />
              </div>
              <label
                htmlFor='image-upload'
                className='absolute bottom-0 right-0 cursor-pointer rounded-full bg-[#fe3c72] p-2 text-white'
              >
                <Camera className='h-5 w-5' />
              </label>
              <input
                id='image-upload'
                type='file'
                accept='image/*'
                onChange={handleImageChange}
                className='hidden'
              />
            </div>
          </div>

          {/* Basic Info */}
          <div className='grid grid-cols-2 gap-4'>
            <div className='space-y-2'>
              <Label htmlFor='name' className='text-white'>
                Nama
              </Label>
              <Input
                id='name'
                name='name'
                value={formData.name}
                onChange={handleChange}
                className='border-gray-800 bg-gray-900 text-white'
              />
            </div>
            <div className='space-y-2'>
              <Label htmlFor='age' className='text-white'>
                Umur
              </Label>
              <Input
                id='age'
                name='age'
                type='number'
                value={formData.age}
                onChange={handleChange}
                className='border-gray-800 bg-gray-900 text-white'
              />
            </div>
          </div>

          <div className='space-y-2'>
            <Label htmlFor='gender' className='text-white'>
              Jenis Kelamin
            </Label>
            <div className='flex gap-4'>
              <button
                type='button'
                onClick={() =>
                  setFormData((prev) => ({ ...prev, gender: 'male' }))
                }
                className={`flex-1 rounded-full py-2 text-center ${
                  formData.gender === 'male'
                    ? 'bg-[#fe3c72] text-white'
                    : 'bg-gray-900 text-gray-300'
                }`}
              >
                Pria
              </button>
              <button
                type='button'
                onClick={() =>
                  setFormData((prev) => ({ ...prev, gender: 'female' }))
                }
                className={`flex-1 rounded-full py-2 text-center ${
                  formData.gender === 'female'
                    ? 'bg-[#fe3c72] text-white'
                    : 'bg-gray-900 text-gray-300'
                }`}
              >
                Wanita
              </button>
            </div>
          </div>

          <div className='space-y-2'>
            <Label htmlFor='location' className='text-white'>
              Lokasi
            </Label>
            <Input
              id='location'
              name='location'
              value={formData.location || ''}
              onChange={handleChange}
              placeholder='Contoh: Jakarta, Indonesia'
              className='border-gray-800 bg-gray-900 text-white'
            />
          </div>

          <div className='space-y-2'>
            <Label htmlFor='bio' className='text-white'>
              Bio
            </Label>
            <Textarea
              id='bio'
              name='bio'
              value={formData.bio || ''}
              onChange={handleChange}
              placeholder='Ceritakan tentang dirimu...'
              className='min-h-[80px] border-gray-800 bg-gray-900 text-white'
            />
          </div>

          {/* Interests */}
          <div className='space-y-2'>
            <Label htmlFor='interests' className='text-white'>
              Minat & Hobi
            </Label>
            <div className='flex gap-2'>
              <Input
                id='interests'
                value={newInterest}
                onChange={(e) => setNewInterest(e.target.value)}
                placeholder='Tambah minat (enter untuk menambahkan)'
                className='border-gray-800 bg-gray-900 text-white'
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    addInterest();
                  }
                }}
              />
              <Button
                type='button'
                onClick={addInterest}
                className='bg-[#fe3c72] hover:bg-[#d2255c]'
              >
                <Check className='h-4 w-4' />
              </Button>
            </div>

            <div className='mt-2 flex flex-wrap gap-2'>
              {interests.map((interest, index) => (
                <span
                  key={index}
                  className='inline-flex items-center rounded-full bg-gray-800 px-3 py-1 text-sm'
                >
                  {interest}
                  <button
                    type='button'
                    onClick={() => removeInterest(index)}
                    className='ml-1'
                  >
                    <X className='h-3 w-3 text-gray-400' />
                  </button>
                </span>
              ))}
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button
            variant='outline'
            onClick={onClose}
            className='border-gray-700 bg-transparent text-white hover:bg-gray-800'
          >
            Batal
          </Button>
          <Button
            onClick={handleSave}
            className='bg-[#fe3c72] hover:bg-[#d2255c]'
          >
            Simpan Perubahan
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
