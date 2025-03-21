import SectionHeader from '@/app/[lang]/vsco/components/section-header';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

export default function CommunityProfileSection() {
  return (
    <section className='bg-black px-4 py-10 text-white sm:px-6 sm:py-12 md:px-10 md:py-16 lg:px-16'>
      <div className='mx-auto max-w-5xl'>
        <div className='grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8'>
          <div className='order-2 md:order-1'>
            <div className='xs:h-[200px] relative h-[180px] w-full sm:h-[300px] md:h-[350px] lg:h-[400px]'>
              <Image
                src='https://cdn.prod.website-files.com/64e27cdd42db7ecf119d5e61/66b51ee32c3c423ef92c7f5c_community-profile.jpg'
                alt='Community Profile'
                fill
                className='rounded-md object-cover'
                sizes='(max-width: 480px) 100vw, (max-width: 640px) 100vw, (max-width: 768px) 600px, 500px'
              />
            </div>
          </div>
          <div className='order-1 md:order-2'>
            <SectionHeader title='COMMUNITY' subtitle='PROFILE' />
            <p className='mb-3 text-xs text-white sm:mb-4 sm:text-sm'>
              Join a global community of photographers and creators. Share your
              work, discover new perspectives, and connect with like-minded
              artists.
            </p>
            <p className='mb-3 text-xs text-white sm:mb-4 sm:text-sm'>
              Create a personalized profile to showcase your best work. Follow
              other creators for inspiration and feedback.
            </p>
            <p className='mb-4 text-xs text-white sm:mb-6 sm:text-sm'>
              Participate in challenges and themed collections to gain
              visibility and grow your audience.
            </p>
            <Button
              variant='outline'
              size='sm'
              className='h-9 rounded-full border-white bg-white px-3 text-xs text-[#111] sm:h-10 sm:px-4 sm:text-sm'
            >
              EXPLORE THE COMMUNITY
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
