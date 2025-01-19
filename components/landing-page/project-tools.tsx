'use client';
import appexChart from '@/public/images/landing-page/appex-chartpng.png';
import axios from '@/public/images/landing-page/axios.png';
import chart from '@/public/images/landing-page/chart.png';
import emblaCarousel from '@/public/images/landing-page/embla-carousel.png';
import framerMotion from '@/public/images/landing-page/framer-motion.png';
import googleMap from '@/public/images/landing-page/google-map-react.png';
import nextAuth from '@/public/images/landing-page/next-auth.png';
import nextTheme from '@/public/images/landing-page/next-theme.png';
import next from '@/public/images/landing-page/next.png';
import plus from '@/public/images/landing-page/plus.png';
import radix from '@/public/images/landing-page/radix.png';
import reactHookForm from '@/public/images/landing-page/react-hook-form.png';
import reactLeaflet from '@/public/images/landing-page/react-leaflet.png';
import react from '@/public/images/landing-page/react.png';
import recharts from '@/public/images/landing-page/recharts.png';
import shadeCn from '@/public/images/landing-page/shade-cn.png';
import swiper from '@/public/images/landing-page/swiper.png';
import tailwind from '@/public/images/landing-page/tailwind.png';
import unovis from '@/public/images/landing-page/unovis.png';
import vectorMap from '@/public/images/landing-page/vector-map.png';
import vite from '@/public/images/landing-page/vite.png';
import zod from '@/public/images/landing-page/zod.png';
import zustand from '@/public/images/landing-page/zustand.png';
import Image from 'next/image';
import Link from 'next/link';

const ProjectTools = () => {
  const data = [
    {
      logo: react,
      title: 'React 18',
      href: 'https://react.dev/',
    },
    {
      logo: tailwind,
      title: 'Tailwind CSS',
      href: 'https://tailwindcss.com/',
    },
    {
      logo: radix,
      title: 'Radix',
      href: 'https://www.radix-ui.com/',
    },
    {
      logo: shadeCn,
      title: 'Shade Cn',
      href: 'https://ui.shadcn.com/',
    },
    {
      logo: vite,
      title: 'Vite',
      href: 'https://vitejs.dev/',
    },
    {
      logo: next,
      title: 'Next 14',
      href: 'https://nextjs.org/',
    },
    {
      logo: nextTheme,
      title: 'Next Theme',
      href: 'https://www.npmjs.com/package/next-themes',
    },
    {
      logo: nextAuth,
      title: 'Next Auth',
      href: 'https://next-auth.js.org/',
    },
    {
      logo: axios,
      title: 'axios',
      href: 'https://axios-http.com/',
    },
    {
      logo: zustand,
      title: 'Zustand',
      href: 'https://zustand-demo.pmnd.rs/',
    },
    {
      logo: reactHookForm,
      title: 'React Hook Form',
      href: 'https://react-hook-form.com/',
    },
    {
      logo: zod,
      title: 'zod',
      href: 'https://zod.dev/',
    },
    {
      logo: framerMotion,
      title: 'framer motion',
      href: 'https://www.framer.com/motion/',
    },
    {
      logo: swiper,
      title: 'Swiper',
      href: 'https://swiperjs.com/',
    },
    {
      logo: emblaCarousel,
      title: 'Embla Carousel',
      href: 'https://www.embla-carousel.com/',
    },
    {
      logo: googleMap,
      title: 'Google Map',
      href: 'https://www.npmjs.com/package/google-map-react',
    },
    {
      logo: vectorMap,
      title: 'Vector Map',
      href: 'https://react-vector-maps.netlify.app/',
    },
    {
      logo: unovis,
      title: 'Unovis Map',
      href: 'https://unovis.dev/',
    },
    {
      logo: reactLeaflet,
      title: 'React Leaflet',
      href: 'https://react-leaflet.js.org/',
    },
    {
      logo: recharts,
      title: 'Recharts',
      href: 'https://recharts.org/en-US/',
    },
    {
      logo: appexChart,
      title: 'Appex Chart',
      href: '',
    },
    {
      logo: appexChart,
      title: 'Appex Chart',
      href: 'https://apexcharts.com/',
    },
    {
      logo: chart,
      title: 'Chart Js',
      href: 'https://www.chartjs.org/',
    },
  ];
  return (
    <section className='bg-default-100 py-16 2xl:py-[120px]' id='tools'>
      <div className='container'>
        <div className='mx-auto max-w-[670px]'>
          <h2 className='mb-3 text-center text-xl font-semibold leading-[46px] text-default-900 xl:text-3xl'>
            Tools & <span className='text-primary'>Technologies</span>
          </h2>
          <p className='text-center text-base text-default-700 xl:leading-7'>
            Using top UI frameworks and the latest technologies, build your
            dream app with our platform, supported by regular updates. Explore
            the tech we employ.
          </p>
        </div>
        <div className='mt-14'>
          <div className='grid grid-cols-2 gap-y-12 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-8'>
            {data.map((item, index) => (
              <Link
                href={item.href}
                key={`project-tools-${index}`}
                className='group transition-transform duration-300 hover:-translate-y-1'
                target='_blank'
              >
                <div className='flex flex-col items-center'>
                  <div className='h-16 w-20'>
                    <Image
                      src={item.logo}
                      alt='project logo'
                      className='h-full w-full object-contain'
                    />
                  </div>
                  <h3 className='mt-4 text-center text-sm font-semibold text-default-700 group-hover:text-primary xl:text-base'>
                    {item.title}
                  </h3>
                </div>
              </Link>
            ))}
            <div className='group transition-transform duration-300 hover:-translate-y-1'>
              <div className='flex flex-col items-center'>
                <div className='h-16 w-20'>
                  <Image
                    src={plus}
                    alt='project logo'
                    className='h-full w-full object-contain'
                  />
                </div>
                <h3 className='mt-4 text-center text-sm font-semibold text-default-700 group-hover:text-primary xl:text-base'>
                  more
                </h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectTools;
