// Client komponen dimulai di bawah ini
// -----------------------------------------------------
'use client';

import Footer from '@/app/[lang]/vsco/components/footer';
import Navbar from '@/app/[lang]/vsco/components/navbar';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

// Buat context untuk shortcode
interface ShortcodeContextType {
  shortcode: string | null;
}

const ShortcodeContext = createContext<ShortcodeContextType>({
  shortcode: null,
});

// Hook untuk mengakses shortcode
export const useShortcode = () => useContext(ShortcodeContext);

// ClientLayout untuk menangkap parameter dari URL
export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const searchParams = useSearchParams();
  const [shortcode, setShortcode] = useState<string | null>(null);

  useEffect(() => {
    // Tangkap shortcode dari URL
    const code = searchParams.get('shortcode');
    setShortcode(code);
  }, [searchParams]);

  return (
    <ShortcodeContext.Provider value={{ shortcode }}>
      <div className={`min-h-screen overflow-x-hidden`}>
        <div className='flex min-h-screen flex-col'>
          <Navbar />
          <div className='flex flex-1 flex-col md:flex-row'>
            <main className='w-full flex-1 bg-[#111]'>{children}</main>
          </div>
          <Footer />
        </div>
      </div>
    </ShortcodeContext.Provider>
  );
}
