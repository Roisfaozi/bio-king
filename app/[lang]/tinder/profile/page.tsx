'use client';

import CircularProgress from '@/app/[lang]/tinder/components/circular-progres';
import ProfileEditModal from '@/app/[lang]/tinder/components/profile-edit-modal';
import { Button } from '@/components/ui/button';
import {
  Check,
  CreditCard,
  Diamond,
  Edit2,
  Home,
  MessageCircle,
  Search,
  Settings,
  Shield,
  Star,
  User,
  Zap,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

// Dummy profiles - 2 male and 2 female with actual photos
const dummyProfiles = [
  {
    id: 1,
    name: 'Anna',
    age: 22,
    gender: 'female',
    image: 'https://randomuser.me/api/portraits/women/44.jpg',
    completion: 55,
    bio: 'Pencinta kopi dan buku. Suka jalan-jalan ke tempat baru.',
    location: 'Jakarta, Indonesia',
    interests: ['Membaca', 'Traveling', 'Fotografi'],
  },
  {
    id: 2,
    name: 'Michael',
    age: 28,
    gender: 'male',
    image: 'https://randomuser.me/api/portraits/men/32.jpg',
    completion: 75,
    bio: 'Senang hiking dan aktivitas outdoor. Bisa bermain gitar.',
    location: 'Bandung, Indonesia',
    interests: ['Hiking', 'Musik', 'Camping'],
  },
  {
    id: 3,
    name: 'Jessica',
    age: 24,
    gender: 'female',
    image: 'https://randomuser.me/api/portraits/women/68.jpg',
    completion: 60,
    bio: 'Foodie yang suka coba masakan baru. Juga suka menggambar.',
    location: 'Surabaya, Indonesia',
    interests: ['Kuliner', 'Seni', 'Film'],
  },
  {
    id: 4,
    name: 'David',
    age: 26,
    gender: 'male',
    image: 'https://randomuser.me/api/portraits/men/75.jpg',
    completion: 90,
    bio: 'Tech enthusiast dan traveler. Suka mencoba hal-hal baru.',
    location: 'Yogyakarta, Indonesia',
    interests: ['Teknologi', 'Travel', 'Olahraga'],
  },
];

export default function ProfilePage() {
  const [profile, setProfile] = useState(dummyProfiles[0]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // Randomly select a profile when the component mounts
  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * dummyProfiles.length);
    setProfile(dummyProfiles[randomIndex]);
  }, []);

  const handleEditProfile = () => {
    setIsEditModalOpen(true);
  };

  const handleSaveProfile = (updatedProfile: typeof profile) => {
    setProfile(updatedProfile);
    setIsEditModalOpen(false);
  };

  return (
    <div className='flex min-h-screen flex-col bg-black text-white'>
      {/* Top Navigation */}
      <header className='flex items-center justify-between border-b border-gray-800 px-4 py-3'>
        <Link href='/' className='flex items-center'>
          <svg
            viewBox='0 0 24 24'
            className='h-8 w-8 fill-current text-[#fe3c72]'
          >
            <path d='M16.5 11.5c0 2.5-1.5 4.5-4.5 4.5-2 0-4.5-2-4.5-4.5C7.5 9 9.5 7 12 7s4.5 2 4.5 4.5zm-4.5 6c3.5 0 6.5-2 6.5-6.5S15.5 5 12 5 5.5 7 5.5 11.5 9 17.5 12 17.5z' />
          </svg>
          <span className='ml-1 text-2xl font-bold text-[#fe3c72]'>tinder</span>
        </Link>
        <div className='flex items-center space-x-4'>
          <button className='p-2'>
            <Shield className='h-6 w-6 text-gray-400' />
          </button>
          <button className='p-2'>
            <Settings className='h-6 w-6 text-gray-400' />
          </button>
        </div>
      </header>

      {/* Profile Section */}
      <main className='flex-1 px-4 pb-20 pt-6'>
        <div className='flex flex-col items-center'>
          {/* Profile Picture with Progress Ring */}
          <div className='relative mb-4'>
            <CircularProgress
              percentage={profile.completion}
              size={180}
              strokeWidth={8}
              color='#fe3c72'
            />
            <div className='absolute inset-0 flex items-center justify-center'>
              <div className='relative h-[160px] w-[160px] overflow-hidden rounded-full'>
                <Image
                  src={profile.image || '/placeholder.svg'}
                  alt={`${profile.name}'s profile picture`}
                  fill
                  className='object-cover'
                />
              </div>
            </div>
            {/* Edit Button */}
            <button
              className='absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 transform rounded-full border-2 border-black bg-gray-800 p-2'
              onClick={handleEditProfile}
            >
              <Edit2 className='h-5 w-5 text-[#fe3c72]' />
            </button>
            {/* Completion Badge */}
            <div className='absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 transform whitespace-nowrap rounded-full bg-gradient-to-r from-[#fd267a] to-[#ff6036] px-6 py-2 text-sm font-bold text-white'>
              {profile.completion}% COMPLETE
            </div>
          </div>

          {/* Name and Verification */}
          <div className='mb-6 mt-8 flex items-center'>
            <h1 className='text-3xl font-bold'>
              {profile.name}, {profile.age}
            </h1>
            <button className='ml-2'>
              <svg
                viewBox='0 0 24 24'
                className='h-6 w-6 fill-current text-gray-400'
              >
                <path d='M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm-1.5 14.5l-4-4 1.5-1.5 2.5 2.5 6-6 1.5 1.5-7.5 7.5z' />
              </svg>
            </button>
          </div>

          {/* Bio and Location */}
          {(profile.bio || profile.location) && (
            <div className='mb-6 w-full rounded-lg bg-gray-900 p-4'>
              {profile.location && (
                <div className='mb-2 text-sm text-gray-400'>
                  <span className='font-semibold'>Lokasi:</span>{' '}
                  {profile.location}
                </div>
              )}
              {profile.bio && (
                <div className='text-sm'>
                  <span className='font-semibold text-gray-400'>Bio:</span>{' '}
                  {profile.bio}
                </div>
              )}
            </div>
          )}

          {/* Interests */}
          {profile.interests && profile.interests.length > 0 && (
            <div className='mb-6 w-full'>
              <h3 className='mb-2 text-lg font-bold'>Minat & Hobi</h3>
              <div className='flex flex-wrap gap-2'>
                {profile.interests.map((interest, index) => (
                  <span
                    key={index}
                    className='rounded-full bg-gray-800 px-3 py-1 text-sm'
                  >
                    {interest}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Feature Cards */}
          <div className='mb-6 grid w-full grid-cols-3 gap-3'>
            {/* Super Likes Card */}
            <div className='relative rounded-lg bg-gray-900 p-4'>
              <div className='absolute right-2 top-2'>
                <button className='rounded-full border border-gray-700 bg-gray-800 p-1'>
                  <svg
                    viewBox='0 0 24 24'
                    className='h-5 w-5 fill-current text-gray-400'
                  >
                    <path d='M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z' />
                  </svg>
                </button>
              </div>
              <Star className='mb-2 h-8 w-8 text-blue-400' />
              <div className='font-bold text-blue-400'>0 Super Likes</div>
              <div className='mt-1 text-sm font-semibold text-blue-500'>
                GET MORE
              </div>
            </div>

            {/* Boosts Card */}
            <div className='relative rounded-lg bg-gray-900 p-4'>
              <div className='absolute right-2 top-2'>
                <button className='rounded-full border border-gray-700 bg-gray-800 p-1'>
                  <svg
                    viewBox='0 0 24 24'
                    className='h-5 w-5 fill-current text-gray-400'
                  >
                    <path d='M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z' />
                  </svg>
                </button>
              </div>
              <Zap className='mb-2 h-8 w-8 text-purple-400' />
              <div className='font-bold text-white'>My Boosts</div>
              <div className='mt-1 text-sm font-semibold text-purple-400'>
                GET MORE
              </div>
            </div>

            {/* Subscriptions Card */}
            <div className='relative rounded-lg bg-gray-900 p-4'>
              <div className='absolute right-2 top-2'>
                <button className='rounded-full border border-gray-700 bg-gray-800 p-1'>
                  <svg
                    viewBox='0 0 24 24'
                    className='h-5 w-5 fill-current text-gray-400'
                  >
                    <path d='M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z' />
                  </svg>
                </button>
              </div>
              <CreditCard className='mb-2 h-8 w-8 text-[#fe3c72]' />
              <div className='font-bold text-white'>Subscriptions</div>
            </div>
          </div>

          {/* Tinder Gold Card */}
          <div className='mb-6 w-full rounded-xl bg-[#f8e9c8] p-4 text-black'>
            <div className='mb-4 flex items-center justify-between'>
              <div className='flex items-center'>
                <svg
                  viewBox='0 0 24 24'
                  className='mr-1 h-6 w-6 fill-current text-[#ffd700]'
                >
                  <path d='M16.5 11.5c0 2.5-1.5 4.5-4.5 4.5-2 0-4.5-2-4.5-4.5C7.5 9 9.5 7 12 7s4.5 2 4.5 4.5zm-4.5 6c3.5 0 6.5-2 6.5-6.5S15.5 5 12 5 5.5 7 5.5 11.5 9 17.5 12 17.5z' />
                </svg>
                <span className='text-xl font-bold'>tinder</span>
                <span className='ml-2 rounded bg-[#ffd700] px-2 py-0.5 text-xs font-bold text-black'>
                  GOLD
                </span>
              </div>
              <Button className='rounded-full bg-[#ffd700] px-6 font-bold text-black hover:bg-[#e6c300]'>
                Upgrade
              </Button>
            </div>

            <h3 className='mb-3 text-lg font-bold'>What's included</h3>

            <div className='space-y-3'>
              <div className='flex items-center justify-between'>
                <span>See who Likes You</span>
                <div className='flex items-center gap-8'>
                  <span className='font-bold'>—</span>
                  <Check className='h-5 w-5 text-black' />
                </div>
              </div>

              <div className='flex items-center justify-between'>
                <span>Top Picks</span>
                <div className='flex items-center gap-8'>
                  <span className='font-bold'>—</span>
                  <Check className='h-5 w-5 text-black' />
                </div>
              </div>
            </div>

            <button className='mt-4 w-full text-center font-bold text-[#b38728]'>
              See all features
            </button>

            {/* Pagination Dots */}
            <div className='mt-4 flex justify-center space-x-1'>
              <div className='h-2 w-2 rounded-full bg-gray-400'></div>
              <div className='h-2 w-2 rounded-full bg-black'></div>
              <div className='h-2 w-2 rounded-full bg-gray-400'></div>
            </div>
          </div>
        </div>
      </main>

      {/* Bottom Navigation */}
      <nav className='fixed bottom-0 left-0 right-0 flex justify-around border-t border-gray-800 bg-black py-2'>
        <button className='flex flex-col items-center p-2'>
          <Home className='h-6 w-6 text-gray-400' />
        </button>
        <button className='flex flex-col items-center p-2'>
          <Search className='h-6 w-6 text-gray-400' />
        </button>
        <button className='relative flex flex-col items-center p-2'>
          <Diamond className='h-6 w-6 text-gray-400' />
          <span className='absolute -right-1 -top-1 rounded-full bg-yellow-500 px-1.5 text-xs font-bold text-black'>
            99+
          </span>
        </button>
        <button className='flex flex-col items-center p-2'>
          <MessageCircle className='h-6 w-6 text-gray-400' />
        </button>
        <button className='flex flex-col items-center p-2'>
          <User className='h-6 w-6 text-[#fe3c72]' />
        </button>
      </nav>

      {/* Edit Profile Modal */}
      <ProfileEditModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        profile={profile}
        onSave={(updatedProfile: any) => {
          // Memastikan bio tidak undefined sebelum menyimpan
          const profileWithBio = {
            ...updatedProfile,
            bio: updatedProfile.bio || '', // Memberikan string kosong jika bio undefined
          };
          handleSaveProfile(profileWithBio);
        }}
      />
    </div>
  );
}
