'use client';

import { TrackPageView } from '@/components/tracking/track-page-view';

export default function ClientPart() {
  return (
    <>
      {/* Komponen ini tidak merender apapun, hanya melakukan tracking client-side 
          sebagai fallback untuk user dengan JavaScript aktif */}
      <TrackPageView pageType='page' />
    </>
  );
}
