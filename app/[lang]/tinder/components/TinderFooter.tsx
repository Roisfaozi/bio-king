import Link from 'next/link';
import Image from 'next/image';
import {
  Facebook,
  Instagram,
  Twitter,
  TwitterIcon as TikTok,
  Youtube,
} from 'lucide-react';

export default function TinderFooter() {
  return (
    <footer className='relative z-20 bg-gray-900 py-12 text-gray-300'>
      <div className='mx-auto max-w-6xl px-4'>
        <div className='grid grid-cols-2 gap-8 md:grid-cols-4'>
          <div>
            <h4 className='mb-4 font-semibold text-white'>Legal</h4>
            <ul className='space-y-2 text-sm'>
              <li>
                <Link href='#' className='transition hover:text-white'>
                  Privacy
                </Link>
              </li>
              <li>
                <Link href='#' className='transition hover:text-white'>
                  Consumer Health Data Privacy Policy
                </Link>
              </li>
              <li>
                <Link href='#' className='transition hover:text-white'>
                  Terms
                </Link>
              </li>
              <li>
                <Link href='#' className='transition hover:text-white'>
                  Cookie Policy
                </Link>
              </li>
              <li>
                <Link href='#' className='transition hover:text-white'>
                  Intellectual Property
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className='mb-4 font-semibold text-white'>Careers</h4>
            <ul className='space-y-2 text-sm'>
              <li>
                <Link href='#' className='transition hover:text-white'>
                  Careers portal
                </Link>
              </li>
              <li>
                <Link href='#' className='transition hover:text-white'>
                  Tech Blog
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className='mb-4 font-semibold text-white'>Social</h4>
            <div className='flex space-x-4 text-white'>
              <Link href='#' className='transition hover:text-pink-500'>
                <Instagram size={20} />
              </Link>
              <Link href='#' className='transition hover:text-pink-500'>
                <TikTok size={20} />
              </Link>
              <Link href='#' className='transition hover:text-pink-500'>
                <Youtube size={20} />
              </Link>
              <Link href='#' className='transition hover:text-pink-500'>
                <Twitter size={20} />
              </Link>
              <Link href='#' className='transition hover:text-pink-500'>
                <Facebook size={20} />
              </Link>
            </div>
          </div>
          <div>
            <h4 className='mb-4 font-semibold text-white'>FAQ</h4>
            <ul className='space-y-2 text-sm'>
              <li>
                <Link href='#' className='transition hover:text-white'>
                  Destinations
                </Link>
              </li>
              <li>
                <Link href='#' className='transition hover:text-white'>
                  Press room
                </Link>
              </li>
              <li>
                <Link href='#' className='transition hover:text-white'>
                  Contact
                </Link>
              </li>
              <li>
                <Link href='#' className='transition hover:text-white'>
                  Promo code
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className='mt-12'>
          <h4 className='mb-4 font-semibold text-white'>Get the app!</h4>
          <div className='flex space-x-4'>
            <Link href='#' className='block'>
              <Image
                src='/placeholder.svg?height=40&width=120'
                alt='Download on the App Store'
                width={120}
                height={40}
                className='rounded-md'
              />
            </Link>
            <Link href='#' className='block'>
              <Image
                src='/placeholder.svg?height=40&width=120'
                alt='Get it on Google Play'
                width={120}
                height={40}
                className='rounded-md'
              />
            </Link>
          </div>
        </div>

        <div className='mt-12 text-xs'>
          <p className='mb-4'>
            All you singles, listen up: if you're looking to fall in love, want
            to start dating, ready to start a relationship, or want to keep it
            casual, you need to be on Tinder. With over 55 billion matches made,
            it's the best free dating site to find your next best match. You've
            probably noticed: the dating landscape looks very different today,
            with most of us choosing to meet people online. With Tinder, the
            world's most popular free dating app, you have millions of other
            singles at your fingertips, and they're all ready to meet someone
            like you. Whether you're straight or part of the LGBTQIA community,
            Tinder's here to get the sparks flying.
          </p>
          <p>
            There really is something for everyone on Tinder. Looking for a
            relationship? You've got it. Want to make friends online? Say no
            more. Just started uni and want to make the most of your experience?
            Tinder U's got you covered. Tinder isn't your average dating site;
            it's the most diverse dating app, where adults of all backgrounds
            and experiences are invited to make connections, memories and
            everything in between.
          </p>
        </div>

        <div className='mt-8 flex flex-wrap items-center justify-between border-t border-gray-800 pt-8 text-xs'>
          <div className='mb-4 flex space-x-4 md:mb-0'>
            <Link href='#' className='transition hover:text-white'>
              FAQ
            </Link>
            <span>/</span>
            <Link href='#' className='transition hover:text-white'>
              Safety tips
            </Link>
            <span>/</span>
            <Link href='#' className='transition hover:text-white'>
              Terms
            </Link>
            <span>/</span>
            <Link href='#' className='transition hover:text-white'>
              Cookie Policy
            </Link>
            <span>/</span>
            <Link href='#' className='transition hover:text-white'>
              Privacy settings
            </Link>
          </div>
          <div>© 2025 Tinder LLC, All Rights Reserved.</div>
        </div>
      </div>
    </footer>
  );
}
