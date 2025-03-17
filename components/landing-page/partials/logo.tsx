import { Crown } from 'lucide-react';
import Link from 'next/link';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export function Logo({ className, size = 'md' }: LogoProps) {
  const sizes = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl',
  };

  const iconSizes = {
    sm: 'h-4 w-4',
    md: 'h-5 w-5',
    lg: 'h-6 w-6',
  };

  const containerSizes = {
    sm: 'size-7',
    md: 'size-8',
    lg: 'size-10',
  };

  return (
    <Link
      href='/'
      className={`flex items-center gap-2 font-bold ${sizes[size]} ${className}`}
    >
      <div
        className={`${containerSizes[size]} shadow-glow relative flex items-center justify-center overflow-hidden rounded-lg bg-gradient-primary`}
      >
        <div className='absolute inset-0 bg-black/10'></div>
        <div className='absolute inset-0 bg-gradient-radial from-white/20 to-transparent opacity-50'></div>
        <Crown className={`${iconSizes[size]} relative z-10 text-white`} />
      </div>
      <span className='flex items-center'>
        <span className='text-foreground'>Bio</span>
        <span className='gradient-text text-glow'>King</span>
      </span>
    </Link>
  );
}
