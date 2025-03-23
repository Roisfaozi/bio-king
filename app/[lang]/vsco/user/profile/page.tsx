'use client';

import ProfileEditModal from '@/app/[lang]/vsco/components/profile-edit-modal';
import { Button } from '@/components/ui/button';
import {
  Grid,
  Settings,
  Edit,
  Image as ImageIcon,
  Camera,
  LogOut,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

// Definisikan tipe yang sama dengan yang digunakan di modal
interface ProfileData {
  id: number;
  username: string;
  displayName: string;
  bio: string | undefined;
  website: string | undefined;
  image: string;
  completion: number;
  interests: string[] | undefined;
}

// Data dummy profil
const dummyProfiles: ProfileData[] = [
  {
    id: 1,
    username: 'photoart',
    displayName: 'Photo Artistry',
    bio: 'Fotografer landscape dan portrait. Mencari keindahan di setiap sudut.',
    website: 'photoartistry.com',
    image: 'https://randomuser.me/api/portraits/women/44.jpg',
    completion: 85,
    interests: ['Fotografi', 'Traveling', 'Seni'],
  },
  {
    id: 2,
    username: 'minimal_studios',
    displayName: 'Minimal Studios',
    bio: 'Fotografi minimalis dan desain.',
    website: 'minimalstudios.com',
    image: 'https://randomuser.me/api/portraits/men/32.jpg',
    completion: 70,
    interests: ['Desain', 'Minimalis', 'Arsitektur'],
  },
  {
    id: 3,
    username: 'naturelover',
    displayName: 'Nature & Scenery',
    bio: 'Mendokumentasikan keindahan alam di seluruh dunia.',
    website: 'nature-photos.com',
    image: 'https://randomuser.me/api/portraits/women/68.jpg',
    completion: 90,
    interests: ['Alam', 'Wildlife', 'Hiking'],
  },
  {
    id: 4,
    username: 'street.stories',
    displayName: 'Street Stories',
    bio: 'Mengabadikan momen kehidupan di jalanan kota.',
    website: 'streetstories.io',
    image: 'https://randomuser.me/api/portraits/men/75.jpg',
    completion: 95,
    interests: ['Urban', 'Street Photography', 'Dokumenter'],
  },
];

// Dummy gallery photos
const dummyPhotos = [
  '/placeholder.svg?height=400&width=400',
  '/placeholder.svg?height=400&width=400',
  '/placeholder.svg?height=400&width=400',
  '/placeholder.svg?height=400&width=400',
  '/placeholder.svg?height=400&width=400',
  '/placeholder.svg?height=400&width=400',
  '/placeholder.svg?height=400&width=400',
  '/placeholder.svg?height=400&width=400',
  '/placeholder.svg?height=400&width=400',
];

export default function ProfilePage() {
  const [profile, setProfile] = useState<ProfileData>(dummyProfiles[0]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // Randomly select a profile when the component mounts
  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * dummyProfiles.length);
    setProfile(dummyProfiles[randomIndex]);
  }, []);

  const handleEditProfile = () => {
    setIsEditModalOpen(true);
  };

  const handleSaveProfile = (updatedProfile: ProfileData) => {
    setProfile(updatedProfile);
    setIsEditModalOpen(false);
  };

  return (
    <div className='min-h-screen bg-white'>
      {/* Header */}
      <header className='sticky top-0 z-10 border-b border-gray-200 bg-white py-4'>
        <div className='mx-auto flex max-w-5xl items-center justify-between px-4'>
          <Link href='/' className='text-xl font-bold uppercase tracking-wider'>
            VSCO
          </Link>
          <div className='flex items-center space-x-4'>
            <button className='rounded-full p-2 hover:bg-gray-100'>
              <Grid className='h-5 w-5' />
            </button>
            <button className='rounded-full p-2 hover:bg-gray-100'>
              <Settings className='h-5 w-5' />
            </button>
            <div className='relative h-8 w-8 overflow-hidden rounded-full'>
              <Image
                src={profile.image}
                alt='Profile'
                fill
                className='object-cover'
              />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className='mx-auto max-w-5xl px-4 py-8'>
        {/* Profile Header */}
        <div className='mb-12 flex flex-col items-center'>
          <div className='relative mb-6'>
            <div className='relative h-24 w-24 overflow-hidden rounded-full'>
              <Image
                src={profile.image}
                alt={profile.displayName}
                fill
                className='object-cover'
              />
            </div>
            <button
              onClick={handleEditProfile}
              className='absolute -right-2 bottom-0 rounded-full bg-gray-200 p-2 hover:bg-gray-300'
            >
              <Edit className='h-4 w-4' />
            </button>
          </div>

          <h1 className='mb-1 text-2xl font-bold'>{profile.displayName}</h1>
          <p className='mb-2 text-gray-600'>@{profile.username}</p>

          {profile.bio && (
            <p className='mb-4 max-w-md text-center text-gray-700'>
              {profile.bio}
            </p>
          )}

          {profile.website && (
            <a
              href={`https://${profile.website.replace(/^https?:\/\//, '')}`}
              target='_blank'
              rel='noopener noreferrer'
              className='mb-6 text-sm text-gray-500 hover:underline'
            >
              {profile.website.replace(/^https?:\/\//, '')}
            </a>
          )}

          <div className='mb-8 flex w-full max-w-xs justify-between'>
            <Button
              variant='outline'
              className='flex-1 rounded-full border-gray-300'
              onClick={handleEditProfile}
            >
              Edit Profil
            </Button>
          </div>

          {/* Interests/Tags */}
          {profile.interests && profile.interests.length > 0 && (
            <div className='mb-10 flex flex-wrap justify-center gap-2'>
              {profile.interests.map((interest, index) => (
                <span
                  key={index}
                  className='rounded-full bg-gray-100 px-4 py-1 text-sm text-gray-700'
                >
                  {interest}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Gallery */}
        <div className='mb-8'>
          <div className='mb-6 flex items-center justify-between'>
            <h2 className='text-lg font-semibold'>Galeri</h2>
            <div className='flex space-x-2'>
              <button className='rounded-full bg-gray-100 p-2 hover:bg-gray-200'>
                <ImageIcon className='h-5 w-5' />
              </button>
              <button className='rounded-full bg-gray-100 p-2 hover:bg-gray-200'>
                <Camera className='h-5 w-5' />
              </button>
            </div>
          </div>

          <div className='grid grid-cols-3 gap-1 md:gap-2'>
            {dummyPhotos.map((photo, index) => (
              <div
                key={index}
                className='relative aspect-square overflow-hidden'
              >
                <Image
                  src={photo}
                  alt={`Gallery item ${index + 1}`}
                  fill
                  className='object-cover transition-transform hover:scale-105'
                />
              </div>
            ))}
          </div>
        </div>

        {/* Profile Completion */}
        <div className='mt-12 rounded-lg bg-gray-50 p-4'>
          <div className='mb-2 flex items-center justify-between'>
            <h3 className='font-medium'>Penyelesaian Profil</h3>
            <span className='text-sm font-semibold'>{profile.completion}%</span>
          </div>
          <div className='h-2 w-full overflow-hidden rounded-full bg-gray-200'>
            <div
              className='h-full bg-black'
              style={{ width: `${profile.completion}%` }}
            ></div>
          </div>
          <p className='mt-2 text-sm text-gray-500'>
            Lengkapi profil Anda untuk meningkatkan visibilitas.
          </p>
        </div>

        {/* Logout Button */}
        <div className='mt-12 flex justify-center'>
          <Button
            variant='outline'
            className='rounded-full border-gray-300 text-gray-600 hover:bg-gray-100'
          >
            <LogOut className='mr-2 h-4 w-4' /> Keluar
          </Button>
        </div>
      </main>

      {/* Edit Profile Modal */}
      <ProfileEditModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        profile={profile}
        onSave={handleSaveProfile}
      />
    </div>
  );
}
