'use client';

import { TrackPageView } from '@/components/tracking/track-page-view';

export default function FeaturesClientPart() {
  return (
    <>
      {/* Client-side tracking sebagai fallback */}
      <TrackPageView pageType='feature' />
    </>
  );
}
