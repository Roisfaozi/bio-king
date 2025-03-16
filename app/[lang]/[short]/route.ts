import { getCurrentEpoch, parseUserAgent } from '@/lib/utils';
import { revalidatePath } from 'next/cache';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { NextRequest, NextResponse } from 'next/server';
import { bypassRLS } from '@/lib/db';
import { getShortlinkByShortcode } from '@/action/links-action';

export async function GET(
  req: NextRequest,
  { params }: { params: { short: string } },
) {
  const shortCode = params.short;
  const headersList = await headers();
  const pathname = headersList.get('x-next-pathname') || '';
  console.log('shottcode', shortCode);

  const userAgent = headersList.get('user-agent') || '';
  const referer = headersList.get('referer') || '';
  const ip = headersList.get('x-forwarded-for') || '';
  const language = headersList.get('accept-language') || '';

  // Fetch geo data
  let geoData = null;
  if (ip && ip !== '::1') {
    try {
      const response = await fetch(`http://ip-api.com/json/${ip}`);
      geoData = await response.json();
    } catch (error) {
      console.error('Error fetching geo data:', error);
    }
  }
  const noRLS = await bypassRLS();
  // Get the link

  const link = await noRLS.links.findUnique({
    where: {
      short_code: shortCode,
    },
    select: {
      id: true,
      short_code: true,
      original_url: true,
      title: true,
      is_active: true,
      expires_at: true,
      created_at: true,
      updated_at: true,
    },
  });
  if (
    !link ||
    !link.is_active ||
    (link.expires_at && link.expires_at < getCurrentEpoch())
  ) {
    redirect('/404');
  }

  // Parse user agent
  const { browser, os, device } = parseUserAgent(userAgent);
  const url = new URL(link.original_url);
  const searchParams = new URLSearchParams(url.search);
  console.log('ini referer wanjay', referer);

  // Check if click is unique
  const existingClick = await noRLS.clicks.findFirst({
    where: {
      link_id: link.id,
      ip: ip,
      user_agent: userAgent,
      created_at: {
        gt: getCurrentEpoch() - 24 * 60 * 60,
      },
    },
    select: {
      id: true,
    },
  });

  if (!existingClick) {
    await noRLS.clicks.create({
      data: {
        link_id: link.id,
        ip,
        referer,
        browser,
        os,
        device,
        user_agent: userAgent,
        city: geoData?.city || null,
        country: geoData?.country || null,
        language: language.split(',')[0],
        visitor_id: null,
        session_id: null,
        fingerprint: null,
        is_unique: true,
        created_at: getCurrentEpoch(),
        utm_source: searchParams.get('utm_source'),
        utm_medium: searchParams.get('utm_medium'),
        utm_campaign: searchParams.get('utm_campaign'),
      },
    });
  } else {
    console.log('Klik sudah ada, menyimpan sebagai non-unik.');
    await noRLS.clicks.create({
      data: {
        link_id: link.id,
        ip,
        referer,
        browser,
        os,
        device,
        user_agent: userAgent,
        city: geoData?.city || null,
        country: geoData?.country || null,
        language: language.split(',')[0],
        visitor_id: null,
        session_id: null,
        fingerprint: null,
        is_unique: false,
        created_at: getCurrentEpoch(),
        utm_source: searchParams.get('utm_source'),
        utm_medium: searchParams.get('utm_medium'),
        utm_campaign: searchParams.get('utm_campaign'),
      },
    });
  }

  revalidatePath('/dashboard');
  return NextResponse.redirect(link.original_url || '/', {
    headers: {
      'Cache-Control': 'public, max-age=86400, immutable',
    },
  });
}
