import { credentialsConfig } from '@/config/credentials.config';
import { bypassRLS } from '@/lib/db';
import { trackPageView } from '@/lib/tracking';
import { getAppScheme, getCurrentEpoch } from '@/lib/utils';
import { revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';
let baseUrl: string;

export async function GET(
  req: NextRequest,
  { params }: { params: { short: string; lang: string } },
) {
  try {
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

    // Safely construct base URL
    try {
      baseUrl = credentialsConfig.siteUrl || new URL(req.url).origin;
    } catch (error) {
      console.error('Error constructing base URL:', error);
      baseUrl = 'https://mas-bio.vercel.app'; // Fallback URL
    }

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
      try {
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
      } catch (error) {
        console.error('Error processing in-app browser URL:', error);
        return NextResponse.redirect(new URL('/404', baseUrl));
      }
    }

    // Handle deeplinks for mobile devices
    if (isMobile && link.original_url) {
      try {
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
      } catch (error) {
        console.error('Error processing URL:', error);
        // Fall through to default handling
      }
    }

    // Special handling for trap links
    if (link.type === 'traplink' && link.page_type) {
      try {
        const redirectUrl = new URL(`/${lang}/${link.page_type}`, baseUrl);
        redirectUrl.searchParams.set('shortcode', shortCode);
        return NextResponse.redirect(redirectUrl);
      } catch (error) {
        console.error('Error creating redirect URL:', error);
        return NextResponse.redirect(new URL('/404', baseUrl));
      }
    }

    // Default redirect with validation
    try {
      if (!link.original_url) {
        throw new Error('Missing original URL');
      }
      const finalUrl = new URL(link.original_url);
      return NextResponse.redirect(finalUrl);
    } catch (error) {
      console.error('Error redirecting to original URL:', error);
      return NextResponse.redirect(new URL('/404', baseUrl));
    }
  } catch (error) {
    console.error('General error in route handler:', error);
    return NextResponse.redirect(new URL('/404', baseUrl));
  }
}
