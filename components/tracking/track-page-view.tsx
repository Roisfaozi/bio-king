'use client';

import { useEffect } from 'react';
import { trackPageView } from '@/action/tracking-action';

interface TrackPageViewProps {
  pageType: 'page' | 'feature' | 'pricing' | 'tinder' | 'bio' | 'link';
  pageId?: string;
  username?: string;
  shortCode?: string;
}

/**
 * Komponen untuk melakukan tracking di client components
 * Gunakan komponen ini pada halaman yang membutuhkan client-side hydration
 */
export function TrackPageView({
  pageType,
  pageId,
  username,
  shortCode,
}: TrackPageViewProps) {
  useEffect(() => {
    // Kirim data track melalui API endpoint menggunakan action
    trackPageView({
      pageType,
      pageId,
      username,
      shortCode,
    }).catch(() => {
      // Silent fail - jangan tampilkan error apapun ke pengguna
    });
  }, [pageType, pageId, username, shortCode]);

  // Komponen ini tidak merender apapun
  return null;
}
