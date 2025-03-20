import type { ReactNode } from 'react';

interface GradientTextProps {
  children: ReactNode;
  className?: string;
  variant?:
    | 'primary'
    | 'secondary'
    | 'purple'
    | 'blue'
    | 'green'
    | 'pink'
    | 'rainbow';
  animate?: boolean;
}

export function GradientText({
  children,
  className = '',
  variant = 'primary',
  animate = false,
}: GradientTextProps) {
  // Define gradient styles based on variant
  const gradientStyles = {
    primary: 'from-purple-600 via-purple-500 to-fuchsia-600',
    secondary: 'from-sky-500 via-cyan-500 to-teal-500',
    purple: 'from-purple-600 via-purple-500 to-indigo-600',
    blue: 'from-blue-600 via-sky-500 to-indigo-500',
    green: 'from-emerald-600 via-emerald-500 to-teal-500',
    pink: 'from-pink-600 via-fuchsia-500 to-pink-400',
    rainbow:
      'from-red-500 via-yellow-500 via-green-500 via-blue-500 to-purple-500',
  };

  return (
    <span
      className={`inline-block bg-gradient-to-r bg-clip-text text-transparent ${gradientStyles[variant]} ${animate ? 'animate-gradient-x bg-[length:200%_auto]' : ''} ${className} `}
    >
      {children}
    </span>
  );
}
