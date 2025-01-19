'use client';
import { Button } from '@/components/ui/button';
import { menusConfig } from '@/config/menus';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
const AllComponents = () => {
  const menus = menusConfig.sidebarNav.modern[2]?.child?.[0]?.nested ?? [];
  const menus2 = menusConfig.sidebarNav.modern[2]?.child?.[1]?.nested ?? [];
  const data = [...menus, ...menus2];
  return (
    <section className='relative py-16 2xl:py-20' id='features'>
      <div className='mx-auto max-w-[670px]'>
        <h2 className='mb-1 text-center text-xl font-semibold leading-[46px] text-default-900 md:text-2xl lg:mb-3 lg:text-3xl'>
          Component <span className='text-primary'>Collection</span>
        </h2>
        <p className='text-center text-base text-default-700 xl:leading-7'>
          DashTail Admin Template offers a variety of carefully designed
          components, perfect for creating advanced reusable components,
          pages,dashboard etc.
        </p>
      </div>
      <div className='mt-14 space-y-6'>
        <Swiper
          spaceBetween={8}
          slidesPerView='auto'
          centeredSlides={true}
          speed={2000}
          loop={true}
          modules={[Autoplay]}
          grabCursor={true}
          autoplay={{
            disableOnInteraction: true,
            pauseOnMouseEnter: true,
            delay: 0,
          }}
        >
          {data.map((item, index) => (
            <SwiperSlide
              key={`menu-${index}`}
              className='flex w-28 justify-center'
            >
              <Button
                variant='outline'
                className='rounded-full border-default-500 capitalize text-default-600'
              >
                <Link href={item.href as string}>{item.title}</Link>
              </Button>
            </SwiperSlide>
          ))}
        </Swiper>

        <Swiper
          spaceBetween={8}
          slidesPerView='auto'
          centeredSlides={true}
          speed={2000}
          loop={true}
          modules={[Autoplay]}
          grabCursor={true}
          autoplay={{
            disableOnInteraction: true,
            pauseOnMouseEnter: true,
            delay: 0,
            reverseDirection: true,
          }}
        >
          {data.map((item, index) => (
            <SwiperSlide
              key={`menu-${index}`}
              className='flex w-28 justify-center'
            >
              <Button
                variant='outline'
                className='rounded-full border-default-500 capitalize text-default-600'
              >
                <Link href={item.href as string}>{item.title}</Link>
              </Button>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default AllComponents;
