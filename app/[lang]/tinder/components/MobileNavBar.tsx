import Link from 'next/link';
import { Home, Search, Diamond, MessageCircle, User } from 'lucide-react';

export default function MobileNavBar() {
  return (
    <div className='fixed bottom-0 left-0 right-0 z-50 border-t border-gray-800 bg-black'>
      <div className='flex h-16 items-center justify-around'>
        <Link href='/' className='flex flex-col items-center p-2'>
          <Home className='h-6 w-6 text-gray-400' />
        </Link>
        <Link href='#' className='flex flex-col items-center p-2'>
          <Search className='h-6 w-6 text-gray-400' />
        </Link>
        <Link href='#' className='flex flex-col items-center p-2'>
          <Diamond className='h-6 w-6 text-gray-400' />
        </Link>
        <Link href='#' className='flex flex-col items-center p-2'>
          <MessageCircle className='h-6 w-6 text-gray-400' />
        </Link>
        <Link href='/profile' className='flex flex-col items-center p-2'>
          <User className='h-6 w-6 text-gray-400' />
        </Link>
      </div>
    </div>
  );
}
