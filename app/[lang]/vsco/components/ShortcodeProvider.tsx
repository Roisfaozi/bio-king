'use client';

import {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
} from 'react';
import { useSearchParams } from 'next/navigation';

interface ShortcodeContextType {
  shortcode: string | null;
  setShortcode: (code: string) => void;
  createUrl: (path: string) => string;
}

const ShortcodeContext = createContext<ShortcodeContextType>({
  shortcode: null,
  setShortcode: () => {},
  createUrl: (path) => path,
});

export const useShortcode = () => useContext(ShortcodeContext);

interface ShortcodeProviderProps {
  children: ReactNode;
  defaultShortcode?: string;
}

export default function ShortcodeProvider({
  children,
  defaultShortcode = 'default123',
}: ShortcodeProviderProps) {
  const searchParams = useSearchParams();
  const [shortcode, setShortcodeState] = useState<string | null>(null);

  useEffect(() => {
    // Coba ambil dari URL
    const urlShortcode = searchParams.get('shortcode');

    if (urlShortcode) {
      // Jika ada di URL, gunakan dan simpan ke localStorage
      setShortcodeState(urlShortcode);
      localStorage.setItem('vsco_shortcode', urlShortcode);
    } else {
      // Jika tidak ada di URL, cek localStorage
      const savedShortcode = localStorage.getItem('vsco_shortcode');
      if (savedShortcode) {
        setShortcodeState(savedShortcode);
      } else {
        // Fallback ke default
        setShortcodeState(defaultShortcode);
        localStorage.setItem('vsco_shortcode', defaultShortcode);
      }
    }
  }, [searchParams, defaultShortcode]);

  const setShortcode = (code: string) => {
    setShortcodeState(code);
    localStorage.setItem('vsco_shortcode', code);
  };

  // Helper untuk membuat URL dengan shortcode
  const createUrl = (path: string) => {
    if (shortcode) {
      const hasQuery = path.includes('?');
      return `${path}${hasQuery ? '&' : '?'}shortcode=${encodeURIComponent(shortcode)}`;
    }
    return path;
  };

  const value = {
    shortcode,
    setShortcode,
    createUrl,
  };

  return (
    <ShortcodeContext.Provider value={value}>
      {children}
    </ShortcodeContext.Provider>
  );
}
