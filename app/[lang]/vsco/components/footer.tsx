'use client';

export default function Footer() {
  return (
    <footer className='border-t border-gray-800 bg-black py-12'>
      <div className='container mx-auto px-4'>
        <div className='mb-12 grid grid-cols-1 gap-8 md:grid-cols-4'>
          <div>
            <h3 className='mb-4 text-lg font-bold'>COMPANY</h3>
            <ul className='space-y-2 text-sm text-gray-400'>
              <li>
                <a href='#' className='hover:text-white'>
                  About
                </a>
              </li>
              <li>
                <a href='#' className='hover:text-white'>
                  Careers
                </a>
              </li>
              <li>
                <a href='#' className='hover:text-white'>
                  Press
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className='mb-4 text-lg font-bold'>FEATURES</h3>
            <ul className='space-y-2 text-sm text-gray-400'>
              <li>
                <a href='#' className='hover:text-white'>
                  Camera
                </a>
              </li>
              <li>
                <a href='#' className='hover:text-white'>
                  Presets
                </a>
              </li>
              <li>
                <a href='#' className='hover:text-white'>
                  Studio
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className='mb-4 text-lg font-bold'>COMMUNITY</h3>
            <ul className='space-y-2 text-sm text-gray-400'>
              <li>
                <a href='#' className='hover:text-white'>
                  Photographers
                </a>
              </li>
              <li>
                <a href='#' className='hover:text-white'>
                  Spaces
                </a>
              </li>
              <li>
                <a href='#' className='hover:text-white'>
                  Guidelines
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className='mb-4 text-lg font-bold'>DOWNLOAD VSCO</h3>
            <div className='flex space-x-2'>
              <button className='rounded bg-gray-800 px-3 py-2 text-xs'>
                App Store
              </button>
              <button className='rounded bg-gray-800 px-3 py-2 text-xs'>
                Google Play
              </button>
            </div>
          </div>
        </div>
        <div className='flex flex-col justify-between border-t border-gray-800 pt-6 md:flex-row'>
          <div className='mb-4 md:mb-0'>
            <span className='text-xl font-extrabold text-white'>VSCO</span>
            <p className='mt-1 text-sm text-gray-500'>
              © {new Date().getFullYear()} VSCO. All rights reserved.
            </p>
          </div>
          <div className='flex space-x-4'>
            <a href='#' className='text-sm text-gray-400 hover:text-white'>
              Terms
            </a>
            <a href='#' className='text-sm text-gray-400 hover:text-white'>
              Privacy
            </a>
            <a href='#' className='text-sm text-gray-400 hover:text-white'>
              Help
            </a>
            <a href='#' className='text-sm text-gray-400 hover:text-white'>
              Contact
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
