'use client';
import { SonnToaster } from '@/components/ui/sonner';
import { Toaster as ReactToaster } from '@/components/ui/toaster';
import { cn } from '@/lib/utils';
import { useThemeStore } from '@/store';
import { ThemeProvider } from 'next-themes';
import { Inter } from 'next/font/google';
import { usePathname } from 'next/navigation';
import { Toaster } from 'react-hot-toast';

const inter = Inter({ subsets: ['latin'] });
const Providers = ({ children }: { children: React.ReactNode }) => {
  const { theme, radius } = useThemeStore();
  const location = usePathname();

  if (location === '/') {
    return (
      <body
        className={cn('dash-tail-app', inter.className)}
        suppressHydrationWarning={true}
      >
        <ThemeProvider
          attribute='class'
          enableSystem={false}
          defaultTheme='light'
        >
          <div className={cn('h-full')}>
            {children}
            <ReactToaster />
          </div>
          <Toaster />
          <SonnToaster />
        </ThemeProvider>
      </body>
    );
  }
  return (
    <body
      className={cn('dash-tail-app', inter.className, 'theme-' + theme)}
      style={
        {
          '--radius': `${radius}rem`,
        } as React.CSSProperties
      }
    >
      <ThemeProvider
        attribute='class'
        enableSystem={false}
        defaultTheme='light'
      >
        <div className={cn('h-full')}>
          {children}
          <ReactToaster />
        </div>
        <Toaster />
        <SonnToaster />
      </ThemeProvider>
    </body>
  );
};

export default Providers;
