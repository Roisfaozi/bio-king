'use client';

import { TrackPageView } from '@/components/tracking/track-page-view';

export default function PricingClientPart() {
  return (
    <>
      {/* Client-side tracking sebagai fallback */}
      <TrackPageView pageType='pricing' />
    </>
  );
}
