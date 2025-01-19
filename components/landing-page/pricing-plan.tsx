'use client';
import { Icon } from '@iconify/react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import CardImage from '@/public/images/landing-page/pricing-card-avatar.png';
import Image from 'next/image';
const PricingPlan = () => {
  return (
    <section className='py-16 2xl:py-[120px]' id='pricing'>
      <div className='container'>
        <div className='mx-auto max-w-[670px]'>
          <h2 className='mb-3 text-center text-xl font-semibold text-default-900 xl:text-3xl xl:leading-[46px]'>
            Pricing <span className='text-primary'>Plan</span>
          </h2>
          <p className='text-center text-base text-default-700 xl:leading-7'>
            DashTail stands as a prudent investment, safeguarding you against
            thousands in potential expenses. With every update, amplify its
            value even further.
          </p>
        </div>

        <div className='mt-14'>
          <div className='grid grid-cols-1 gap-y-8 lg:grid-cols-3 lg:gap-x-12'>
            {/* card one */}
            <div className='flex flex-col rounded-xl bg-default-100 px-7 py-10'>
              <div className='flex-none'>
                <div className='mb-3 flex'>
                  <h4 className='flex-1 text-xl font-semibold text-default-900 xl:text-2xl'>
                    Regular License
                  </h4>
                  <span className='flex-none text-xl font-semibold text-primary xl:text-2xl'>
                    $<span className='underline'>9</span>
                  </span>
                </div>
                <p className='text-sm text-default-600 xl:text-base'>
                  Suitable for you or one client, this license covers a single
                  end product that is accessible to end users{' '}
                  <span className='font-medium text-primary'>
                    without charge.
                  </span>
                </p>
              </div>
              <div className='flex-1'>
                <div className='mb-3 mt-5 text-base font-semibold text-default-900 xl:mb-5 xl:text-xl'>
                  What’s Included
                </div>
                <ul className='space-y-3'>
                  <li className='flex items-center gap-3'>
                    <Icon
                      icon='heroicons:check-16-solid'
                      className='h-4 w-4 text-success'
                    />
                    <span className='text-sm text-default-900 xl:text-base'>
                      Quality assurance by Envato
                    </span>
                  </li>
                  <li className='flex items-center gap-3'>
                    <Icon
                      icon='heroicons:check-16-solid'
                      className='h-4 w-4 text-success'
                    />
                    <span className='text-sm text-default-900 xl:text-base'>
                      Free lifetime updates.
                    </span>
                  </li>
                  <li className='flex items-center gap-3'>
                    <Icon
                      icon='heroicons:check-16-solid'
                      className='h-4 w-4 text-success'
                    />
                    <span className='text-sm text-default-900 xl:text-base'>
                      Support for six months.
                    </span>
                  </li>
                  <li className='flex items-center gap-3'>
                    <Icon
                      icon='heroicons:x-mark-16-solid'
                      className='h-4 w-4 text-destructive'
                    />
                    <span className='text-sm text-default-900 xl:text-base'>
                      Customization guidance and consultancy.
                    </span>
                  </li>
                  <li className='flex items-center gap-3'>
                    <Icon
                      icon='heroicons:x-mark-16-solid'
                      className='h-4 w-4 text-destructive'
                    />
                    <span className='text-sm text-default-900 xl:text-base'>
                      Remote Support, Skype support.
                    </span>
                  </li>
                  <li className='flex items-center gap-3'>
                    <Icon
                      icon='heroicons:x-mark-16-solid'
                      className='h-4 w-4 text-destructive'
                    />
                    <span className='text-sm text-default-900 xl:text-base'>
                      Anydesk/Teamviewer support.
                    </span>
                  </li>
                  <li className='flex items-center gap-3'>
                    <Icon
                      icon='heroicons:x-mark-16-solid'
                      className='h-4 w-4 text-destructive'
                    />
                    <span className='text-sm text-default-900 xl:text-base'>
                      Free installation.
                    </span>
                  </li>
                </ul>
              </div>
              <ul className='space-y-3'>
                <li className='flex items-center gap-3'>
                  <Icon
                    icon='heroicons:check-16-solid'
                    className='h-4 w-4 text-success'
                  />
                  <span className='text-sm text-default-900 xl:text-base'>
                    Quality assurance by Envato
                  </span>
                </li>
                <li className='flex items-center gap-3'>
                  <Icon
                    icon='heroicons:check-16-solid'
                    className='h-4 w-4 text-success'
                  />
                  <span className='text-sm text-default-900 xl:text-base'>
                    Free lifetime updates.
                  </span>
                </li>
                <li className='flex items-center gap-3'>
                  <Icon
                    icon='heroicons:check-16-solid'
                    className='h-4 w-4 text-success'
                  />
                  <span className='text-sm text-default-900 xl:text-base'>
                    Support for six months.
                  </span>
                </li>
                <li className='flex items-center gap-3'>
                  <Icon
                    icon='heroicons:x-mark-16-solid'
                    className='h-4 w-4 text-destructive'
                  />
                  <span className='text-sm text-default-900 xl:text-base'>
                    Customization guidance and consultancy.
                  </span>
                </li>
                <li className='flex items-center gap-3'>
                  <Icon
                    icon='heroicons:x-mark-16-solid'
                    className='h-4 w-4 text-destructive'
                  />
                  <span className='text-sm text-default-900 xl:text-base'>
                    Remote Support, Skype support.
                  </span>
                </li>
                <li className='flex items-center gap-3'>
                  <Icon
                    icon='heroicons:x-mark-16-solid'
                    className='h-4 w-4 text-destructive'
                  />
                  <span className='text-sm text-default-900 xl:text-base'>
                    Anydesk/Teamviewer support.
                  </span>
                </li>
                <li className='flex items-center gap-3'>
                  <Icon
                    icon='heroicons:x-mark-16-solid'
                    className='h-4 w-4 text-destructive'
                  />
                  <span className='text-sm text-default-900 xl:text-base'>
                    Free installation.
                  </span>
                </li>
              </ul>
              <Button asChild>
                <Link
                  href='https://1.envato.market/dashtail-regular'
                  target='__blank'
                  className='mt-8 w-full xl:mt-12'
                >
                  Buy Now
                </Link>
              </Button>
            </div>

            {/* card two */}

            <div className='relative flex flex-col rounded-xl border border-primary bg-default-100 px-6 py-8'>
              <span className='absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 rounded bg-primary px-3 py-1 text-base font-medium text-primary-foreground'>
                Featured
              </span>
              <div className='flex-none'>
                <div className='mb-3 flex'>
                  <h4 className='flex-1 text-xl font-semibold text-default-900 xl:text-2xl'>
                    Extend License
                  </h4>
                  <span className='flex-none text-xl font-semibold text-primary xl:text-2xl'>
                    $<span className='underline'>300</span>
                  </span>
                </div>
                <p className='text-sm text-default-600 xl:text-base'>
                  Suitable for you or one client, this license covers a single
                  end product that is accessible to end users{' '}
                  <span className='font-medium text-primary'>
                    without charge.
                  </span>
                </p>
              </div>
              <div className='flex-1'>
                <div className='mb-3 mt-5 text-base font-semibold text-default-900 xl:mb-5'>
                  What’s Included
                </div>
                <ul className='space-y-3'>
                  <li className='flex items-center gap-3'>
                    <Icon
                      icon='heroicons:check-16-solid'
                      className='h-4 w-4 text-success'
                    />
                    <span className='text-sm text-default-900 xl:text-base'>
                      Quality assurance by Envato
                    </span>
                  </li>
                  <li className='flex items-center gap-3'>
                    <Icon
                      icon='heroicons:check-16-solid'
                      className='h-4 w-4 text-success'
                    />
                    <span className='text-sm text-default-900 xl:text-base'>
                      Free lifetime updates.
                    </span>
                  </li>
                  <li className='flex items-center gap-3'>
                    <Icon
                      icon='heroicons:check-16-solid'
                      className='h-4 w-4 text-success'
                    />
                    <span className='text-sm text-default-900 xl:text-base'>
                      Support for six months.
                    </span>
                  </li>
                  <li className='flex items-center gap-3'>
                    <Icon
                      icon='heroicons:check-16-solid'
                      className='h-4 w-4 text-success'
                    />
                    <span className='text-sm text-default-900 xl:text-base'>
                      Customization guidance and consultancy.
                    </span>
                  </li>
                  <li className='flex items-center gap-3'>
                    <Icon
                      icon='heroicons:check-16-solid'
                      className='h-4 w-4 text-success'
                    />
                    <span className='text-sm text-default-900 xl:text-base'>
                      Remote Support, Skype support.
                    </span>
                  </li>
                  <li className='flex items-center gap-3'>
                    <Icon
                      icon='heroicons:check-16-solid'
                      className='h-4 w-4 text-success'
                    />
                    <span className='text-sm text-default-900 xl:text-base'>
                      Anydesk/Teamviewer support.
                    </span>
                  </li>
                  <li className='flex items-center gap-3'>
                    <Icon
                      icon='heroicons:check-16-solid'
                      className='h-4 w-4 text-success'
                    />
                    <span className='text-sm text-default-900 xl:text-base'>
                      Free installation.
                    </span>
                  </li>
                </ul>
              </div>
              <ul className='space-y-3'>
                <li className='flex items-center gap-3'>
                  <Icon
                    icon='heroicons:check-16-solid'
                    className='h-4 w-4 text-success'
                  />
                  <span className='text-sm text-default-900 xl:text-base'>
                    Quality assurance by Envato
                  </span>
                </li>
                <li className='flex items-center gap-3'>
                  <Icon
                    icon='heroicons:check-16-solid'
                    className='h-4 w-4 text-success'
                  />
                  <span className='text-sm text-default-900 xl:text-base'>
                    Free lifetime updates.
                  </span>
                </li>
                <li className='flex items-center gap-3'>
                  <Icon
                    icon='heroicons:check-16-solid'
                    className='h-4 w-4 text-success'
                  />
                  <span className='text-sm text-default-900 xl:text-base'>
                    Support for six months.
                  </span>
                </li>
                <li className='flex items-center gap-3'>
                  <Icon
                    icon='heroicons:check-16-solid'
                    className='h-4 w-4 text-success'
                  />
                  <span className='text-sm text-default-900 xl:text-base'>
                    Customization guidance and consultancy.
                  </span>
                </li>
                <li className='flex items-center gap-3'>
                  <Icon
                    icon='heroicons:check-16-solid'
                    className='h-4 w-4 text-success'
                  />
                  <span className='text-sm text-default-900 xl:text-base'>
                    Remote Support, Skype support.
                  </span>
                </li>
                <li className='flex items-center gap-3'>
                  <Icon
                    icon='heroicons:check-16-solid'
                    className='h-4 w-4 text-success'
                  />
                  <span className='text-sm text-default-900 xl:text-base'>
                    Anydesk/Teamviewer support.
                  </span>
                </li>
                <li className='flex items-center gap-3'>
                  <Icon
                    icon='heroicons:check-16-solid'
                    className='h-4 w-4 text-success'
                  />
                  <span className='text-sm text-default-900 xl:text-base'>
                    Free installation.
                  </span>
                </li>
              </ul>
              <Button asChild>
                <Link
                  href='https://1.envato.market/dashtail-extended'
                  target='__blank'
                  className='mt-8 w-full xl:mt-12'
                >
                  Buy Now
                </Link>
              </Button>
            </div>

            {/* card three */}

            <div className='flex flex-col rounded-xl bg-default-100 px-6 py-8'>
              <div className='flex-none'>
                <h4 className='mb-3 text-xl font-semibold text-primary xl:text-2xl'>
                  Custom License
                </h4>
                <p className='text-sm text-default-600 xl:text-base'>
                  Should your business necessitate a unique licensing
                  arrangement, please
                  <Link
                    href='https://codeshaper.net/'
                    className='mx-1 text-primary hover:underline'
                  >
                    Get In Touch
                  </Link>
                  to explore customized solutions.
                </p>
              </div>
              <div className='mt-8 flex flex-1 flex-col justify-center lg:mt-0'>
                <Image src={CardImage} alt='pricing card image' />
              </div>
              <Button asChild>
                <Link
                  href='https://codeshaper.net/contact-us'
                  target='__blank'
                  className='mt-8 w-full xl:mt-12'
                >
                  Contact us
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingPlan;
