'use client';
import Image from 'next/image';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import acculance from '@/public/images/landing-page/acculance.png';
import acculanceSass from '@/public/images/landing-page/acculance-sass.png';
import productify from '@/public/images/landing-page/productify.png';
import konst from '@/public/images/landing-page/konst.jpg';
import ferarri from '@/public/images/landing-page/ferrari.jpg';
import onlineAdvisor from '@/public/images/landing-page/online-advisor.png';
import minor from '@/public/images/landing-page/minor.jpg';
import dashcode from '@/public/images/landing-page/dashcode.png';
import { Button } from '@/components/ui/button';

const CustomProject = () => {
  const data = [
    {
      name: 'acculance',
      image: acculance,
      href: 'https://codecanyon.net/item/acculance-ultimate-sales-inventory-accounting-management-system/37545480',
    },
    {
      name: 'dashcode',
      image: dashcode,
      href: 'https://themeforest.net/item/dashcode-admin-dashboard-template/42600453',
    },
    {
      name: 'productify',
      image: productify,
      href: 'https://codecanyon.net/item/productifyproduction-management-system/26526177',
    },
    {
      name: 'konst',
      image: konst,
      href: 'https://themeforest.net/item/konst-construction-xd-template/38139207',
    },
    {
      name: 'ferarri',
      image: ferarri,
      href: 'https://themeforest.net/item/ferrari-business-template/20429736',
    },
    {
      name: 'Acculance Sass',
      image: acculanceSass,
      href: 'https://codecanyon.net/item/acculance-saas-multitenancy-based-pos-accounting-management-system/40577294',
    },
    {
      name: 'online Advisor',
      image: onlineAdvisor,
      href: 'https://codecanyon.net/item/uradvisor-online-advisor-and-questionnaire-tool/26308690',
    },
    {
      name: 'minor',
      image: minor,
      href: 'https://themeforest.net/item/minordigital-agency-template/36743946',
    },
  ];
  return (
    <section
      className='to-pink-[#EFE8F0] overflow-hidden bg-gradient-to-r from-[#E8EAF3] via-[#E1EDF4] py-16 dark:bg-card dark:from-transparent dark:via-transparent dark:to-transparent 2xl:py-[120px]'
      id='custom'
    >
      <div className='mx-auto max-w-[670px]'>
        <h2 className='mb-3 text-center text-xl font-semibold text-default-900 xl:text-3xl xl:leading-[46px]'>
          Work with <span className='text-primary'>Us</span>
        </h2>
        <p className='text-center text-sm leading-7 text-default-700 xl:text-base'>
          Since 2017, we've been helping developers, entrepreneurs, startups,
          and government agencies. Count on CodeShaper to provide a tailored
          transformation that fits your business goals perfectly.
        </p>

        <div className='mb-10 mt-7 flex justify-center gap-8 xl:mb-[72px] xl:mt-9'>
          <Button variant='outline' asChild>
            <Link
              href='https://themeforest.net/user/codeshaperbd'
              target='_blank'
            >
              {' '}
              Take a Tour
            </Link>
          </Button>
          <Button asChild>
            <Link href='https://codeshaper.net/contact-us'>Contact Us</Link>
          </Button>
        </div>
      </div>
      <div className='space-y-9'>
        <Swiper
          spaceBetween={8}
          slidesPerView={2}
          centeredSlides={true}
          speed={6000}
          autoplay={{
            disableOnInteraction: true,
            pauseOnMouseEnter: true,
            delay: 0,
          }}
          loop={true}
          modules={[Autoplay]}
          grabCursor={true}
          breakpoints={{
            768: {
              slidesPerView: 3,
              spaceBetween: 12,
            },
            1080: {
              slidesPerView: 3,
              spaceBetween: 16,
            },
            1400: {
              slidesPerView: 4,
              spaceBetween: 36,
            },
          }}
        >
          {data.map((item, index) => (
            <SwiperSlide key={`products-${index}`}>
              <div className='group relative w-full before:absolute before:left-0 before:top-0 before:h-full before:w-full hover:before:bg-default-900/60 dark:hover:before:bg-default-50/60'>
                <Image
                  src={item.image}
                  alt={item.name}
                  className='h-full w-full rounded-md object-cover'
                />
                <Button
                  asChild
                  className='invisible absolute bottom-5 right-6 bg-background opacity-0 group-hover:visible group-hover:opacity-100 dark:border-primary dark:bg-primary dark:text-primary-foreground'
                  variant='outline'
                >
                  <Link target='_blank' href={item.href}>
                    {' '}
                    View Product{' '}
                  </Link>
                </Button>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <Swiper
          spaceBetween={8}
          slidesPerView={2}
          centeredSlides={true}
          speed={6000}
          autoplay={{
            disableOnInteraction: true,
            pauseOnMouseEnter: true,
            delay: 0,
            reverseDirection: true,
          }}
          loop={true}
          modules={[Autoplay]}
          grabCursor={true}
          breakpoints={{
            768: {
              slidesPerView: 3,
              spaceBetween: 12,
            },
            1080: {
              slidesPerView: 3,
              spaceBetween: 16,
            },
            1400: {
              slidesPerView: 4,
              spaceBetween: 36,
            },
          }}
        >
          {data.map((item, index) => (
            <SwiperSlide key={`products-reverse-${index}`}>
              <div className='group relative w-full before:absolute before:left-0 before:top-0 before:h-full before:w-full hover:before:bg-default-900/60 dark:hover:before:bg-default-50/60'>
                <Image
                  src={item.image}
                  alt={item.name}
                  className='h-full w-full rounded-md object-cover'
                />
                <Button
                  asChild
                  className='invisible absolute bottom-5 right-6 bg-background opacity-0 group-hover:visible group-hover:opacity-100 dark:border-primary dark:bg-primary dark:text-primary-foreground'
                  variant='outline'
                >
                  <Link target='_blank' href={item.href}>
                    {' '}
                    View Product{' '}
                  </Link>
                </Button>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default CustomProject;
